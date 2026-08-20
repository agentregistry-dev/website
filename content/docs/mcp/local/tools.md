---
title: Add tools
weight: 15
description: "Add tools to your MCP server."
---

## Before you begin

1. Install agentregistry on [Kubernetes]({{< link path="/setup/kubernetes" >}}).
2. [Create an MCP server]({{< link path="/mcp/local/create/" >}}).

## Add a tool

Each tool is a Python file in the `src/tools/` directory of your MCP scaffold. The file must import the shared `mcp` instance from `core.server` and define at least one function that is decorated with `@mcp.tool()`. The file is picked up automatically at server startup. 

1. Create a new tool file. The following command creates a greeting tool that takes a name as input and returns `Hello, {name}!`.

   ```sh
   cat > mymcp/src/tools/greet.py << 'EOF'
   from core.server import mcp

   @mcp.tool(description="Return a greeting for the given name.")
   def example_greet(name: str) -> str:
       return f"Hello, {name}!"
   EOF
   ```

2. Run the server with the MCP Inspector to verify the new tool is available.

   ```sh
   arctl run mymcp --inspector
   ```

   Example output:
   ```console
   → fastmcp-python: docker run --rm -p 3000:3000 localhost:5001/mymcp:latest --transport http --host 0.0.0.0 --port 3000
   2026-05-14 18:39:46,327 - INFO - Loaded tool module: sum
   2026-05-14 18:39:46,329 - INFO - Loaded tool module: echo
   2026-05-14 18:39:46,329 - INFO - Loaded tool module: greet
   2026-05-14 18:39:46,329 - INFO - 📦 Successfully loaded 3 tools
   ...
   INFO     Starting MCP server 'mymcp' with transport 'http' on http://0.0.0.0:3000/mcp
   ```

3. Connect to your MCP server in the Inspector tool.
   {{< reuse-image src="img/mcp-connect.svg" srcDark="img/mcp-connect-dark.svg" >}}

4. Try out the new tool.
   1. Navigate to the **Tools** tab. Verify that you see the `example_echo`, `example_sum`, and `example_greet` tools.
   2. Select the `example_greet` tool and enter any name in the **name** field, such as `me`.
   3. Click **Execute Tool** and verify that you see the `Hello, me!` message.

   {{< reuse-image src="img/mcp-greeting.svg" srcDark="img/mcp-greeting-dark.svg" >}}

5. Exit the MCP Inspector and stop the server by pressing **Ctrl+C**.

## Next

{{< cards >}}
{{< card link="/docs/mcp/local/publish/" title="Publish the MCP server" description="Build and publish your MCP server to the agentregistry catalog." >}}
{{< /cards >}}
