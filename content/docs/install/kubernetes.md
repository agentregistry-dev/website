---
title: Install in Kubernetes
weight: 20
description:
---

Use this guide to install agentregistry in a Kubernetes cluster by using Helm. This approach is useful for team environments where multiple developers need shared access to a central artifact registry.

{{< callout type="info" >}}
If you install agentregistry in a Kubernetes cluster, you cannot deploy AI artifacts to a local environment. To deploy them to a local environment, you must [install agentregistry locally with Docker](/docs/install/docker). 
{{< /callout >}}

## Before you begin

Make sure you have the following tools installed:

- [kubectl](https://kubernetes.io/docs/tasks/tools/) with access to a Kubernetes cluster
- [Helm](https://helm.sh/docs/intro/install/) v3 or later

## Set up PostgreSQL

Agentregistry requires an external PostgreSQL instance with the [pgvector](https://github.com/pgvector/pgvector) extension for Kubernetes deployments.

{{< callout type="warning" >}}
The bundled PostgreSQL setup is intended for development and testing only. For production, use a managed PostgreSQL service or a production-grade operator.
{{< /callout >}}

## Install with Helm

Install agentregistry using the Helm chart from the GitHub Container Registry.

```sh
helm install agentregistry oci://ghcr.io/agentregistry-dev/agentregistry/charts/agentregistry \
  --namespace agentregistry \
  --create-namespace \
  --set database.host=postgres-pgvector.agentregistry.svc.cluster.local \
  --set database.password=agentregistry \
  --set database.sslMode=disable \
  --set config.jwtPrivateKey=$(openssl rand -hex 32)
```

If you are using an external PostgreSQL instance, replace `database.host`, `database.password`, and `database.sslMode` with values for your database.

### Helm chart configuration

| Value | Description | Default |
|---|---|---|
| `database.host` | PostgreSQL hostname | — |
| `database.password` | Database password | — |
| `database.sslMode` | SSL mode (`disable`, `require`, `verify-full`) | — |
| `config.jwtPrivateKey` | JWT signing key (use a securely generated random value) | — |

## Access the UI

1. Port-forward the agentregistry service to access the UI and API from your local machine:
   ```sh
   kubectl port-forward -n agentregistry svc/agentregistry 12121:12121
   ```

2. [Open the agentregistry UI](http://localhost:12121/) in your browser.

## Install arctl

Install the `arctl` CLI to interact with agentregistry from your local machine:

```sh
curl -fsSL https://raw.githubusercontent.com/agentregistry-dev/agentregistry/main/scripts/get-arctl | bash
```

By default, `arctl` connects to `http://localhost:12121`. If your agentregistry instance is exposed at a different address, configure the connection:

```sh
arctl configure --url http://<your-agentregistry-host>:12121
```

## Next steps

With agentregistry up and running, you can explore how to build, publish, and deploy AI artifacts:

* [**Agents**](/docs/agents/): Build, run, and publish Docker images for agents.
* [**MCP servers**](/docs/mcp/): Create and run MCP tool servers, add tools, and publish them as Docker images.
* [**Skills**](/docs/skills/): Build and publish skills that you can add to your agents.
* [**Prompts**](/docs/prompts/): Build and publish prompts that you can add to your agents.
