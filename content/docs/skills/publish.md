---
title: Create and publish
weight: 20
description:
---

Quickly create an agent skill and publish it to agentregistry.

## About publishing skills

Agentregistry serves as a catalog for your AI artifacts, including agents, skills, and MCP servers. To control which images you want to make available to your teams, you can use the publishing capability in agentregistry. If an image is published, a reference to its container image location is stored in agentregistry. This allows teams to quickly discover approved skills and pull them from the registry. 

Before you can publish an image reference, you must first build the image. Agentregistry provides the following options for building your skill images: 

* **Build the image locally**. This option assumes that you want to build the skill image on your local machine only, such as for local test setups. The image is not pushed to your container registry. While you can still create a catalog entry for the skill image in agentregistry by using the `arctl skill publish` command, you cannot deploy the image to a Kubernetes cluster, unless you manually load the image to your cluster.  
* **Build and push**: This process allows you to build the skill image on your local machine and push it to your container registry. Note that this option requires you to be logged into the container registry that you want to use.  

For testing purposes, the instructions in this guide assume that you do not want to use agentregistry to push the image to your container registry. 

## Create the skill

1. Create a scaffold for an `myskill` Claude skill. The following command creates a `myskill` directory that includes a `hello-world.py` script that generates a greeting output based on the input parameters that you provide. 
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


## Publish the skill

1. Publish the skill to agentregistry. The following command builds and tags the skill image as `docker.io/user/hello-world-template:latest` and creates a catalog entry for the skill in agentregistry. The catalog entry assumes that the image is located in the `docker.io/user` image registry. Note that `docker.io/user` is a dummy container registry address that is used for testing purposes. 

   ```sh
   arctl skill publish myskill --docker-url docker.io/user
   ```

   Example output: 
   ```console
   Found 1 skill(s) to publish
   Processing skill: /Users/myuser/Downloads/myskill
   Building Docker image (Dockerfile via stdin): docker build -t docker.io/user/hello-world-template:latest -f - /Users/myuser/Downloads/myskill
   [+] Building 0.2s (5/5) FINISHED                                                                                                                                                                                              docker:desktop-linux
    => [internal] load build definition from Dockerfile                                                                                                                                                                                          0.0s
    => => transferring dockerfile: 59B                                                                                                                                                                                                           0.0s
    => [internal] load .dockerignore                                                                                                                                                                                                             0.0s
    => => transferring context: 2B                                                                                                                                                                                                               0.0s
    => [internal] load build context                                                                                                                                                                                                             0.0s
    => => transferring context: 51.86kB                                                                                                                                                                                                          0.0s
    => [1/1] COPY . .                                                                                                                                                                                                                            0.0s
    => exporting to image    
   ...
   ✓ Skill publishing complete!                                          
   ```

   {{< callout type="tip" >}}
   To also use agentregistry to push the image to your container registry, include the `--push` option and set the `--docker-url` to your container registry address. You can also set the platform, for which you want to build the image, such as `linux/amd64` by using the `--platform` option. For more information, see the [arctl skill publish](/docs/reference/cli/arctl-skill-publish/) command. Make sure that you are logged in to your container registry before you run the command.
   {{< /callout >}}

2. List the skill image references in agentregistry. Verify that you see an entry for the `hello-world-template` image reference that you just published. 
   ```sh
   arctl skill list
   ```

   Example output:
   ```
   NAME                   TITLE   VERSION   CATEGORY   PUBLISHED   WEBSITE
   hello-world-template           latest    <none>     True        
   ```

3. Optional: Open the [agentregistry UI](http://localhost:12121) and go to the **Skills** view. Verify that you can see your agent image reference. 
   {{< reuse-image src="img/ar-publish-skill.png" >}}
   {{< reuse-image-dark srcDark="img/ar-publish-skill.png" >}}


## Cleanup

To unpublish a skill image from agentregistry, use the `arctl skill unpublish` command. 

```sh
arctl skill unpublish hello-world-template --version latest
```


