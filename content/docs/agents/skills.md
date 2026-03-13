---
title: Add skills
weight: 55
---

Give an agent access to skills that are published in agentregistry. Skills are loaded into the agent at runtime and made available under the `/skills` folder.

## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon.
2. [Create an agent](/docs/agents/create/).
3. [Create a skill](/docs/skills/create/) and [publish it](/docs/skills/publish/) to agentregistry.

## Add a skill

You can add a skill to your agent from two sources: a published skill in agentregistry, or a container image directly.

### From the registry

Add a skill that was previously published to agentregistry by referencing the skill name in the registry.

1. List the skills that are published in agentregistry.
   ```sh
   arctl skill list
   ```

   Example output:
   ```
   NAME                   VERSION   STATUS   UPDATED
   user/argocd-cli-setup  1.0.0     active   2m
   ```

2. Add the skill to your agent.
   ```sh
   arctl agent add-skill my-skill \
     --project-dir myagent \
     --registry-skill-name user/argocd-cli-setup
   ```

   Example output:
   ```
   ✓ Added skill 'my-skill' to agent.yaml
   ```

   You can optionally specify a version and a registry URL:

   | Flag | Description |
   | -- | -- |
   | `--registry-skill-name` | Name of the skill in the registry. Required. |
   | `--registry-skill-version` | Version to use. If omitted, the latest version is used. |
   | `--registry-url` | Registry URL. If omitted, the default registry is used. |

### From a container image

If the skill is packaged as a Docker image, you can reference it directly without publishing to the registry first.

```sh
arctl agent add-skill my-skill \
  --project-dir myagent \
  --image docker.io/org/my-skill:1.0.0
```

### Verify the agent definition

After adding a skill, verify that the `agent.yaml` file was updated.

```sh
cat myagent/agent.yaml
```

Example output:
```yaml
agentName: myagent
image: ghcr.io/myagent:latest
language: python
framework: adk
modelProvider: gemini
modelName: gemini-2.0-flash
description: ""
skills:
    - name: my-skill
      registrySkillName: user/argocd-cli-setup
```

## Run the agent with skills

When you run an agent locally, agentregistry resolves the skills from the registry and makes them available to the agent.

```sh
arctl agent run myagent
```

During startup, arctl:

1. Resolves each skill in the agent manifest from the registry.
2. Downloads the skill contents. Docker-packaged skills are extracted from the container image. GitHub-hosted skills are cloned from the repository.
3. Places all skill files in a temporary directory and sets the `KAGENT_SKILLS_FOLDER` environment variable to point to it.
4. Mounts the skills directory into the agent container at `/skills` (read-only).

The agent can then load and use the skills from the `/skills` folder at runtime.

## Deploy the agent with skills to Kubernetes

When you deploy an agent that references skills to Kubernetes, agentregistry resolves the skills and adds them to the Agent custom resource (CR). The kagent operator then handles pulling the skills into the agent pod.

```sh
arctl deployments create myagent --type agent --provider-id kubernetes-default
```

During deployment, arctl:

1. Resolves each skill from the registry to determine its source (Docker image or GitHub repository).
2. Populates the `spec.skills` field on the Agent CR:
   - Docker/OCI images are added to `spec.skills.refs`.
   - GitHub repositories are added to `spec.skills.gitRefs` with the repository URL, branch, and subdirectory path.
3. The kagent operator pulls the skill contents into the agent pod and makes them available under `/skills`.

Example Agent CR with skills:
```yaml
apiVersion: kagent.dev/v1alpha2
kind: Agent
metadata:
  name: myagent
spec:
  type: BYO
  byo:
    deployment:
      image: ghcr.io/myagent:latest
  skills:
    refs:
      - docker.io/org/my-docker-skill:1.0.0
    gitRefs:
      - url: https://github.com/org/skills.git
        ref: main
        path: skills/my-skill
        name: my-skill
```

## Cleanup

To remove a skill from the agent, edit the `agent.yaml` file and remove the skill reference from the `skills` list. Then, re-build and re-run or re-deploy the agent.
