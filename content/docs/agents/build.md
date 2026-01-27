---
title: Build and run
weight: 10
description:
---

Quickly build and run agents on your local machine

## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon. 
2. Install [`uv`](https://docs.astral.sh/uv/getting-started/installation/). 

## Build an agent

Agentregistry comes with built-in agent templates that you can use to quickly spin up agents or customize them to your needs. 

1. Create an agent. 

   The following command creates a `myagent` Python agent with the Google ADK agent famework that is configured to use the Gemini provider. When you run the command, a `myagent` directory is created on your local machine that contains the scaffold for your agent.  
   ```sh
   arctl agent init adk python myagent
   ```

2. Explore the agent scaffold that was created for you. You can optionally make changes to the files to customize your agent further. 
   ```
   ls myagent
   ```

   Example output: 
   ```
   agent.yaml          docker-compose.yaml Dockerfile          myagent             pyproject.toml      README.md
   ```

   | File | Description | 
   | -- | -- | 
   | `agent.yaml` | The agent definition. | 
   | `docker-compose.yaml` | A Docker compose file that is used to spin up and run your agent when you use the `arctl agent run` command.  | 
   | `Dockerfile` | The Dockerfile to spin up and run your agent in a containerized environment. | 
   | `myagent` | A directory that includes the `agent.py` script that defines the agent, including the provider and model that you want to use. The directory also includes the agent card for agent discovery.   | 
   | `pyproject.toml` | | 
   | `README.md` | An introduction to the agent that you created with instructions for how to further customize it. | 


## Run the agent

1. Save your Gemini API key as an environment variable. To retrieve your API key, log in to the [Google AI Studio and select API Keys](https://aistudio.google.com/app/api-keys).
   ```sh
   export GOOGLE_API_KEY=<apikey>
   ```

2. Run the agent on your local machine. 

   The following command opens a terminal window where you can start chatting with your agent. 
   ```sh
   arctl agent run myagent
   ```

   {{< reuse-image src="img/ar-run-agent.png" >}}
   {{< reuse-image-dark srcDark="img/ar-run-agent.png" >}}
   
3. Chat with the agent. For example, you can ask it what it can do for you. Then, hit **Enter** and wait for the agent to reply. 
   
   {{< reuse-image src="img/ar-run-agent-chat.png" >}}
   {{< reuse-image-dark srcDark="img/ar-run-agent-chat.png" >}}

4. Exit the agent by using the `ctrl + c` keys.

## Next

[Publish your agent](/docs/agents/publish/) to agentregistry so that you can start deploying them to your environments. 
   