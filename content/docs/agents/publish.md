---
title: Publish an agent
weight: 30
description:
---

Push your agent to agentregistry so that you can deploy it to your environment. 

## Before you begin

1. Install agentregistry. 
2. Create an agent. 

## Publish the agent

Push the agent to your local agentregistry. 

1. Publish the agent. 
   ```sh
   arctl agent publish myagent
   ```

   Example output: 
   ```
   Agent 'myagent' version latest published successfully
   ```

2. List the agents in your registry. Verify that you see the `myagent` agent that you just published. 
   ```sh
   arctl agent list
   ```

   Example output:
   ```
   NAME      VERSION   FRAMEWORK   LANGUAGE   PROVIDER   MODEL              DEPLOYED   PUBLISHED
   myagent   latest    adk         python     gemini     gemini-2.0-flash   False      True
   ```

## Next

Now that you published the agent, you can [deploy it to your environment](/docs/agents/deploy/). 
