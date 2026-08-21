---
title: Connect a runtime
weight: 20
description: "Connect agentregistry to a kagent runtime to deploy agents and MCP servers to your Kubernetes cluster."
---

[Kagent](https://kagent.dev) is an open source, Kubernetes-native AI runtime. It extends Kubernetes with custom resources for agents and MCP servers, letting you manage AI workloads the same way you manage any other Kubernetes application. Agentregistry uses kagent to deploy and manage agents and MCP servers as pods in your cluster via a pre-configured `kubernetes-default` runtime. 

The steps in this guide walk you through how to install the kagent open source project so that you can use it as a deployment runtime in agentregistry.

## Before you begin

1. Install agentregistry on [Kubernetes]({{< link path="/quickstart/" >}}).
2. Get an OpenAI API key from [platform.openai.com](https://platform.openai.com/api-keys). Kagent requires an LLM provider to power the agents it runs. The minimal profile uses OpenAI by default.

## Step 1: Install kagent

1. Save your OpenAI API key in an environment variable.
   ```sh
   export OPENAI_API_KEY=<your-openai-api-key>
   ```

2. Install kagent with the minimal profile.
   ```sh
   kagent install --profile minimal
   ```

3. Verify that the kagent pods are running.
   ```sh
   kubectl get pods -n kagent
   ```

   Example output:
   ```console
   NAME                                             READY   STATUS    RESTARTS   AGE
   kagent-controller-5bc5964cbb-rh5vw               1/1     Running   0          5m25s
   kagent-grafana-mcp-546d857557-lvgq5              1/1     Running   0          5m25s
   kagent-kmcp-controller-manager-b8dd8ccfd-5fjds   1/1     Running   0          5m25s
   kagent-querydoc-84d8dcfd-9lbzw                   1/1     Running   0          5m25s
   kagent-tools-7f477dcb7b-q866j                    1/1     Running   0          5m25s
   kagent-ui-756689ffb4-wfbzw                       1/1     Running   0          5m25s
   ```

## Step 2: Verify the runtime

Agentregistry creates a `kubernetes-default` runtime during the installation. Confirm that it is listed. 

1. List the runtimes in agentregistry.
   ```sh
   arctl get runtimes
   ```

   Example output:
   ```console
   NAME                 TYPE
   kubernetes-default   Kubernetes
   ```

## Next steps

{{< cards >}}
{{< card link="/docs/mcp/local/deploy/" title="Deploy an MCP server" description="Deploy a published MCP server to your kagent runtime." >}}
{{< card link="/docs/agents/deploy/kagent/" title="Deploy an agent" description="Deploy a published agent to your kagent runtime." >}}
{{< /cards >}}
