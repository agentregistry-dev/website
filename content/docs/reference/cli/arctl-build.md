---
title: arctl build
description: "Build a Docker image for a declarative resource project."
weight: 10
---

Build the Docker image for a project created with `arctl init`.

Reads `arctl.yaml` in the project directory to look up the matching framework by `(framework, language)` and dispatches to its build command. The image tag is taken from the declarative YAML's spec, or from the `--image` override.

Supported resource kinds: `Agent`, `MCPServer`

## Usage

```sh
arctl build DIRECTORY [flags]
```

Examples:
```sh
arctl build ./my-agent
arctl build ./my-server --push
arctl build ./my-agent --image ghcr.io/acme/my-agent:v1.0.0 --platform linux/amd64
```

## Command-specific flags

```sh
    --image string      Docker image tag override (default: from spec.source.image / spec.source.package.origin.identifier)
    --platform string   Target platform (e.g. linux/amd64, linux/arm64)
    --push              Push the image after building
```

## Global flags

```sh
-h, --help                    Display help information for the command.
    --registry-token string   Registry bearer token (defaults to value of ARCTL_API_TOKEN env var)
    --registry-url string     Registry URL (overrides ARCTL_API_BASE_URL env var; defaults to http://localhost:12121)
```
