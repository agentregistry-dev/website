---
title: Build and run
weight: 10
description:
---

Quickly build and run MCP servers on your local machine

## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon. 
2. Install [`uv`](https://docs.astral.sh/uv/getting-started/installation/). 

## Build an MCP server

Agentregistry comes with built-in MCP server templates that you can use to quickly spin up MCP servers or customize them to your needs. 

1. Create an MCP server. Enter an optional description, author name, and email, or skip these by pressing the return key. 

   The following command creates a `my-mcp-server` FastMCP server with an echo tool. When you run the command, a `my-mcp-server` directory is created on your local machine that contains the scaffold for your MCP server.  
   ```sh
   arctl mcp init python my-mcp-server
   ```

2. Explore the MCP server scaffold that was created for you. You can optionally make changes to the files to customize your agent further. 
   ```
   ls -R my-mcp-server
   ```

   Example output: 
   ```
   Dockerfile     mcp.yaml       pyproject.toml README.md      src            tests

   my-mcp-server/src:
   core    main.py tools

   my-mcp-server/src/core:
   __init__.py server.py   utils.py

   my-mcp-server/src/tools:
   __init__.py echo.py

   my-mcp-server/tests:
   test_discovery.py test_server.py    test_tools.py
   ```

   | File | Description | 
   | -- | -- | 
   | `Dockerfile` | The Dockerfile to spin up and run your MCP server in a containerized environment. | 
   | `mcp.yaml` |   | 
   | `pyproject.toml` | | 
   | `README.md` | An introduction to the MCP server that you created with instructions for how to further customize it. | 
   | `src` | A directory that contains the details of the MCP server, such as supported tools and the Python script to bootstrap and run the server.  | 
   | `tests` | A directory that contains generated tests. | 

## Build the image

To run the MCP server in an environment, you need to build the MCP server Docker image. 

```sh
arctl mcp build my-mcp-server
```

Example output: 
```console
Building Docker image for python project...
#0 building with "desktop-linux" instance using docker driver

#1 [internal] load build definition from Dockerfile
#1 transferring dockerfile: 1.84kB 0.0s done
#1 DONE 0.1s

#2 [internal] load metadata for ghcr.io/astral-sh/uv:latest
#2 ...

#3 [auth] library/python:pull token for registry-1.docker.io
...
#24 unpacking to docker.io/library/my-mcp-server:0.1.0 0.9s done
#24 DONE 3.1s
✓ Successfully built Docker image: my-mcp-server:0.1.0
```

## Run the MCP server

1. Start the MCP server. In your CLI output, note the MCP server URL. In the following example, the MCP server address is `http://localhost:57196/mcp`. 
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

2. Open the MCP inspector tool. 
   ```sh
   npx modelcontextprotocol/inspector#0.18.0
   ```

3. Connect to your MCP server. Enter the following details. 
   * Transport type: Select **Streamable HTTP**. 
   * URL: The MCP server URL that you retrieved earlier, such as `http://localhost:57196/mcp`. 
   * Click **Connect**. 

4. Go to the **Tools** tab and select the `echo` tool. Enter any string in the `message` field, and click **Run Tool**. Verify that your string is echoed back to you. 
   {{< reuse-image src="img/mcp-tool-call.png" >}}
   {{< reuse-image-dark srcDark="img/mcp-tool-call-dark.png" >}}


## Next

Explore the following tasks: 

* [Add a tool](/docs/mcp/tools) to your MCP server. 
* [Publish the MCP server to agentregistry](/docs/mcp/publish).

