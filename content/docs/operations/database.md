---
title: BYO PostgreSQL database
weight: 10
description: "Replace the built-in PostgreSQL database with an external instance for production use."
---

By default, agentregistry deploys a bundled PostgreSQL database that stores the AI artifacts you publish in the registry catalog. Because it runs as a single pod, data is lost when the pod restarts or becomes unavailable.

For production environments, replace the bundled database with an external PostgreSQL instance that you manage and back up independently.

## Before you begin

1. Create or use an existing external PostgreSQL instance (version 14 or later) that is reachable from your agentregistry installation. For example, you can create an [Amazon RDS instance](https://aws.amazon.com/rds/resources/)
2. Install agentregistry on [Kubernetes]({{< link path="/setup/kubernetes" >}}).

## Step 1: Create the agentregistry database

1. Get the address of your PostgreSQL instance, and the admin's user name and password. Store these details in environment variables. 
   ```sh
   export PG_HOST=<postgresql-host-address>
   export PG_USER=<postgresql-user>
   export PG_PASS=<postresql-password>
   ```

2. Create the `agentregistry` database. 
   ```sh
   psql "host=$PG_HOST port=5432 user=$PG_USER password='$PG_PASS' dbname=postgres sslmode=require" \
     -c 'CREATE DATABASE agentregistry;'
   ```

   Example output: 
   ```console
   CREATE DATABASE
   ```

## Step 2: Configure agentregistry

1. Store the database connection string in a Kubernetes Secret. The registry server reads the connection string from this Secret at startup.

   The connection string can be provided in two formats:
   - **URL format**: `postgres://user:password@host:5432/agentregistry?sslmode=require`
     Special characters in the password (such as `@`, `$`, `/`) must be percent-encoded.
   - **DSN format**: `host=myhost port=5432 user=myuser password='mypass' dbname=agentregistry sslmode=require`
     Wrap values that contain spaces or special characters in single quotes. No percent-encoding needed.

   > [!NOTE]
   > If you plan to provide the connection string inline with the `--set` flag in the Helm upgrade, skip this step and continue with the next step. 

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

2. Upgrade the Helm release to switch from the bundled PostgreSQL to your external instance. The `--reuse-values` flag re-applies all previous values so you only need to pass the database settings that are changing.

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

3. Verify the pods are healthy and that no bundled `agentregistry-postgresql-*` pod is running.
   ```sh
   kubectl get pods -n agentregistry
   ```

4. Confirm the server pod has the Secret reference in its environment.
   ```sh
   kubectl -n agentregistry describe pod -l app.kubernetes.io/component=server \
     | sed -n '/AGENT_REGISTRY_DATABASE_URL/,/^$/p' | head -5
   ```

   Example output:
   ```console
   AGENT_REGISTRY_DATABASE_URL:  <set to the key 'AGENT_REGISTRY_DATABASE_URL' in secret 'agentregistry-db-creds'>  Optional: false
   ```

5. Check the server logs for successful migration messages.
   ```sh
   kubectl -n agentregistry logs deploy/agentregistry-server --tail=50 | grep "migration"
   ```

   Example output:
   ```console
   {"time":"...","level":"info","msg":"all migrations applied successfully","component":"database.migrate"}
   ```

6. List the tables that the registry created on the database.
   ```sh
   psql "host=$PG_HOST port=$PG_PORT user=$PG_USER password='$PG_PASS' dbname=agentregistry sslmode=require" \
     -c '\dt'
   ```

   Example output:
   ```console
                         List of relations
    Schema |         Name         | Type  |    Owner
   --------+----------------------+-------+-----------
    public | agents               | table | agentuser
    public | control_plane_events | table | agentuser
    public | deployments          | table | agentuser
    public | mcp_servers          | table | agentuser
    public | models               | table | agentuser
    public | plugins              | table | agentuser
    public | prompts              | table | agentuser
    public | runtimes             | table | agentuser
    public | skills               | table | agentuser
   (9 rows)
   ```
