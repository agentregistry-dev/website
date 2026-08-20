---
title: Pull skills
weight: 30
description: "Pull a published skill from agentregistry and extract its contents to your local machine."
---

## Before you begin

1. Install agentregistry on [Kubernetes]({{< link path="/setup/kubernetes" >}}).
2. [Create and publish a skill]({{< link path="/skills/publish/" >}}) to the registry catalog.

## Pull a skill from the registry

Use the `arctl pull skill` command to download a skill from the registry and extract its contents locally.

The `pull` command reads the skill's `spec.source.repository` setting from the registry and clones it locally by using a shallow clone (`--depth 1`). If a `subfolder` is set in the skill definition, only the files from that subdirectory are copied to the output directory.

> [!NOTE]
> The `pull` command uses the source reference that you set in the `spec.source.repository` block, **not the commit** that was automatically pinned by the registry controller in the `status.resolvedSource.commit` field when you published the skill. If you published the skill without a specific commit ID, such as by only defining a branch and subfolder, the `pull` command fetches the current tip of that branch. To get a reproducible pull, publish the skill with a `commit` SHA instead of a branch.

> [!TIP]
> By default the skill is pulled into the directory that you are currently in. To define a different directory, add the directory path to your command, such as `arctl pull skill myskill ./my-output-dir`. For other command options, see the [CLI reference]({{< link path="/reference/cli/arctl-pull/" >}}).

```sh
arctl pull skill myskill
```

Example output: 
```console
Cloning https://github.com/my-org/myrepo (branch main) into /my/current/path
(subfolder hint: agentregistry/myskill)
Pulled myskill
```
