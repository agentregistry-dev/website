---
title: Publish
weight: 20
description:
---

Build your agent image and push it to agentregistry so that you can start sharing the agent with other teams and deploying it to any environment. 

## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon. 
2. [Build an agent](/docs/agents/build/). 

## Publish the agent

1. Build the agent image and push it to agentregistry. The following command uses the Dockerfile that is included in your agent scaffold to build the agent and automatically pushes the agent to agentregistry with the `latest` tag. You can optionally first build the agent image on your local machine by using the `arctl agent build` command. To tag the image withs a different version, use the `--version` option. 

   ```sh
   arctl agent publish myagent
   ```

   Example output: 
   ```
   Agent 'myagent' version latest published successfully
   ```

2. List the agent images in your registry. Verify that you see the `myagent` agent that you just published. 
   ```sh
   arctl agent list
   ```

   Example output:
   ```
   NAME      VERSION   FRAMEWORK   LANGUAGE   PROVIDER   MODEL              DEPLOYED   PUBLISHED
   myagent   latest    adk         python     gemini     gemini-2.0-flash   False      True
   ```

3. Optional: Open the [agentregistry UI](http://localhost:12121) and go to the **Agents** view. Verify that you can see your agent image. 
   {{< reuse-image src="img/ar-list-agent.png" >}}
   {{< reuse-image-dark srcDark="img/ar-list-agent.png" >}}

## Next

Now that you published the agent image, you can [deploy the agent to your environment](/docs/agents/deploy/). 


## Cleanup

To remove an agent image from agentregistry, use the `arctl agent unpublish` command. 

```sh
arctl agent unpublish myagent
```