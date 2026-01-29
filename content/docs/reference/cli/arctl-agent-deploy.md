---
title: arctl agent deploy
weight: 10
---

Deploy an agent from the registry. You can choose between deploying the agent to your local environment or to a Kubernetes cluster. 

## Usage

```sh
arctl agent deploy [agent-name] [flags]
```

Example: 
```sh
arctl agent deploy my-agent --version latest
arctl agent deploy my-agent --version 1.2.3
arctl agent deploy my-agent --version latest --runtime kubernetes --namespace my-namespace
```

## Command-specific flags

```sh
--namespace string: Kubernetes namespace to use for the agent deployment
--prefer-remote: Prefer using a remote source when available
--runtime string: Deployment runtime target (local, kubernetes) (default "local")
--version string: Agent version to deploy (default "latest")
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
