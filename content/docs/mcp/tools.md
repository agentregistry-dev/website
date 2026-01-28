---
title: Add tools
weight: 15
description:
---

Add tools to your MCP server.

## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon. 
2. Install [`uv`](https://docs.astral.sh/uv/getting-started/installation/). 
3. [Build and run](/docs/mcp/build/) your first MCP server. 

## Add tools

1. If you have not done so yet, create an MCP server. Enter an optional description, author name, and email, or skip these by pressing the return key. 

   The following command creates a `my-mcp-server` FastMCP server with an echo tool. When you run the command, a `my-mcp-server` directory is created on your local machine that contains the scaffold for your MCP server.  
   ```sh
   arctl mcp init python my-mcp-server
   ```

2. Create a scaffold for an `add_number` tool. The following command creates an `add_number.py` file in the `my-mcp-server` project. 
   ```sh
   arctl mcp add-tool add_number --project-dir my-mcp-server
   ```

3. Review the `add_number` tool scaffold that was created for you. 
   ```sh
   nano my-mcp-server/src/tools/add_number.py
   ```
   
4. Add the following code snippet to create the `add_number` tool. The code takes two integer numbers and returns the sum of both integers to the user. 
   ```yaml
   @mcp.tool()
   def add_numbers(a: float, b: float) -> str:
    """Add two numbers together and return the result.

    Args:
        a: The first number to add.
        b: The second number to add.

    Returns:
        A string representing the sum of the two numbers.
    """
    # Optional: Get config if you want to control formatting/units
    config = get_tool_config("add_numbers")
    unit = config.get("unit", "")

    result = a + b
    
    return int(a + b)
   ```

5. Re-build the MCP server image. 
   ```sh
   arctl mcp build my-mcp-server
   ```

6. Run the MCP server on your local machine and note the MCP server URL that the server is exposed on. Note that you might need to stop any previously created Docker containers by using the `docker stop <container>` and `docker rm <container>` commands. 
   ```sh
   arctl mcp run my-mcp-server
   ```

   Example output: 
   ```console
   Running local MCP server: my-mcp-server (version 0.1.0)
   Using Docker image: my-mcp-server:0.1.0

   MCP Server URL: http://localhost:57196/mcp

   Press CTRL+C to stop the server...

   2026-01-27 22:12:40,261 - INFO - Loaded tool module: echo
   2026-01-27 22:12:40,261 - INFO - 📦 Successfully loaded 1 tools
   2026-01-27 22:12:40,647 - INFO - HTTP Request: GET https://pypi.org/pypi/fastmcp/json "HTTP/1.1 200 OK"
   ...
   ```

7. Open the MCP inspector tool.
   ```sh
   npx modelcontextprotocol/inspector#0.18.0
   ```

8. Connect to your MCP server. Enter the following details. 
   * Transport type: Select **Streamable HTTP**. 
   * URL: The MCP server URL that you retrieved earlier, such as `http://localhost:57196/mcp`. 
   * Click **Connect**. 

9. Go to the **Tools** tab and verify that you see the newly added `add_number` tool. Try out the tool by entering two integer numbers, such as 5 and 3. Then, click **Run Tool**. Verify that the sum of both numbers is returned. 
   {{< reuse-image src="img/mcp-add-tool.png" >}}
   {{< reuse-image-dark srcDark="img/mcp-add-tool-dark.png" >}}


## Next

[Publish your MCP server image to agentregistry](/docs/mcp/publish/). 

   
