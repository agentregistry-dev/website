## Mac/Linux

1. Use the following `curl` command to get the latest release of agentregistry.
```
curl -fsSL https://raw.githubusercontent.com/agentregistry-dev/agentregistry/main/scripts/get-arctl | bash
```

2. To install a specific version, use the `-v` flag. For example, to install v0.1.11 of agentregistry, use the following:
```
curl -fsSL https://raw.githubusercontent.com/agentregistry-dev/agentregistry/main/scripts/get-arctl | bash -s -- -v v0.1.11
```

You will see that `arctl` (the agentregistry CLI tool) will be insatlled into `usr/local/bin/arctl`, making it usable right away as it's on your `PATH`.

## Checking Version

1. Ensure that `arctl` was installed successfully by running the `version` command.

```
arctl version
```

You'll see an output similar to the below (version/date will be different)
```
arctl version 0.1.13
Git commit: f193977
Build date: 2026-01-26
Server version: 0.1.10
Server git commit: f2b1bb5
Server build date: 2026-01-16
```