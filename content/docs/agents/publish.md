---
title: Publish
weight: 20
description:
---

Build and publish your agent image in agentregistry by using the `arctl agent build` and `arctl agent publish` commands. 

## About publishing agents

Agentregistry serves as a catalog for your AI artifacts, including agents, skills, and MCP servers. To control which images you want to make available to your teams, you can use the publishing capability in agentregistry. If an image is published, a reference to its container image location is stored in agentregistry. This allows teams to quickly discover approved agents and deploy them to their environments. 

Before you can publish an image reference, you must first build the image. Agentregistry provides the following options for building you agent images: 

* **Build the image locally**. This option assumes that you want to build the agent image on your local machine only, such as for local test setups. The image is not pushed to your container registry. While you can still create a catalog entry for the agent image in agentregistry by using the `arctl agent publish` command, you cannot deploy the image to a Kubernetes cluster, unless you manually load the image to your cluster.  
* **Build and push**: This process allows you to build the agent image on your local machine and push it to your container registry. Note that this option requires you to be logged into the container registry that you want to use and that the `agent.yaml` file includes the correct container registry and image tag details.  

For testing purposes, the instructions in this guide assume that you do not want to use agentregistry to push the image to your container registry. 

## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon. 
2. [Build an agent](/docs/agents/build/). 

## Publish the agent image

1. Build the agent image on your local machine. The following command builds the image with the Dockerfile that is included in your `myagent` scaffold and tags it with the container registry and version information that is provided in the `agent.yaml` file. If you followed the instructions in this guide, `ghcr.io/myagent:latest` is used. 

   ```sh
   arctl agent build myagent
   ```

   Example output: 
   ```console
   [+] Building 48.4s (12/12) FINISHED                                                                                                                                                                                             docker:desktop-linux
   => [internal] load build definition from Dockerfile                                                                                                                                                                                            0.1s
   => => transferring dockerfile: 384B                                                                                                                                                                                                            0.0s
   => [internal] load metadata for ghcr.io/kagent-dev/kagent/kagent-adk:0.7.4 
   ...
   ✅ Successfully built Docker image: ghcr.io/myagent:latest
   ```

   {{< callout type="tip" >}}
   To also use agentregistry to push the image to your container registry, include the `--push` option. You can also set the platform, for which you want to build the image, such as `linux/amd64`. For more information, see the [arctl agent build](/docs/reference/cli/arctl-agent-build/) command. Make sure that you are logged in to your container registry before you run the command.
   {{< /callout >}}

2. Verify that the image is built. 
   ```sh
   docker images | grep ghcr.io/myagent
   ```

   Example output: 
   ```console
   ghcr.io/myagent                                              latest    b530ddc3c8d8   11 minutes ago   2.9GB
   ```

3. Publish the agent in agentregistry. The following command adds a reference to your image location in agentregistry. 
   ```sh
   arctl agent publish myagent
   ```

   Example output: 
   ```
   Agent 'myagent' version latest published successfully
   ```

4. List the agent image references in agentregistry. Verify that you see an entry for the `myagent` agent image that you just published. 
   ```sh
   arctl agent list
   ```

   Example output:
   ```
   NAME      VERSION   FRAMEWORK   LANGUAGE   PROVIDER   MODEL              DEPLOYED   PUBLISHED
   myagent   latest    adk         python     gemini     gemini-2.0-flash   False      True
   ```

5. Optional: Open the [agentregistry UI](http://localhost:12121) and go to the **Agents** view. Verify that you can see your agent image reference. 
   {{< reuse-image src="img/ar-list-agent.png" >}}
   {{< reuse-image-dark srcDark="img/ar-list-agent.png" >}}

## Next

Now that you published the agent image, you can [deploy the agent to your environment](/docs/agents/deploy/). 


## Cleanup

To unpublish an agent image from agentregistry, use the `arctl agent unpublish` command. 

```sh
arctl agent unpublish myagent
```