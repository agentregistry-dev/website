---
title: arctl agent init
weight: 10
---

Bootstrap a new agent project. You must specify the ADK (Agent Development Kit) framework, the programming language, and the name of the directory you want to create.

Supported frameworks and languages:
- `adk` (python)

If no custom instruction file is provided, a default dice-rolling instruction will be used.
If no model flags are provided, defaults to Gemini (`gemini-2.0-flash`).

## Usage

```sh
arctl agent init [framework] [language] [agent-name] [flags]
```

Examples:
```sh
arctl agent init adk python dice
arctl agent init adk python dice --instruction-file instructions.md
arctl agent init adk python dice --model-provider Gemini --model-name gemini-2.0-flash
arctl agent init adk python dice --image ghcr.io/myorg/dice:v1.0
```

## Command-specific flags

```sh
--description string        Description for the agent
--image string              Docker image name including tag (e.g., ghcr.io/myorg/myagent:v1.0, docker.io/user/image:latest)
--instruction-file string   Path to file containing custom instructions for the root agent
--model-name string         Model name (e.g., gpt-4, claude-3-5-sonnet, gemini-2.0-flash) (default "gemini-2.0-flash")
--model-provider string     Model provider (OpenAI, Anthropic, Gemini, AzureOpenAI, Agentgateway) (default "Gemini")
--telemetry string          OTLP endpoint URL for OpenTelemetry traces (e.g., http://localhost:4318/v1/traces)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
