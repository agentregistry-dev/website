---
title: Publish
weight: 20
description:
---

Publish skills to agentregistry so others can discover and pull them.

## About publishing skills

Agentregistry serves as a catalog for your AI artifacts, including agents, skills, and MCP servers. To control which images you want to make available to your teams, you can use the publishing capability in agentregistry. If a skill is published, a reference to its source (container image or GitHub repository) is stored in agentregistry. This allows teams to quickly discover approved skills and pull them from the registry.

Agentregistry supports multiple publishing modes:

* **From a local skill folder**: Reads metadata from a local `SKILL.md` file and publishes the skill with either a pre-built Docker image reference or a GitHub repository reference.
* **Direct registration**: Registers a skill by name with a GitHub repository or Docker image reference, without needing any local files.

## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon.
2. If publishing from a local folder, [create a skill](/docs/skills/create/) first.

## Build the skill (optional)

If you want to publish your skill as a Docker image, build it first using the `arctl skill build` command:

```sh
arctl skill build ./myskill --image docker.io/user/hello-world-template:v1.0.0
```

To also push the image to your container registry, include the `--push` option:

```sh
arctl skill build ./myskill --image docker.io/user/hello-world-template:v1.0.0 --push
```

{{< callout type="tip" >}}
To also use agentregistry to push the image to your container registry, include the `--push` option. You can also set the platform, for which you want to build the image, such as `linux/amd64` by using the `--platform` option. For more information, see the [arctl mcp build](/docs/reference/cli/arctl-mcp-build/) command. Make sure that you are logged in to your container registry before you run the command.
{{< /callout >}}


## Publish the skill

Review the different ways how you can publish a skill.

### Option 1: Publish with a Docker image (from local folder)

Use this option when you have a local skill folder with a `SKILL.md` file and have already built a Docker image using `arctl skill build`.

```sh
arctl skill publish ./myskill \
  --docker-image docker.io/user/hello-world-template:v1.0.0 \
  --version 1.0.0
```

The skill name and description are read from the local `SKILL.md` file. The `--docker-image` flag specifies the pre-built Docker image to register.

{{< callout type="tip" >}}
To preview the registry entry without creating it, use the `--dry-run` flag.
{{< /callout >}}

### Option 2: Publish from a GitHub repository (with local folder)

Use this option when you have the skill files locally but want to register a GitHub repository as the source instead of a Docker image. The skill metadata, such as the name and description, is read from the local `SKILL.md` file.

```sh
arctl skill publish ./myskill \
  --github https://github.com/myorg/my-skills/tree/main/skills/myskill \
  --version 1.0.0
```

The `--github` flag accepts full GitHub tree URLs that include a branch and subdirectory path. This path tells the registry exactly where to find the skill within the repository:

| URL format | Example |
| -- | -- |
| Repository root | `https://github.com/myorg/my-skills` |
| Specific branch | `https://github.com/myorg/my-skills/tree/main` |
| Branch and subdirectory | `https://github.com/myorg/my-skills/tree/main/skills/myskill` |

{{< callout type="tip" >}}
To preview the registry entry without creating it, use the `--dry-run` flag.
{{< /callout >}}

### Option 3: Direct registration with GitHub (no local files needed)

Use this option to register a skill that exists only in a GitHub repository without needing any local files. Instead of reading from a `SKILL.md` file, you provide the skill name and metadata directly via flags.

```sh
arctl skill publish my-remote-skill \
  --github https://github.com/myorg/my-skills/tree/main/skills/my-remote-skill \
  --version 1.0.0 \
  --description "A remotely hosted skill"
```

In direct mode:
- The first argument is the **skill name** (not a folder path).
- `--github` and `--version` are **required** and represent the source GitHub repository and the version you want to use for your skill.
- `--description` is optional.

{{< callout type="tip" >}}
To preview the registry entry without creating it, use the `--dry-run` flag.
{{< /callout >}}

### Option 4: Direct registration with Docker image (no local files needed)

Use this option to register a skill with a pre-built Docker image reference without needing any local files.

```sh
arctl skill publish my-docker-skill \
  --docker-image docker.io/myorg/my-skill:v1.0.0 \
  --version 1.0.0 \
  --description "A Docker-packaged skill"
```

In direct mode:
- The first argument is the **skill name** (not a folder path).
- `--docker-image` and `--version` are **required**.
- `--description` is optional.

{{< callout type="tip" >}}
To preview the registry entry without creating it, use the `--dry-run` flag.
{{< /callout >}}

## Verify the published skill

1. List the skill references in agentregistry. Verify that you see an entry for the skill that you just published.
   ```sh
   arctl skill list
   ```

   Example output:
   ```
   NAME                   TITLE   VERSION   TYPE     SOURCE
   hello-world-template           1.0.0     docker   docker.io/user/hello-world-template:v1.0.0
   ```

2. Optional: Open the [agentregistry UI](http://localhost:12121) and go to the **Skills** view. Verify that you can see your skill.
   {{< reuse-image src="img/ar-publish-skill.png" >}}
   {{< reuse-image-dark srcDark="img/ar-publish-skill-dark.png" >}}

## Next steps

- [Add a skill to your agent](/docs/agents/skills/).
- [Pull a skill](/docs/skills/pull/) from the registry to use it locally.

## Cleanup

To delete a skill from agentregistry, use the `arctl skill delete` command.

```sh
arctl skill delete hello-world-template --version 1.0.0
```
