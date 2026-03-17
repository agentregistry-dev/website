---
title: Kubernetes
weight: 20
description:
---

Deploy your agent to a Kubernetes cluster. 

## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon. 
2. [Publish an MCP server](/docs/mcp/publish/). 
3. Create a Kubernetes cluster. For example, you can use the following command to create a `kind` cluster. 
   ```sh
   kind create cluster --name agentregistry
   ```
4. Make sure that your current kubeconfig context points to the cluster that you want to use. 
   ```sh
   kubectl config get-contexts
   ```
5. Follow the [Quickstart](https://kagent.dev/docs/kagent/getting-started/quickstart) in the kagent OSS documentation. Agentregistry uses kagent for bootstrapping during an MCP server deployment. 

6. **Local setups only**: If you built the docker images locally without pushing them to a registry, load the MCP server image to your kind or minikube cluster. The following command assumes that you use kind and that your cluster is named agentregistry. 
   ```sh
   kind load docker-image my-mcp-server:latest --name agentregistry 
   ```


## Deploy the MCP server {#deploy}

1. Deploy the MCP server to your cluster. 
   ```sh
   arctl deployments create user/my-mcp-server \
    --type mcp \
    --provider-id kubernetes-default \
    --namespace default \
    --version 0.1.0
   ```

   Example output: 
   ```console
   Deploying server...

   Deployed user/my-mcp-server (v0.1.0) with providerId=local

   Server deployment recorded. The registry will reconcile containers automatically.
   Agent Gateway endpoint: http://localhost:21212/mcp
   ```

   {{< callout type="info" >}}
   If the deployment fails, a deployment entry is still created in the database and set to failed. You can view failed deployments by using the `arctl deployments list` command. Note that you cannot re-deploy a failed deployment to fix it. Instead, remove the failed deployment with `arctl deployments delete <deployment-ID>` and then re-run the `arctl deployments create` command. 
   {{< /callout >}}

2. Verify that the MCP server is up and running. 
   ```sh
   kubectl get pods | grep mcp    
   ```

   Example output: 
   ```console
   NAME                                           READY   STATUS    RESTARTS   AGE
   user-my-mcp-server-1a1a3db9-9b5fbbd94-5c6k9    1/1     Running              61s
   ``` 

3. Optional: Review the MCPServer resource that was created in your cluster. 
   ```sh
   kubectl get mcpserver -o yaml
   ```

<!--
4. Open the MCP inspector. 
   ```sh
   npx modelcontextprotocol/inspector#0.18.0
   ```

5. Connect to your MCP server. Enter the following details. 
   * Transport type: Select **Streamable HTTP**. 
   * URL: The MCP server URL that you retrieved earlier, such as `http://localhost:21212/mcp`. 
   * Click **Connect**. 

6. Go to the **Tools** tab and verify that you see the newly added `add_number` tool. Try out the tool by entering two integer numbers, such as 5 and 3. Then, click **Run Tool**. Verify that the sum of both numbers is returned. 
   {{< reuse-image src="img/mcp-add-tool.png" >}}
   {{< reuse-image-dark srcDark="img/mcp-add-tool-dark.png" >}}
-->

## Cleanup

You can remove a deployment from the UI or CLI. 

{{< tabs items="UI,CLI" >}}
{{% tab %}}

1. [Open the agentregistry UI](http://localhost:12121) and go to the **Deployed** view. 
2. Find the MCP server deployment that you want to remove and click the trash icon. 

{{% /tab %}}
{{% tab %}}

1. List the deployments in your environment and find the one that you want to delete.
   ```sh
   arctl deployments list
   ```

2. Remove the deployment. 
   ```sh
   arctl deployments delete <deployment-ID> 
   ```

{{% /tab %}}
{{< /tabs >}}
