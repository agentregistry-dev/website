---
title: Create and run agents
weight: 20
description:
---

## Before you beging

Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon. 

## Create the agent

1. Create an agent. The following command creates a `myagent` directory that contains the scaffold for your agent.  
   ```sh
   arctl agent init adk python myagent
   ```

2. Explore the agent scaffold that was created for you. You can optionally make changes to the files to customize your agent further. 
   ```
   cd myagent && ls
   ```

   Example output: 
   ```
   agent.yaml          docker-compose.yaml Dockerfile          myagent             pyproject.toml      README.md
   ```


## Run the agent

1. Set the API key to access Google ADK agents. 
   ```sh
   export GOOGLE_API_KEY=<apikey>
   ```

2. Run the agent on your local machine. 
   ```sh
   arctl agent run myagent
   ```
   