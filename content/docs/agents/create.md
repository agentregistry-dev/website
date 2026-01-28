---
title: Create and run
weight: 10
description:
---

Quickly create an agent and run it on your local machine with built-in agent templates.

## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon. 
2. Install [`uv`](https://docs.astral.sh/uv/getting-started/installation/). 

## Create an agent

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

   {{< callout type="info">}}
   The `agent.yaml` file sets the image location that is used by agentregistry when you build the image and push it to your container registry. By default, agentregistry uses `ghcr.io` as the container registry and `latest` as the image tag, such as `ghcr.io/myagent:latest`. If you want to use agentregistry to push images to your container registry, make sure to update this file with the registry and image tag that you want to use. Note that this update is not required if you want to build images locally only without pushing them to your container registry. 
   {{< /callout >}}

   | File | Description | 
   | -- | -- | 
   | `agent.yaml` | The agent definition. This definition holds the registry location and version tag that you want to use when building and pushing the image to your registry. It also adds the MCP server references that you added to the agent. | 
   | `docker-compose.yaml` | A Docker compose file that is used to spin up and run your agent when you use the `arctl agent run` command.  | 
   | `Dockerfile` | The Dockerfile to spin up and run your agent in a containerized environment. | 
   | `myagent` | A directory that includes the `agent.py` script that defines the agent, including the provider and model that you want to use. The directory also includes the agent card for agent discovery.   | 
   | `pyproject.toml` | The dependency definition of your agent.  | 
   | `README.md` | An introduction to the agent that you created with instructions for how to further customize it. | 


## Run the agent

1. Save your Gemini API key as an environment variable. To retrieve your API key, log in to the [Google AI Studio and select API Keys](https://aistudio.google.com/app/api-keys). This key is required to interact with the agent through the Gemini LLM provider. 
   ```sh
   export GOOGLE_API_KEY=<apikey>
   ```

2. Run the agent on your local machine. 

   The following command builds the agent image on your local machine by using the image location and tag that is defined in the `agent.yaml` file. Then, it opens a terminal window where you can start chatting with your agent. 
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

[Publish your agent](/docs/agents/publish/) to agentregistry so that you can start deploying it to your environments. 
   