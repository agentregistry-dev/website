---
title: Create a skill
weight: 10
description:
---

Quickly create an agent skill using the built-in skill scaffold.

## Before you begin

Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon.

## Create a skill

Agentregistry comes with a built-in skill template that you can use to quickly create skills or customize them to your needs.

1. Create a skill scaffold.

   The following command creates a `myskill` directory that includes a starter skill with a Python script and supporting files.
   ```sh
   arctl skill init myskill
   ```

2. Explore the skill scaffold that was created for you. You can optionally make changes to the files to customize your skill further.
   ```
   ls myskill
   ```

   Example output:
   ```
   assets      Dockerfile  LICENSE.txt references  scripts     SKILL.md
   ```

   | File | Description |
   | -- | -- |
   | `assets` | Directory containing static assets such as images, files, or other resources used by the skill. |
   | `Dockerfile` | The Dockerfile to spin up and run your skill in a containerized environment. |
   | `LICENSE.txt` | License file containing the license information for your skill. |
   | `references` | Directory containing reference documentation, links, or additional resources related to the skill. |
   | `scripts` | Directory containing helper scripts for building, testing, or running the skill. |
   | `SKILL.md` | The skill definition file with YAML frontmatter that describes the skill, its capabilities, and metadata. This file is required for publishing the skill to agentregistry. |

## The SKILL.md file

The `SKILL.md` file is the core definition of your skill. It uses YAML frontmatter to define metadata, followed by markdown content that describes the skill's capabilities and usage instructions.

```markdown
---
name: myskill
description: A brief description of what this skill does
---
# My Skill

Detailed instructions and documentation for the skill.
This content is included when the skill is used by an agent.
```

The frontmatter fields:

| Field | Description |
| -- | -- |
| `name` | The skill name. Used as the identifier when publishing. If omitted, the directory name is used. |
| `description` | A short description of the skill's purpose. Displayed in the registry listing. |

## Next steps

- [Publish the skill](/docs/skills/publish/) to agentregistry so others can discover and use it.
- [Pull a skill](/docs/skills/pull/) from the registry to use it locally.
