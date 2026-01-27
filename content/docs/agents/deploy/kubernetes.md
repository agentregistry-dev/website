---
title: Kubernetes
weight: 20
description: 
---

Deploy your agent to a Kubernetes cluster. 

## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon. 
2. [Publish an agent](/docs/agents/publish/)
3. Create a Kubernetes cluster. For example, you can use the following command to create a `kind` cluster. 
   ```sh
   kind create cluster --name agentregistry
   ```
4. Make sure that your current kubeconfig context points to the cluster that you want to use. 
   ```sh
   kubectl config get-contexts
   ```
5. Follow the [Quickstart](https://kagent.dev/docs/kagent/getting-started/quickstart) in the kagent OSS documentation. Agentregistry uses kagent for the bootstrapping during an agent deployment. 


## Local kind and minikube setups

If you want to test this capability in a local Kubernetes environment, such as `kind` or `minikube`, you must update the server address in your kubeconfig file to point to the Docker host `host.docker.internal` instead of `127.0.0.1` or `localhost`. Because agentregistry runs by using Docker compose, this change is necessary so that agentregistry can reach the kind service on your host machine.  

{{< callout type="info" >}}
If you plan to deploy your agent to a Kubernetes cluster in a cloud provider environment, such as Google Cloud Platform, you can skip this step and continue with [Deploy the agent](#deploy). 
{{< /callout >}}

1. Edit the kubeconfig file on your local machine. Typically, this file is stored in the `~/.kube` folder and named `config`. However, your kubeconfig file might be named `config.docker` or similar. Adjust the command to point to your kubeconfig file location.
   ```sh
   nano ~/.kube/config
   ```

2. Find the kubeconfig entry for the cluster that you are interested in. For example, if you used `kind` and named your cluster `agentregistry`, look for a `kind-agentregistry` entry. Then update the server address from `127.0.0.1` to `host.docker.internal` as shown in the following snippet. Make sure to keep the port that your kubeconfig pointed to before. 
   ```yaml
   - cluster:
       certificate-authority-data: <cert-data>
       server: https://host.docker.internal:51595
    name: kind-agentregistry
   ```

## Deploy the agent {#deploy}

{{< tabs items="CLI, UI" >}}
{{% tab %}}


1. Deploy the agent to your cluster. 
   ```sh
   arctl agent deploy myagent --runtime kubernetes --namespace default
   ```

   Example output: 
   ```console
   Agent 'myagent' version 'latest' deployed to kubernetes runtime in namespace 'default'
   ```

2. **Local test setups only**: Revert the changes that you previsouly made to your kubeconfig file. 

3. Verify that the agent is up and running. 
   ```sh
   kubectl get pod -l "app.kubernetes.io/name=myagent-latest"
   ```


{{% /tab %}}
{{% tab %}}

1. [Open the agentregistry UI](http://localhost:12121). 
2. Navigate to the **Published** view. Find the agent image that you want to deploy and click **Deploy**. 
   {{< reuse-image src="img/ar-deploy-agent.png" >}}
   {{< reuse-image-dark srcDark="img/ar-deploy-agent.png" >}}
3. From the **Deployment destination** drop down, select **Kubernetes** and click **Deploy**. 
   {{< reuse-image src="img/ar-deploy-agent-kube.png" width="300px" >}}
   {{< reuse-image-dark srcDark="img/ar-deploy-agent-kube.png" width="300px" >}}

4. Go to your cluster to check that the agent is deployed. 
   ```sh
   kubectl get pod -l "app.kubernetes.io/name=myagent-latest"
   ```

   Example output: 
   ```console
   ```

5. In the agentregistry UI, go to the **Deployed** view and verif that you see your `myagent` deployment. 
   {{< reuse-image src="img/ar-deploy-agent-verify.png"  >}}
   {{< reuse-image-dark srcDark="img/ar-deploy-agent-verify.png" >}}
   
{{% /tab %}}
{{< /tabs >}}

## Chat with the agent




## Cleanup

1. Open the agentregistry UI and navigate to the **Deployed** view. 
2. Find the agent deployment that you want to remove. Then, click **Remove**. 
   {{< reuse-image src="img/ar-deploy-agent-verify.png"  >}}
   {{< reuse-image-dark srcDark="img/ar-deploy-agent-verify.png" >}}

