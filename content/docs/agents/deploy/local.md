---
title: Local
weight: 10
description: Deploy an agent from agentregistry to your local environment. 
---

Deploy an agent from agentregistry to your local environment. 

## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon. 
2. [Publish an agent](/docs/agents/publish/)

## Deploy the agent

{{< tabs items="CLI,UI" >}}

{{% tab %}}

1. Save your Gemini API key as an environment variable. To retrieve your API key, log in to the [Google AI Studio and select API Keys](https://aistudio.google.com/app/api-keys).
   ```sh
   export GOOGLE_API_KEY=<apikey>
   ```

2. Deploy the agent to your local environment. The following command spins up a Docker container by using Docker compose. 
   ```sh
   arctl agent deploy myagent --runtime local
   ```

3. List the containers in your environment. Verify that you see a `myagent-1` and `agentregistry_runtime-myagent-1` container. 
   ```sh
   docker ps
   ```
   
   Example output: 
   ```console
   CONTAINER ID   IMAGE                                                               COMMAND                  CREATED              STATUS                  PORTS                                                                                                                                                                                                                                                                                                                                                                                                                                 NAMES
   816ad44cba11   ghcr.io/myagent:latest                                              "kagent-adk run --ho…"   About a minute ago   Up About a minute       0.0.0.0:40529->40529/tcp, [::]:40529->40529/tcp                                                                                                                                                                                                                                                                                                                                                                                       agentregistry_runtime-myagent-1
   21f9b99ae517   ghcr.io/agentregistry-dev/agentregistry/arctl-agentgateway:0.1.13   "/usr/local/bin/agen…"   About a minute ago   Up About a minute       0.0.0.0:21212->21212/tcp, [::]:21212->21212/tcp  
   ```

{{% /tab %}}
{{% tab %}}

1. Open the [agentregistry UI](http://localhost:12121). 
2. Go into the **Agents** view.
   
3. Select the agent that you pushed to agentregistry.
4. Click the **Publish** button on the top right. 

![](../../img/publish.png)

You'll see an output similar to the below:

![](../../img/publishoutput.png)

4. Click on the **Published** tab.
![](../../img/published.png)

5. Click the purple **Deploy** button on your published agent.
![](../../img/deploybutton.png)

6. Choose **Local (Docker Compose)**
![](../../img/local-deploy.png)

7. Go into the **Deployed** tab on the top right and you'll see your agent deployed successfully.
![](../../img/local-deploy-success.png)

{{% /tab %}}
{{< /tabs >}}

## Chat with the agent



## Cleanup

