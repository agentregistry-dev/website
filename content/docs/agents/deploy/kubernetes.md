---
title: Kubernetes
weight: 20
description: 
---

Deploy your agent to a Kubernetes cluster. 

## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon. 
2. [Publish an agent](/docs/agents/publish/). 
3. Create a Kubernetes cluster. For example, you can use the following command to create a `kind` cluster. 
   ```sh
   kind create cluster --name agentregistry
   ```
4. Make sure that your current kubeconfig context points to the cluster that you want to use. 
   ```sh
   kubectl config get-contexts
   ```
5. Follow the [Quickstart](https://kagent.dev/docs/kagent/getting-started/quickstart) in the kagent OSS documentation. Agentregistry uses kagent for bootstrapping during an agent deployment. 

6. **Local setups only**: If you built the docker images locally without pushing them to a registry, load the agent and MCP server images to your kind or minikube cluster. The following command assumes that you use kind and that your cluster is named agentregistry. 
   ```sh
   kind load docker-image ghcr.io/myagent:latest --name agentregistry
   kind load docker-image my-mcp-server:latest --name agentregistry 
   ```


## Deploy the agent {#deploy}

1. Deploy the agent to your cluster. 
   ```sh
   arctl deployments create myagent \
    --type agent \
    --provider-id kubernetes-default \
    --namespace default
   ```

   Example output: 
   ```console
   Waiting for agent 'myagent' to become ready...
   Agent 'myagent' version 'latest' deployed to providerId=kubernetes-default in namespace 'default'
   ```

   {{< callout type="info" >}}
   If the deployment fails, a deployment entry is still created in the database and set to failed. You can view failed deployments by using the `arctl deployments list` command. Note that you cannot re-deploy a failed deployment to fix it. Instead, remove the failed deployment with `arctl deployments delete <deployment-ID>` and then re-run the `arctl deployments create` command. 
   {{< /callout >}}

2. Verify that the agent is up and running. 
   ```sh
   kubectl get pods | grep myagent
   ```

   Example output: 
   ```console
   NAME                              READY   STATUS    RESTARTS   AGE
   myagent-latest-687c4c88b9-xwjzx   1/1     Running   0          10s
   ``` 

3. Optional: Verify the Agent and, if applicable, the MCPServer resources that were deployed to your cluster. 
   ```sh
   kubectl get agent -o yaml
   kubectl get mcpserver -o yaml
   ```

<!-- UI INSTRUCTIONS

1. [Open the agentregistry UI](http://localhost:12121). 
2. Navigate to the **Published** view. Find the agent image that you want to deploy and click **Deploy**. 

3. From the **Deployment destination** drop down, select **Kubernetes** and click **Deploy**. 


4. Go to your cluster to check that the agent is deployed. 
   ```sh
   kubectl get pod -l "app.kubernetes.io/name=myagent-latest"
   ```

   Example output: 
   ```console
   NAME                              READY   STATUS    RESTARTS   AGE
   myagent-latest-687c4c88b9-xwjzx   1/1     Running   0          10s
   ``` 

5. In the agentregistry UI, go to the **Deployed** view and verify that you see your `myagent` deployment. 

   
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

