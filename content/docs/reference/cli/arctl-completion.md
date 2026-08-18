---
title: arctl completion
description: "Generate shell autocompletion scripts for arctl."
weight: 10
---

Generate the autocompletion script for `arctl` for the specified shell.

## Usage

```sh
arctl completion [command]
```

Available sub-commands: `bash`, `fish`, `powershell`, `zsh`

## bash

```sh
arctl completion bash
```

To load completions in your current shell session:
```sh
source <(arctl completion bash)
```

To load completions for every new session (execute once):
```sh
# Linux:
arctl completion bash > /etc/bash_completion.d/arctl

# macOS:
arctl completion bash > $(brew --prefix)/etc/bash_completion.d/arctl
```

## fish

```sh
arctl completion fish
```

To load completions in your current shell session:
```sh
arctl completion fish | source
```

To load completions for every new session (execute once):
```sh
arctl completion fish > ~/.config/fish/completions/arctl.fish
```

## powershell

```sh
arctl completion powershell
```

To load completions in your current shell session:
```sh
arctl completion powershell | Out-String | Invoke-Expression
```

To load completions for every new session, add the output of the above command to your PowerShell profile.

## zsh

```sh
arctl completion zsh
```

To enable shell completion (execute once):
```sh
echo "autoload -U compinit; compinit" >> ~/.zshrc
```

To load completions in your current shell session:
```sh
source <(arctl completion zsh)
```

To load completions for every new session (execute once):
```sh
# Linux:
arctl completion zsh > "${fpath[1]}/_arctl"

# macOS:
arctl completion zsh > $(brew --prefix)/share/zsh/site-functions/_arctl
```

## Command-specific flags

```sh
    --no-descriptions   Disable completion descriptions
```

## Global flags

```sh
-h, --help                    Display help information for the command.
    --registry-token string   Registry bearer token (defaults to value of ARCTL_API_TOKEN env var)
    --registry-url string     Registry URL (overrides ARCTL_API_BASE_URL env var; defaults to http://localhost:12121)
```
