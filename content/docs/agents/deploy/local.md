---
title: Local
weight: 10
description: Deploy an agent from agentregistry to your local environment. 
---

Deploy an agent from agentregistry to your local environment. 

Local deployments spin up Docker containers on your local machine from images that exist on your machine or that can be pulled from the image location reference that agentregistry points to.

## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon. 
2. [Publish an agent](/docs/agents/publish/).

## Deploy the agent

1. Save your Gemini API key as an environment variable. To retrieve your API key, log in to the [Google AI Studio and select API Keys](https://aistudio.google.com/app/api-keys). The key is used to interact with the agent via the Gemini LLM provider. 
   ```sh
   export GOOGLE_API_KEY=<apikey>
   ```

2. Deploy the agent to your local environment. The following command spins up a Docker container by using Docker compose. 
   ```sh
   arctl agent deploy myagent
   ```

3. List the containers in your environment. Verify that you see a container with the `ghcr.io/myagent:latest` image. 
   ```sh
   arctl deployments list
   ```
   
   Example output: 
   ```console
   ID         NAME      VERSION   TYPE    PROVIDER   STATUS     AGE
   e817f070   myagent   0.1.0     agent   local      deployed   5s
   ```

4. Optional: [Open the agentregistry UI](http://localhost:12121/deployed/) and go to the **Deployed** view. Verify that you see the deployed agent. 
   
   {{< reuse-image src="img/ar-deploy-agent-verify.png"  >}}
   {{< reuse-image-dark srcDark="img/ar-deploy-agent-verify.png" >}}

<!-- UI INSTRUCTIONS

1. Open the [agentregistry UI](http://localhost:12121). 
2. Go into the **Agents** view. 
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

1. [Open the agentregistry UI](http://localhost:12121/deployed/). 
2. Find the agent deployment that you want to remove and click the trash icon. 

{{% /tab %}}
{{% tab %}}

Remove the deployment. 
```sh
arctl deployment delete myagent
```

{{% /tab %}}
{{< /tabs >}}

