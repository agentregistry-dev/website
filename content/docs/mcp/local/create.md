---
title: Create and run
weight: 10
description: "Build and run MCP servers on your local machine with agentregistry."
---

## Before you begin

1. Install agentregistry on [Kubernetes]({{< link path="/setup/kubernetes" >}}).
2. Install [`uv`](https://docs.astral.sh/uv/getting-started/installation/).

## Create an MCP server

Agentregistry comes with built-in MCP server templates that you can use to quickly spin up MCP servers or customize them to your needs.

1. Scaffold an MCP server. The following command creates a `mymcp` directory with the FastMCP framework and Python.

   ```sh
   arctl init mcp mymcp --framework fastmcp --language python
   ```

   Example output:
   ```console
   ✓ Created MCP server: mymcp (framework: fastmcp, language: python, transport: http, port: 3000)

   🚀 Next steps:
     1. Run locally (optional):
        arctl run my-mcp
     2. Publish to the registry:
        arctl apply -f my-mcp/mcp.yaml
   ```

2. Explore the MCP server scaffold. You can make changes to the files to customize your server.

   ```sh
   ls mymcp
   ```

   Example output:
   ```console
   mcp.yaml  arctl.yaml  Dockerfile  docker-compose.yaml  .env  pyproject.toml  README.md  src  tests
   ```

   | File | Description |
   | --- | --- |
   | `mcp.yaml` | The v1alpha1 MCP server definition. Contains the image reference, transport settings, and catalog metadata. Apply this file to publish the server to the registry. |
   | `arctl.yaml` | Local build config that records the framework, language, and transport settings. Used by `arctl run` and `arctl build`. |
   | `.env` | Environment variables the server needs at runtime. This file is gitignored. |
   | `Dockerfile` | Builds the MCP server container image. |
   | `docker-compose.yaml` | Used by `arctl run` to start the server locally. |
   | `pyproject.toml` | Python project dependencies. |
   | `README.md` | Introduction and customization instructions for the scaffolded server. |
   | `src/` | MCP server source code, including tool definitions and the server bootstrap script. The scaffold includes two example tools: `echo` and `sum`. |
   | `tests/` | Generated tests for the server and its tools. |

## Run the MCP server

1. Run the MCP server on your local machine with the MCP Inspector. The `--inspector` flag starts the server and automatically opens the MCP Inspector so you can test your tools without any additional setup.

   ```sh
   arctl run mymcp --inspector
   ```

   Example output:
   ```console
   → fastmcp-python: docker run --rm -p 3000:3000 localhost:5001/mymcp:latest --transport http --host 0.0.0.0 --port 3000
   2026-05-14 18:39:46,327 - INFO - Loaded tool module: sum
   2026-05-14 18:39:46,329 - INFO - Loaded tool module: echo
   2026-05-14 18:39:46,329 - INFO - 📦 Successfully loaded 2 tools
   ...
   INFO     Starting MCP server 'mymcp' with transport 'http' on http://0.0.0.0:3000/mcp
   ```

2. Connect to your MCP server in the Inspector tool.
   {{< reuse-image src="img/mcp-connect.svg" srcDark="img/mcp-connect-dark.svg" >}}

3. Try out an MCP tool.
   1. Navigate to the **Tools** tab. Verify that you see the `example_echo` and `example_sum` tools.
   2. Select the `example_sum` tool and enter any two integer in the **a** and **b** fields.
   3. Click **Execute Tool** and verify that you see the sum of the two integers.

   {{< reuse-image src="img/ar-mcp-sum.svg" srcDark="img/ar-mcp-sum-dark.svg" >}}

4. Exit the MCP Inspector and stop the server by pressing **Ctrl+C**.

## Next

{{< cards >}}
{{< card link="/docs/mcp/local/tools/" title="Add a tool" description="Add custom tools to your MCP server." >}}
{{< card link="/docs/mcp/local/publish/" title="Publish the MCP server" description="Build and publish your MCP server to the agentregistry catalog." >}}
{{< /cards >}}
