---
title: Install on Kubernetes
weight: 20
description: "Install agentregistry in a Kubernetes cluster with Helm for shared team access to a central artifact registry."
---

Use this guide to install agentregistry in a Kubernetes cluster by using Helm. This approach is useful for team environments where multiple developers need shared access to a central artifact registry.

> [!NOTE]
> If you install agentregistry in a Kubernetes cluster, you cannot deploy AI artifacts to a local environment. To deploy them to a local environment, you must [install agentregistry locally with Docker](/docs/install/docker).

## Before you begin

Make sure you have the following tools installed:

- [kubectl](https://kubernetes.io/docs/tasks/tools/) with access to a Kubernetes cluster
- [Helm](https://helm.sh/docs/intro/install/) v3 or later

## Install with Helm

The Helm chart includes a bundled PostgreSQL instance for development and evaluation. For production, [bring your own PostgreSQL instance]({{< link path="/operations/database/" >}}) instead.

1. Install agentregistry with the bundled PostgreSQL instance. 
   ```sh
   helm upgrade -i agentregistry oci://ghcr.io/agentregistry-dev/agentregistry/charts/agentregistry \
       --namespace agentregistry \
       --create-namespace
   ```

   > [!WARNING]
   > The bundled PostgreSQL instance is for development and evaluation only. Data is lost if the PostgreSQL pod is restarted or rescheduled. For production, use an external PostgreSQL instance instead. See the [BYO PostgreSQL database]({{< link path="/operations/database/" >}}) guide.

2. Verify that the agentregistry and PostgreSQL pods are up and running. 
   ```sh
   kubectl get pods -n agentregistry
   ```

   Example output: 
   ```console
   NAME                                       READY   STATUS    RESTARTS   AGE
   agentregistry-c46b8bd98-hvnzf              1/1     Running   0          45s
   gentregistry-postgresql-9858cbcbf-tk7p9   1/1     Running   0          45s
   ```

3. Port-forward the agentregistry service to access the UI and API from your local machine. 
   ```sh
   kubectl port-forward -n agentregistry svc/agentregistry 12121:12121
   ```

4. [Open the agentregistry UI](http://localhost:12121/) in your browser.

### Install the `arctl` CLI

1. Install the agentregistry `arctl` binary on your local machine.
   ```sh
   curl -fsSL https://raw.githubusercontent.com/agentregistry-dev/agentregistry/main/scripts/get-arctl | bash

   export PATH="/usr/local/bin:$PATH"
   ```

2. Verify that the CLI is installed correctly.
   ```sh
   arctl version
   ```

> [!TIP]
> By default, `arctl` connects to `http://localhost:12121`. If your agentregistry instance is exposed at a different address, set the `ARCTL_API_BASE_URL` environment variable or pass `--registry-url` on each command. For example, to set the environment variable, use `export ARCTL_API_BASE_URL=http://<your-agentregistry-host>:12121`. 

## Next steps

With agentregistry up and running, you can explore how to build, publish, and deploy AI artifacts:

* [**Agents**](/docs/agents/): Build, run, and publish Docker images for agents.
* [**MCP servers**](/docs/mcp/): Create and run MCP tool servers, add tools, and publish them as Docker images.
* [**Skills**](/docs/skills/): Build and publish skills that you can add to your agents.
* [**Prompts**](/docs/prompts/): Build and publish prompts that you can add to your agents.
