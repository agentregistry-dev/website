---
title: Create and publish a skill
weight: 10
description: Scaffold a skill and publish it to the agentregistry catalog.
---

## About skills

A skill is a reusable instruction set or slash command for AI agents that you can store as a versioned artifact in the catalog. Instead of sharing skill files ad-hoc, developers publish skills to the registry with a version tag. When you iterate on a skill, you publish a new version so that consumers can pull the update at any time.

Skills are defined in a markdown file named `SKILL.md`. The file uses YAML frontmatter for catalog metadata such as a name and description, followed by markdown content with the skill's instructions.

## Before you begin

Install agentregistry on [Kubernetes]({{< link path="/setup/kubernetes" >}}).

## Create a skill

Agentregistry comes with a built-in skill template that you can use to quickly scaffold a skill and customize it to your needs.

1. Create a skill scaffold.

   The following command creates a `myskill` directory that includes a starter skill definition and supporting files.

   ```sh
   arctl init skill myskill
   ```

   Example output:
   ```console
   ✓ Created skill: myskill

   🚀 Next steps:
     1. Edit myskill/SKILL.md and references/ (optional)
     2. Publish to the registry:
        arctl apply -f myskill/skill.yaml
   ```

2. Explore the skill scaffold.

   ```sh
   ls myskill
   ```

   Example output:
   ```console
   assets    LICENSE.txt   references  scripts     SKILL.md    skill.yaml
   ```

   | File | Description |
   | --- | --- |
   | `skill.yaml` | The v1alpha1 skill definition. Contains catalog metadata such as name, description, and version. Apply this file to publish the skill to the registry. |
   | `SKILL.md` | The skill instruction content. This is the markdown text that agents receive when the skill is invoked. Edit this file to define what the skill does. |
   | `assets/` | Directory for static assets such as images or files used by the skill. |
   | `references/` | Directory for supporting reference documentation, links, or additional context for the skill. |
   | `scripts/` | Directory for helper scripts, such as the starter `hello_world.py` example. |
   | `LICENSE.txt` | License information for the skill. |

3. Review the skill definition. This file describes that catalog entry that you want to create in the registry. Note that the scaffold does not include the reference to your git repository by default. You later update this skill definition to add your git reference.
   ```sh
   cat myskill/skill.yaml
   ```

   Example output: 
   ```console
   apiVersion: ar.dev/v1alpha1
   kind: Skill
   metadata:
     name: myskill
   spec:
     description: myskill skill
    title: myskill
   ```

4. Review and optionally edit the `myskill/SKILL.md` file to define your skill's instructions. Use the frontmatter to set the catalog metadata, such as the name and description for the catalog entry in the UI, and the markdown body to define your skill.
   ```sh
   nano myskill/skill.md
   ```

<!--
## Push to GitHub

Before you publish the skill in the registry catalog, it is recommended to store the plugin code in a git repository, such as GitHub or GitLab, and to add a reference to that repository to your skill definition. When you publish a skill to the catalog, agentregistry resolves the repository information to a commit and stores the commit alongside the skill. This way, the skill becomes reproducible, even if the repository points to the main that is constantly updated. 

1. Initialize a git repository in the skill directory and push it to GitHub.

   ```sh
   cd myskill
   git init
   git remote add origin https://github.com/my-org/myskill
   git add .
   git commit -m "Initial skill scaffold"
   git push -u origin main
   ```

2. Get the commit SHA for the branch you want to publish from.

   ```sh
   git ls-remote https://github.com/my-org/myskill.git main
   ```

3. Update the skill definition file (`skill.yaml`) to add a `source.repository` block that pins to that commit. Use `subfolder` if your skill lives in a subdirectory of a monorepo.

   ```sh
   cat > myskill/skill.yaml << 'EOF'
   apiVersion: ar.dev/v1alpha1
   kind: Skill
   metadata:
     name: myskill
   spec:
     title: My Skill
     description: A reusable skill stored in git.
     source:
       repository:
         url: https://github.com/my-org/myskill
         commit: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2
         subfolder: skills/myskill  # optional: omit if not a monorepo
   EOF
   ```

   > [!NOTE]
   > Agentregistry requires a pinned commit SHA. The registry daemon does not have `git` installed, so it cannot resolve branch names to commits. Run `git ls-remote` locally to get the SHA before publishing.

-->

## Publish the skill

1. Publish the skill to agentregistry. 
   ```sh
   arctl apply -f myskill/skill.yaml
   ```

   Example output:
   ```console
   ✓ Skill/myskill (latest) created
   ```

   The skill controller resolves the branch to a concrete commit and records it in the `status.resolvedSource.commit` of your skill, so the registry always tracks exactly which revision is live.

2. Verify that the skill was registered.

   ```sh
   arctl get skills
   ```

   Example output:
   ```console
   NAME      TAG      DESCRIPTION
   myskill   latest   A reusable skill stored in git.
   ```

3. Optional: Open the [agentregistry UI](http://localhost:12121) and go to the **Skills** view. Verify that you can see your skill.
   {{< reuse-image src="img/ar-publish-skill.svg" srcDark="img/ar-publish-skill-dark.svg"  >}}

## Next steps

{{< cards >}}
{{< card link="/docs/agents/skills/" title="Add a skill to an agent" description="Configure an agent to use a skill from the registry." >}}
{{< card link="/docs/skills/pull/" title="Pull a skill from the registry" description="Pull a skill from the registry to use it locally." >}}
{{< /cards >}}

## Cleanup

To delete a skill from agentregistry, use the `arctl delete skill` command.

```sh
arctl delete skill myskill
```
