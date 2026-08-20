---
title: kagent
weight: 20
description: "Deploy an agent in your Kubernetes cluster."
---

## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to install agentregistry.
2. [Connect the kagent runtime]({{< link path="/setup/runtime/" >}}) so that you can deploy agents to your Kubernetes cluster. 
3. [Publish an agent](/docs/agents/publish/).


## Deploy the agent {#deploy}

1. List the runtimes that are connected to agentregistry. Make sure that you see the `kubernetes-default` runtime. This runtime leverages kagent to deploy agents and MCP servers to your Kubernetes cluster. 
   ```sh
   arctl get runtimes
   ```

   Example output:
   ```console
   NAME                  TYPE
   kubernetes-default    kubernetes
   ```

2. List the agents that are published in agentregistry. Note the name and tag of the agent you want to deploy.
   ```sh
   arctl get agents
   ```

   Example output:
   ```console
   NAME      TAG      MODE     DESCRIPTION
   myagent   latest   source   My agent
   ```

3. If you are using a local [kind](https://kind.sigs.k8s.io/) cluster, load the agent image that you previously built, and the images of any referenced MCP servers, into the cluster. Skip this step if you are using a remote registry that your cluster can pull from directly.
   ```sh
   kind load docker-image $REGISTRY/myagent:latest --name <cluster-name>
   kind load docker-image $REGISTRY/mymcp:latest --name <cluster-name>
   ```

4. Create a Deployment that references your agent and the `kubernetes-default` runtime. The `env` field passes environment variables to the agent container at runtime. If your agent uses Gemini as its language model, it requires a `GOOGLE_API_KEY` to authenticate requests to the Gemini API.

   ```yaml
   arctl apply -f- <<EOF
   apiVersion: ar.dev/v1alpha1
   kind: Deployment
   metadata:
     name: myagent
   spec:
     targetRef:
       kind: Agent
       name: myagent
       tag: latest
     runtimeRef:
       kind: Runtime
       name: kubernetes-default
     env:
       GOOGLE_API_KEY: ${GOOGLE_API_KEY}
   EOF
   ```

   Example output:
   ```console
   ✓ Deployment/myagent configured
   ```

5. Verify that the deployment was created.
   ```sh
   arctl get deployments
   ```

6. Verify that the agent pod is running in your cluster. If you referenced an MCP server in your agent manifest, the MCP server is also deployed as a pod in to the cluster. 
   ```sh
   kubectl get pods -n agentregistry | grep myagent
   ```

   Example output:
   ```console
   myagent-latest-myagent-656bf798b-2dph6     1/1     Running   0          35m
   mymcp-myagent-669c4bdf68-cvvv6             1/1     Running   0          35m
   ``` 

7. Optional: Verify the agent and, if applicable, the MCPServer resources that were deployed to your cluster.
   ```sh
   kubectl get agent -A -o yaml
   kubectl get mcpserver -A -o yaml
   ```

   > [!NOTE]
   > If the deployment fails, you can view it with `arctl get deployments`. Remove the failed deployment with `arctl delete deployment myagent` and re-apply after fixing the issue.


## Verify the agent 

1. Open the kagent dashboard. 
   ```sh
   kagent dashboard
   ```

2. Navigate to your agent and start chatting with the agent. For example, you can ask it what it can do for you. Verify that the agent replies that it can roll a die and check if numbers are prime. 
   ```sh
   what can you do for me
   ```
   {{< reuse-image src="img/kagent-agent-chat.svg" srcDark="img/kagent-agent-chat-dark.svg" >}}

   If you also referenced an MCP server, make sure that the agent also lists the MCP server tools it has access to. 

   {{< reuse-image src="img/kagent-agent-mcp-chat.svg" srcDark="img/kagent-agent-mcp-chat-dark.svg" >}}

## Cleanup


1. List deployments and find the one to remove.
   ```sh
   arctl get deployments
   ```

2. Delete the deployment.
   ```sh
   arctl delete deployment myagent
   ```
