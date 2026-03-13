---
title: arctl deployments delete
weight: 10
---

Delete a deployment by its ID. This removes the deployment record and tears down any associated resources.

## Usage

```sh
arctl deployments delete <deployment-id>
```

Example:
```sh
arctl deployments delete abc12345
arctl deployments delete abc12345-def6-7890-ghij-klmnopqrstuv
```

The deployment ID can be the full ID or a unique prefix (as shown in `arctl deployments list`).

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
