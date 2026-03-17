---
title: Local
weight: 10
description: Deploy an agent from agentregistry to your local environment. 
---

Deploy an MCP server from agentregistry to your local environment. 

{{< callout type="info" >}}
To deploy an MCP server to a local environment, you must install agentregistry by using Docker as shown in the [Get started](/docs/quickstart/) guide. If you installed agentregistry on Kubernetes, you cannot deploy to local environments. 
{{< /callout >}}

Local deployments spin up Docker containers on your local machine from images that exist on your machine or that can be pulled from the image location reference that agentregistry points to.

## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon. 
2. [Publish an MCP server](/docs/mcp/publish/).

## Deploy the MCP server


1. List the MCP servers that are published to agentregistry. 
   ```sh
   arctl mcp list
   ```

   Example output:
   ```
   NAME                 VERSION   TYPE   DEPLOYED   UPDATED
   user/my-mcp-server   0.1.0     oci    False      2h
   ```

2. Deploy the MCP server to your local environment. The following command spins up a Docker container from the `user/my-mcp-server` artifact reference that is published in agentregistry. In your CLI output, get the address that the MCP server is exposed on. 
   ```sh
   arctl deployments create user/my-mcp-server \
    --type mcp \
    --version 0.1.0
   ```

   Example output: 
   ```console
   Deployed user/my-mcp-server (v0.1.0) with providerId=local

   Server deployment recorded. The registry will reconcile containers automatically.
   Agent Gateway endpoint: http://localhost:21212/mcp
   ```

   {{< callout type="info" >}}
   If the deployment fails, a deployment entry is still created in the database and set to failed. You can view failed deployments by using the `arctl deployments list` command. Note that you cannot re-deploy a failed deployment to fix it. Instead, remove the failed deployment with `arctl deployments delete <deployment-ID>` and then re-run the `arctl deployments create` command. 
   {{< /callout >}}

3. Open the MCP inspector. 
   ```sh
   npx modelcontextprotocol/inspector#0.18.0
   ```

4. Connect to your MCP server. Enter the following details. 
   * Transport type: Select **Streamable HTTP**. 
   * URL: The MCP server URL that you retrieved earlier, such as `http://localhost:21212/mcp`. 
   * Click **Connect**. 

5. Go to the **Tools** tab and verify that you see the newly added `add_number` tool. Try out the tool by entering two integer numbers, such as 5 and 3. Then, click **Run Tool**. Verify that the sum of both numbers is returned. 
   {{< reuse-image src="img/mcp-add-tool.png" >}}
   {{< reuse-image-dark srcDark="img/mcp-add-tool-dark.png" >}}


<!--

1. Open the [agentregistry UI](http://localhost:12121). 
2. Go into the **Published** view. 
3. Select the agent image that you published and click **Deploy**. 
   {{< reuse-image src="img/ar-publish-agent.png" >}}
   {{< reuse-image-dark srcDark="img/ar-publish-agent.png" >}}
4. From the **Deployment destination** drop down, select **Local (Docker Compose)** and click **Deploy**. 
   {{< reuse-image src="img/ar-deploy-agent-local.png" width="300px" >}}
   {{< reuse-image-dark srcDark="img/ar-deploy-agent-local.png" width="300px" >}}
5. Switch to the **Deployed** and verify that you see the deployed agent. 
   {{< reuse-image src="img/ar-deploy-agent.png"  >}}
   {{< reuse-image-dark srcDark="img/ar-deploy-agent.png"  >}}
6. List the containers in your environment. Verify that you see a container with the `ghcr.io/myagent:latest` image. 
   ```sh
   docker ps
   ```
   
   Example output: 
   ```console
   CONTAINER ID   IMAGE                    COMMAND                  CREATED              STATUS                  PORTS                                                                                                                                                                                                                                                                                                                                                                                                                                 NAMES
   816ad44cba11   ghcr.io/myagent:latest   "kagent-adk run --ho…"   About a minute ago   Up About a minute       0.0.0.0:40529->40529/tcp, [::]:40529->40529/tcp                                                                                            
   ```
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


