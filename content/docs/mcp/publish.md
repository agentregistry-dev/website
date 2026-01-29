---
title: Publish
weight: 20
description:
---

Build your MCP server image and push it to agentregistry so that you can start sharing the MCP server with other teams and deploying it to any environment. 

## About publishing MCP servers

Agentregistry serves as a catalog for your AI artifacts, including agents, skills, and MCP servers. To control which images you want to make available to your teams, you can use the publishing capability in agentregistry. If an image is published, a reference to its container image location is stored in agentregistry. This allows teams to quickly discover approved MCP servers and deploy them from the registry. 

Before you can publish an image reference, you must first build the image. Agentregistry provides the following options for building your MCP server images: 

* **Build the image locally**. This option assumes that you want to build the MCP server image on your local machine only, such as for local test setups. The image is not pushed to your container registry. While you can still create a catalog entry for the skill image in agentregistry by using the `arctl mcp publish` command, you cannot deploy the image to a Kubernetes cluster, unless you manually load the image to your cluster.  
* **Build and push**: This process allows you to build the MCP server image on your local machine and push it to your container registry. Note that this option requires you to be logged into the container registry that you want to use.  

For testing purposes, the instructions in this guide assume that you do not want to use agentregistry to push the image to your container registry. 


## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon. 
2. [Create an MCP server](/docs/mcp/create/). 

## Publish the server

1. If you have not done so yet, build the MCP server image on your local machine. 
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

2. Publish the image to agentregistry. The following command builds and tags the MCP server image as `docker.io/user/my-mcp-server:0.1.0t` and creates a catalog entry for the server in agentregistry. The catalog entry assumes that the image is located in the `docker.io/user` image registry. Note that `docker.io/user` is a dummy container registry address that is used for testing purposes only. 
   ```sh
   arctl mcp publish my-mcp-server --docker-url docker.io/user
   ```

   {{< callout type="tip" >}}
   To also use agentregistry to push the image to your container registry, include the `--push` option and set the `--docker-url` to your container registry address. You can also set the platform, for which you want to build the image, such as `linux/amd64` by using the `--platform` option. For more information, see the [arctl skill publish](/docs/reference/cli/arctl-skill-publish/) command. Make sure that you are logged in to your container registry before you run the command.
   {{< /callout >}}


   Example output: 
   ```console
   Publishing MCP server from: /Users/user/Downloads/new-server
   Processing mcp server: new-server
   Building Docker image for python project...
   #0 building with "desktop-linux" instance using docker driver

   #1 [internal] load build definition from Dockerfile

   ...
   #23 exporting manifest list sha256:33f5c3220ead89daa14abfda4da60d0117cb7d71f11f6b7e3e8946908d3bab44 done
   #23 naming to docker.io/user/new-server:0.1.0
   #23 naming to docker.io/user/new-server:0.1.0 done
   #23 unpacking to docker.io/user/new-server:0.1.0 0.0s done
   #23 DONE 0.1s
   ✓ Successfully built Docker image: docker.io/user/new-server:0.1.0
   ✓ MCP Server publishing complete!
   ```

2. List the MCP server image references in your registry. Verify that you see the `my-mcp-server` MCP server image that you just published. 
   ```sh
   arctl mcp list
   ```

   Example output:
   ```
   NAME                VERSION   TYPE   PUBLISHED   DEPLOYED   UPDATED
   user/my-mcp-server  0.1.0     oci    True        False      7s
   ```

3. Optional: Open the [agentregistry UI](http://localhost:12121) and go to the **Servers** view. Verify that you can see your MCP server image. 
   {{< reuse-image src="img/ar-list-server.png" >}}
   {{< reuse-image-dark srcDark="img/ar-list-server.png" >}}


## Next

Now that you published the MCP server image, you can [deploy the server to your environment](/docs/mcp/deploy/). 


## Cleanup

To unpublish an image from agentregistry, use the `arctl mcp unpublish` command. 

```sh
arctl mcp unpublish user/my-mcp-server --version 0.1.0 
```