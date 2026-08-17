---
title: BYO PostgreSQL database
weight: 10
description: "Replace the built-in PostgreSQL database with an external instance for production use."
---

By default, agentregistry deploys a bundled PostgreSQL database. Because it runs as a single pod or container, data is lost when it restarts or becomes unavailable.

For production environments, replace the bundled database with an external PostgreSQL instance that you manage and back up independently.

## Docker

If you installed agentregistry with Docker Compose, edit the compose file to remove the bundled PostgreSQL service and point the server at your own database.

### Before you begin

- agentregistry installed with Docker Compose. See the [Install with Docker](/docs/install/docker) guide.
- An external PostgreSQL instance (version 14 or later) reachable from your Docker host.

### Step 1: Edit the compose file

Open `agentregistry-compose.yml` and make the following changes:

1. Remove the `postgres` service block entirely.
2. Remove the `postgres_data` volume.
3. Update `AGENT_REGISTRY_DATABASE_URL` in the `agentregistry` service to point at your external database.
4. Remove the `depends_on` condition that references the bundled postgres service.

The updated `agentregistry` service should look like this:

```yaml
services:
  agentregistry:
    image: ghcr.io/agentregistry-dev/agentregistry/server:${VERSION}
    container_name: agentregistry-server
    entrypoint:
      - /bin/sh
      - -c
      - |
        if [ -f /root/.kube/config.orig ]; then
          mkdir -p /root/.kube
          sed -E \
            -e 's|https://127\.0\.0\.1|https://host.docker.internal|g' \
            -e 's|https://localhost|https://host.docker.internal|g' \
            -e 's|certificate-authority-data:.*|insecure-skip-tls-verify: true|g' \
            /root/.kube/config.orig > /root/.kube/config
        fi
        exec /app/bin/arctl-server
    environment:
      AGENT_REGISTRY_DATABASE_URL: "postgres://user:password@your-pg-host:5432/agentregistry?sslmode=require"
      AGENT_REGISTRY_SERVER_ADDRESS: ":8080"
      AGENT_REGISTRY_ENABLE_REGISTRY_VALIDATION: "false"
      AGENT_REGISTRY_MCP_PORT: "31313"
      KUBECONFIG: "/root/.kube/config"
    ports:
      - "12121:8080"
      - "31313:31313"
    extra_hosts:
      - "host.docker.internal:host-gateway"
    volumes:
      - ~/.kube/config:/root/.kube/config.orig:ro
    healthcheck:
      test: ["CMD", "curl", "--fail", "--silent", "--show-error", "http://localhost:8080/v0/ping"]
      interval: 5s
      timeout: 2s
      retries: 12
      start_period: 5s
    networks:
      - agentregistry-network
    restart: unless-stopped

networks:
  agentregistry-network:
    driver: bridge
```

### Step 2: Create the agentregistry database

If the `agentregistry` database does not already exist on your PostgreSQL instance, create it:

```sh
psql "host=<your-pg-host> port=5432 user=<your-pg-user> dbname=postgres sslmode=require" \
  -c 'CREATE DATABASE agentregistry;'
```

### Step 3: Restart the stack

```sh
docker compose -f agentregistry-compose.yml down
docker compose -f agentregistry-compose.yml up -d --wait
```

---

## Kubernetes

If you installed agentregistry with Helm, the instructions below show how to provision an [Amazon RDS for PostgreSQL](https://aws.amazon.com/rds/postgresql/) instance in the same VPC as your EKS cluster and configure agentregistry to use it.

### Before you begin

- agentregistry installed in Kubernetes via Helm. See the [Install on Kubernetes](/docs/install/kubernetes) guide.
- The [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) configured with access to your AWS account.
- `kubectl` access to your EKS cluster.

Set your cluster name and AWS region as environment variables:
```sh
AWS_REGION=<your-aws-region>
EKS_CLUSTER_NAME=<your-eks-cluster-name>
```

Get the VPC ID that your EKS cluster is deployed to:
```sh
VPC_ID=$(aws eks describe-cluster \
  --name "$EKS_CLUSTER_NAME" \
  --region "$AWS_REGION" \
  --query "cluster.resourcesVpcConfig.vpcId" \
  --output text)
echo "VPC ID: $VPC_ID"
```

Get the EKS cluster security group ID:
```sh
EKS_NODE_SG=$(aws eks describe-cluster \
  --name "$EKS_CLUSTER_NAME" \
  --region "$AWS_REGION" \
  --query "cluster.resourcesVpcConfig.clusterSecurityGroupId" \
  --output text)
echo "EKS node security group: $EKS_NODE_SG"
```

Set the remaining variables for the RDS instance and Kubernetes Secret:
```sh
DB_INSTANCE_ID=agentregistry-db
DB_INSTANCE_CLASS=db.t3.medium
DB_ENGINE_VERSION=16
PG_USER=agentregistry
PG_PASS='<your-password>'    # single-quote to protect shell-special chars
PG_DB=agentregistry

SECRET_NAME=agentregistry-db-creds
SECRET_KEY=AGENT_REGISTRY_DATABASE_URL
```

### Step 1: Create an AWS RDS for PostgreSQL instance

1. Create a security group for your RDS instance.
   ```sh
   RDS_SG_ID=$(aws ec2 create-security-group \
     --group-name agentregistry-rds-sg \
     --description "Allow PostgreSQL from EKS nodes" \
     --vpc-id "$VPC_ID" \
     --region "$AWS_REGION" \
     --query "GroupId" --output text)
   echo "RDS security group: $RDS_SG_ID"
   ```

2. Add an ingress rule to allow TCP traffic on port 5432 from the EKS node security group.
   ```sh
   aws ec2 authorize-security-group-ingress \
     --group-id "$RDS_SG_ID" \
     --protocol tcp \
     --port 5432 \
     --source-group "$EKS_NODE_SG" \
     --region "$AWS_REGION"
   ```

3. Retrieve the subnet IDs that your EKS cluster uses. Using the cluster's own subnets guarantees the DB subnet group covers at least two Availability Zones, which RDS requires.
   ```sh
   SUBNET_IDS=$(aws eks describe-cluster \
     --name "$EKS_CLUSTER_NAME" \
     --region "$AWS_REGION" \
     --query "cluster.resourcesVpcConfig.subnetIds" \
     --output text | tr '\t' ',')
   echo "Subnet IDs: $SUBNET_IDS"
   ```

4. Create a database subnet group. If you already have one for this VPC, skip this step and set `DB_SUBNET_GROUP` to its name.
   ```sh
   DB_SUBNET_GROUP=agentregistry-db-subnet-group

   aws rds create-db-subnet-group \
     --db-subnet-group-name "$DB_SUBNET_GROUP" \
     --db-subnet-group-description "Subnet group for agentregistry RDS" \
     --subnet-ids $(echo $SUBNET_IDS | tr ',' ' ') \
     --region "$AWS_REGION"
   ```

5. Create the RDS for PostgreSQL instance.
   ```sh
   aws rds create-db-instance \
     --db-instance-identifier "$DB_INSTANCE_ID" \
     --db-instance-class "$DB_INSTANCE_CLASS" \
     --engine postgres \
     --engine-version "$DB_ENGINE_VERSION" \
     --master-username "$PG_USER" \
     --master-user-password "$PG_PASS" \
     --db-name postgres \
     --allocated-storage 20 \
     --storage-type gp3 \
     --no-publicly-accessible \
     --vpc-security-group-ids "$RDS_SG_ID" \
     --db-subnet-group-name "$DB_SUBNET_GROUP" \
     --backup-retention-period 7 \
     --region "$AWS_REGION"
   ```

   > [!NOTE]
   > The initial database is named `postgres`. You create the `agentregistry` application database in the next step. RDS does not allow the master database to be renamed during instance creation.

6. Wait for the instance to reach the `available` state. This can take 5–10 minutes.
   ```sh
   aws rds wait db-instance-available \
     --db-instance-identifier "$DB_INSTANCE_ID" \
     --region "$AWS_REGION"
   echo "RDS instance is available."
   ```

7. Get the RDS endpoint.
   ```sh
   PG_HOST=$(aws rds describe-db-instances \
     --db-instance-identifier "$DB_INSTANCE_ID" \
     --region "$AWS_REGION" \
     --query "DBInstances[0].Endpoint.Address" \
     --output text)
   PG_PORT=5432
   echo "RDS endpoint: $PG_HOST:$PG_PORT"
   ```

### Step 2: Create the agentregistry database

Run a temporary pod in your cluster to connect to the RDS instance and create the application database.

```sh
kubectl -n agentregistry run pg-setup --rm -it --image=postgres:16 --restart=Never -- \
  psql "host=$PG_HOST port=$PG_PORT user=$PG_USER password='$PG_PASS' dbname=postgres sslmode=require" \
  -c 'CREATE DATABASE agentregistry;'
```

Example output:
```console
CREATE DATABASE
```

Confirm that a pod in the `agentregistry` namespace can reach the new database before upgrading the Helm release. If this command times out or returns a connection error, check your security group rules and subnet settings.

```sh
kubectl -n agentregistry run pg-probe --rm -it --image=postgres:16 --restart=Never -- \
  psql "host=$PG_HOST port=$PG_PORT user=$PG_USER password='$PG_PASS' dbname=agentregistry sslmode=require" \
  -c 'SELECT current_user, version();'
```

Example output:
```console
 current_user  |                                              version
---------------+---------------------------------------------------------------------------------------------------
 agentregistry | PostgreSQL 16.13 on x86_64-pc-linux-gnu, compiled by x86_64-pc-linux-gnu-gcc (GCC) 12.4.0, 64-bit
(1 row)
```

### Step 3: Store the connection string {#create-secret}

Store the database connection string in a Kubernetes Secret. The registry server reads the connection string from this Secret at startup.

The connection string can be provided in two formats:

- **URL format**: `postgres://user:password@host:5432/agentregistry?sslmode=require`
  Special characters in the password (such as `@`, `$`, `/`) must be percent-encoded.
- **DSN format**: `host=myhost port=5432 user=myuser password='mypass' dbname=agentregistry sslmode=require`
  Wrap values that contain spaces or special characters in single quotes. No percent-encoding needed.

> [!NOTE]
> If you plan to provide the connection string inline with `--set` in the Helm upgrade, skip this step and go directly to [Step 4](#helm-upgrade).

{{< tabs >}}
{{% tab name="URL format" %}}

1. Percent-encode special characters in your password.
   ```sh
   ENCODED_PASSWORD=$(python3 -c \
     "import urllib.parse, sys; print(urllib.parse.quote(sys.argv[1], safe=''))" \
     "$PG_PASS")
   echo "Encoded password: $ENCODED_PASSWORD"
   ```

2. Build the connection string.
   ```sh
   URL="postgres://${PG_USER}:${ENCODED_PASSWORD}@${PG_HOST}:${PG_PORT}/agentregistry?sslmode=require"
   echo "Connection string: $URL"
   ```

3. Create the Secret.
   ```sh
   kubectl -n agentregistry create secret generic agentregistry-db-creds \
     --from-literal=AGENT_REGISTRY_DATABASE_URL="$URL"
   ```

4. Verify the Secret.
   ```sh
   kubectl -n agentregistry get secret agentregistry-db-creds \
     -o jsonpath="{.data.AGENT_REGISTRY_DATABASE_URL}" | base64 -d; echo
   ```

{{% /tab %}}
{{% tab name="DSN format" %}}

1. Build the connection string.
   ```sh
   DSN="host=$PG_HOST port=$PG_PORT user=$PG_USER password='$PG_PASS' dbname=agentregistry sslmode=require"
   echo "Connection string: $DSN"
   ```

2. Create the Secret.
   ```sh
   kubectl -n agentregistry create secret generic agentregistry-db-creds \
     --from-literal=AGENT_REGISTRY_DATABASE_URL="$DSN"
   ```

3. Verify the Secret.
   ```sh
   kubectl -n agentregistry get secret agentregistry-db-creds \
     -o jsonpath="{.data.AGENT_REGISTRY_DATABASE_URL}" | base64 -d; echo
   ```

{{% /tab %}}
{{< /tabs >}}

### Step 4: Upgrade the Helm release {#helm-upgrade}

Upgrade the Helm release to switch from the bundled PostgreSQL to your RDS instance. The `--reuse-values` flag re-applies all previous values so you only need to pass the database settings that are changing.

{{< tabs >}}
{{% tab name="Kubernetes Secret" %}}

```sh
helm upgrade -i agentregistry \
  oci://ghcr.io/agentregistry-dev/agentregistry/charts/agentregistry \
  --namespace agentregistry \
  --reuse-values \
  --set database.postgres.type=external \
  --set database.postgres.external.secretRef.name=agentregistry-db-creds \
  --set database.postgres.external.secretRef.key=AGENT_REGISTRY_DATABASE_URL \
  --wait --timeout=5m
```

{{% /tab %}}
{{% tab name="Inline connection string" %}}

```sh
helm upgrade -i agentregistry \
  oci://ghcr.io/agentregistry-dev/agentregistry/charts/agentregistry \
  --namespace agentregistry \
  --reuse-values \
  --set database.postgres.type=external \
  --set "database.postgres.external.url=${DSN}" \
  --wait --timeout=5m
```

{{% /tab %}}
{{< /tabs >}}

| Helm value | Description |
|---|---|
| `database.postgres.type` | Set to `external` to use your own database instead of the bundled instance. |
| `database.postgres.external.url` | Inline connection string. Mutually exclusive with `secretRef.name`. |
| `database.postgres.external.secretRef.name` | Name of a Kubernetes Secret holding the connection string. Mutually exclusive with `url`. |
| `database.postgres.external.secretRef.key` | Key within the Secret (default: `AGENT_REGISTRY_DATABASE_URL`). |

### Step 5: Verify the connection

1. Verify the pods are healthy and that no bundled `agentregistry-postgresql-*` pod is running.
   ```sh
   kubectl get pods -n agentregistry
   ```

2. Confirm the server pod has the Secret reference in its environment.
   ```sh
   kubectl -n agentregistry describe pod -l app.kubernetes.io/component=server \
     | sed -n '/AGENT_REGISTRY_DATABASE_URL/,/^$/p' | head -5
   ```

   Expected output:
   ```console
   AGENT_REGISTRY_DATABASE_URL:  <set to the key 'AGENT_REGISTRY_DATABASE_URL' in secret 'agentregistry-db-creds'>  Optional: false
   ```

3. Check the server logs for successful migration messages.
   ```sh
   kubectl -n agentregistry logs deploy/agentregistry-server --tail=50 | grep "migration"
   ```

   Expected output:
   ```console
   {"time":"...","level":"info","msg":"all migrations applied successfully","component":"database.migrate"}
   ```

4. List the tables that the registry created on the RDS instance.
   ```sh
   kubectl -n agentregistry run pg-check --rm -it --image=postgres:16 --restart=Never -- \
     psql "host=$PG_HOST port=$PG_PORT user=$PG_USER password='$PG_PASS' dbname=agentregistry sslmode=require" \
     -c '\dt'
   ```
