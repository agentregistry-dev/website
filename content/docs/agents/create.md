---
title: Create and run
weight: 10
description: "Scaffold an agent and run it locally by using agentregistry."
---

## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon.
2. Install [`uv`](https://docs.astral.sh/uv/getting-started/installation/).

## Create an agent

In this guide, you create a Python agent by using the [Google Agent Development Kit (ADK)](https://google.github.io/adk-docs/) framework. ADK is an open-source framework for building AI agents. The agent uses Gemini as its language model, which requires a Google API key to authenticate requests to the Gemini API.

1. Create an agent.

   The following command scaffolds a `myagent` Python agent with the ADK framework, configured to use the `gemini-2.5-flash` model. When you run the command, a `myagent` directory is created on your local machine that contains the scaffold for your agent. You see the directory structure in your CLI output. The agent has built-in tools to roll a die and check whether a number is prime.

   ```sh
   arctl init agent myagent --framework adk --language python --model-provider gemini --model-name gemini-2.5-flash
   ```

   Example output:
   ```console
   ✓ Created agent: myagent (framework: adk, language: python, model: gemini/gemini-2.5-flash)

   🚀 Next steps:
     1. Run locally (optional):
        arctl run myagent
        (export GOOGLE_API_KEY in your shell or set it in .env first)
     2. Publish to the registry:
        arctl apply -f myagent/agent.yaml
   ```

2. Explore the agent scaffold. You can make changes to the files to customize your agent.

   ```sh
   ls myagent
   ```

   Example output:
   ```console
   agent.yaml  arctl.yaml  Dockerfile  docker-compose.yaml  .env  myagent/  pyproject.toml  README.md
   ```

   | File | Description |
   | --- | --- |
   | `agent.yaml` | The v1alpha1 agent definition. Contains the image reference, MCP server attachments, and other catalog metadata. Apply this file to publish the agent to the registry. |
   | `arctl.yaml` | Local build config that records the framework, language, and environment variable requirements for this project. Used by `arctl run` and `arctl build`. |
   | `.env` | Environment variables the framework needs at runtime, such as API keys. This file is gitignored. |
   | `Dockerfile` | Builds the agent container image. |
   | `docker-compose.yaml` | Used by `arctl run` to start the agent locally. |
   | `myagent/` | Contains the agent source code, including the agent definition and the agent card. |
   | `pyproject.toml` | Python project dependencies. |
   | `README.md` | Introduction and customization instructions for the scaffolded agent. |

3. Review the agent manifest that was created for you. Note that by default, agentregistry adds a default image source of `ghcr.io/myagent:latest` to the manifest. This image location is later used when you build the agent image or push it to your container registry. To learn how to update this image reference, see the [Publish to catalog]({{< link path="/agents/publish/" >}}) guide. 
   ```sh
   cat myagent/agent.yaml
   ```

   Example output: 
   ```console
   apiVersion: ar.dev/v1alpha1
   kind: Agent
   metadata:
     name: myagent
   spec:
     description: myagent agent
     source:
       image: ghcr.io/myagent:latest
   ```

## Run the agent locally

You can try out the agent that the scaffold created by using the `arctl run` command. The agent uses Gemini as its language model, so you need a Google API key to authenticate requests to the Gemini API. 

1. Set your Gemini API key. You can retrieve it from the [Google AI Studio](https://aistudio.google.com/app/api-keys).

   ```sh
   export GOOGLE_API_KEY=<apikey>
   ```

2. Run the agent locally.

   ```sh
   arctl run myagent
   ```

   {{< reuse-image src="img/ar-run-agent.png" srcDark="img/ar-run-agent.png" >}}

3. Chat with the agent. For example, you can ask it what it can do for you. 

   {{< reuse-image src="img/ar-run-agent-chat.png" srcDark="img/ar-run-agent-chat.png" >}}

4. Exit the agent with **Ctrl+C**.

## Next

{{< cards >}}
{{< card link="../mcp/" title="Add MCP servers" description="Give your agent access to tools exposed by an MCP server." >}}
{{< card link="../publish/" title="Publish the agent" description="Build and publish your agent to the agentregistry catalog." >}}
{{< /cards >}}
