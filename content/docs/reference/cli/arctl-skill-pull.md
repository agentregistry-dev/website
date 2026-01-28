---
title: arctl skill pull
weight: 10
---

Pull a skill's Docker image from the registry and extract its contents to a local directory.

If output-directory is not specified, it will be extracted to ./skills/<skill-name>

## Usage

```sh
arctl skill pull <skill-name> [output-directory] [flags]
```

Example: 
```sh
arctl skill pull add_numbers
arctl skill pull add_numbers ./my-skills
```

## Command-specific flags

No command-specific flags.

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
