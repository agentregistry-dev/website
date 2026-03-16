---
title: arctl agent deploy
weight: 10
---

Deploy an agent from the registry.

## Usage

```sh
arctl agent deploy [agent-name] [flags]
```

Examples:
```sh
arctl agent deploy my-agent --version latest
arctl agent deploy my-agent --version 1.2.3
arctl agent deploy my-agent --version latest --provider-id kubernetes-default
```

## Command-specific flags

```sh
-e, --env stringArray      Environment variables to set on the deployed agent (KEY=VALUE)
    --namespace string     Kubernetes namespace for agent deployment (defaults to current kubeconfig context)
    --prefer-remote        Prefer using a remote source when available
    --provider-id string   Deployment target provider ID (defaults to local when omitted)
    --version string       Agent version to deploy (default "latest")
    --wait                 Wait for the deployment to become ready before returning (default true)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
