---
title: kagent
weight: 20
description: "Deploy your agentregistry MCP server to a Kubernetes cluster."
---

## Before you begin

1. Follow the [Get started]({{< link path="/quickstart/" >}}) guide to install agentregistry.
2. [Connect the kagent runtime]({{< link path="/setup/runtime/" >}}) so that you can deploy MCP servers to your Kubernetes cluster.
3. [Publish an MCP server]({{< link path="/mcp/local/publish/" >}}).
4. If you are using a kind cluster and pushed the image to a local registry rather than a remote one, load the image into the cluster. Replace `ghcr.io/my-org/mymcp:latest` with the image identifier from your `mcp.yaml` file and `<cluster-name>` with the name of your kind cluster.
   ```sh
   kind load docker-image ghcr.io/my-org/mymcp:latest --name <cluster-name>
   ```

## Deploy the MCP server

1. List the runtimes available in agentregistry. Verify that you see the `kubernetes-default` runtime, which is the runtime that you use to deploy MCP servers to Kubernetes by using the kagent OSS project. 

   ```sh
   arctl get runtimes
   ```

   Example output:
   ```console
   NAME                 TYPE
   kubernetes-default   Kubernetes
   local                Local
   ```

2. Create a Deployment resource that deploys a published MCP server to the `kubernetes-default` runtime.

   ```yaml
   arctl apply -f- <<EOF
   apiVersion: ar.dev/v1alpha1
   kind: Deployment
   metadata:
     name: my-mcp-server
   spec:
     env:
       KAGENT_NAMESPACE: default
     runtimeRef:
       kind: Runtime
       name: kubernetes-default
     targetRef:
       kind: MCPServer
       name: mymcp
       tag: latest
   EOF
   ```

   Example output: 
   ```console
   ✓ Deployment/my-mcp-server created
   ```

3. List the deployments and verify that `my-mcp-server` appears.

   ```sh
   arctl get deployments
   ```

   Example output: 
   ```console
   NAME                    TARGET   VERSION   TYPE   RUNTIME              STATUS
   default/my-mcp-server   mymcp    latest    mcp    kubernetes-default   deploying
   ```

## Verify the deployment

1. Verify that kagent created an MCPServer resource in your cluster.

   ```sh
   kubectl get mcpservers -o yaml
   ```

   Example output: 
   ```console
   apiVersion: v1
   items:
   - apiVersion: kagent.dev/v1alpha1
     kind: MCPServer
     metadata:
       annotations:
         aregistry.ai/deployment-id: my-mcp-server
       creationTimestamp: "2026-08-19T21:10:05Z"
       generation: 1
       labels:
         aregistry.ai/deployment-id: my-mcp-server
         aregistry.ai/managed: "true"
       name: mymcp-my-mcp-server
       namespace: default
       resourceVersion: "103614"
       uid: 26fb8faa-3279-4aea-b8be-b504f2125479
   ...
   ```

2. Verify that a pod was created for your MCP server and is running in your cluster. 
   ```sh
   kubectl get pod | grep mymcp
   ```

   Example output: 
   ```console
   mymcp-my-mcp-server-77694d689d-gv98q   1/1     Running   0          2m37s
   ```

## Test the deployed server

1. Port-forward the MCP server service.

   ```sh
   kubectl port-forward service/mymcp-my-mcp-server 3000
   ```

2. In a separate terminal, list the available tools. Verify that you see the `example_echo` and `example_sum` tools. 

   ```sh
   mcp-inspector --cli http://localhost:3000/mcp \
     --transport http --method tools/list | jq '.tools[].name'
   ```

   Example output:
   ```console
   "example_echo"
   "example_sum"
   ```

3. Call the `example_echo` tool and verify that you get back the echoed message. 

   ```sh
   mcp-inspector --cli http://localhost:3000/mcp \
     --transport http --method tools/call \
     --tool-name example_echo \
     --tool-arg message="hello world"
   ```

4. Optional: Open the kagent dashboard and go to **View > MCP & Tools** to see the `my-mcp` server and its tools listed.

   ```sh
   kagent dashboard
   ```

   {{< reuse-image src="img/kagent-servers.svg" srcDark="img/kagent-servers-dark.svg"  >}}

## Cleanup

1. List the deployments and find the one you want to delete.
   ```sh
   arctl get deployments
   ```

2. Remove the deployment.
   ```sh
   arctl delete deployment my-mcp-server
   ```
