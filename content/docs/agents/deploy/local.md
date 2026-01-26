---
title: Local
weight: 10
description: Deploy an agent from agentregistry to your local environment. 
---

Deploy an agent from agentregistry to your local environment. 

## Before you begin

1. Make sure that the agentregistry daemon is running. 
   ```sh
   arctl version
   ```

2. Create an agent. The following command creates a `myagent` directory that contains the scaffold for your agent. You can optionally go to the `myagent` directory to make changes to your agent. 
   ```sh
   arctl agent init adk python myagent
   ```

3. Build and push the agent to agentregistry. 
   ```sh
   arctl agent build myagent --push
   ```

## Deploy the agent

{{< tabs items="UI,CLI" >}}
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
{{% tab %}}

1. Publish the agent to agentregistry
```
arctl agent publish ./myagtesting/
```

2. Deploy the agent locally via agentregistry
```
arctl agent deploy myagtesting --runtime local
```

{{% /tab %}}
{{< /tabs >}}