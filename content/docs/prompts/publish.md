---
title: Create and publish
weight: 10
description:
---

Quickly create a prompt and publish it to agentregistry.

## About prompts

Prompts are reusable, versioned text strings that serve as system instructions for agents. Instead of hardcoding instructions in agent code, you can publish prompts to agentregistry and reference them in your agent's `agent.yaml` file. When the agent runs, the prompt content is automatically resolved from the registry and used as the agent's instruction.

Prompts are plain text. You write the instruction content in a `.txt` file (or any text file) and publish it with a name and version. You can also use a YAML file for structured definitions.

## Before you begin

Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon.

## Create a prompt

Write your prompt content to a text file.

```sh
cat > code-review-prompt.txt << 'EOF'
You are an expert code reviewer. When reviewing code:
1. Check for bugs and logic errors
2. Identify security vulnerabilities
3. Suggest performance improvements
4. Ensure code follows best practices and is readable
5. Be constructive and specific in your feedback
EOF
```

## Publish the prompt

You have several options to publish a prompt. 

### Publish via CLI flags

1. Publish the prompt in agentregistry. 
   {{< tabs items="CLI flags,Prompt template" >}}
   {{% tab %}}

   Use the `arctl` CLI to define the details of your prompt, such as the name and version. 

   Publish the prompt to agentregistry. The `--name` and `--version` flags are required when publishing from a text file.
   ```sh
   arctl prompt publish code-review-prompt.txt \
     --name code-review \
     --version 1.0.0 \
     --description "System prompt for code review agent"
   ```

   Example output:
   ```console
   Publishing prompt 'code-review' version 1.0.0 from: /Users/myuser/code-review-prompt.txt
   ✓ Prompt 'code-review' version 1.0.0 published successfully!
   ```

   > [!NOTE]
   > Use `--dry-run` to preview the prompt payload without publishing. For more information, see the [arctl prompt publish](/docs/reference/cli/arctl-prompt-publish/) command.

   {{% /tab %}}
   {{% tab %}}

   For structured prompt definitions, you can use a YAML file. This lets you set all fields in one place instead of using CLI flags.

   1. Create a YAML file with your prompt definition.

      ```sh
      cat > my-prompt.yaml << 'EOF'
      name: code-review
      description: System prompt for code review agent
      version: 2.0.0
      content: |
        You are a senior code reviewer specializing in production systems.
        Focus on: correctness, security, performance, and maintainability.
        Always provide specific line references and actionable suggestions.
      EOF
      ```

   2. Publish the YAML file directly. Name and version are read from the file.
      ```sh
      arctl prompt publish my-prompt.yaml
      ```

   {{% /tab %}}
   {{< /tabs >}}

2. Verify the prompt was published.

   ```sh
   arctl prompt list
   ```

   Example output:
   ```console
   NAME          VERSION   DESCRIPTION
   code-review   1.0.0     System prompt for code review agent
   ```

3. View the prompt details.

   ```sh
   arctl prompt show code-review
   ```

   Example output:
   ```console
   PROPERTY      VALUE
   Name          code-review
   Description   System prompt for code review agent
   Version       1.0.0
   Status        active
   Content       You are an expert code reviewer. When reviewing code:
   1. Check for bugs and logic errors
   2. Identify security vulnerabilities
   3. Suggest performance improvements
   4. Ensure code follows best practices
   ...
   ```


## Next

[Add your prompt to an agent](/docs/agents/prompt). 


## Cleanup

To delete a prompt version from agentregistry, use the `arctl prompt delete` command.

```sh
arctl prompt delete code-review --version 1.0.0
```
