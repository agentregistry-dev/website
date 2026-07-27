---
title: agentregistry
linkTitle: Docs
toc: false
description: "Agentregistry is an open source, secure, centralized catalog for building, publishing, discovering, and governing AI artifacts across registries and GitHub repositories."
# Explicitly cascade the docs layout key to every descendant. Hugo defaults
# `type` to the section name ("docs") so pages render today, but making it
# explicit hardens against that default changing and satisfies the framework
# test (matches agw-oss).
cascade:
  type: docs
# Curated landing cards (headings + external video); the theme's
# auto-generated child grid can't reproduce them, so suppress it.
disableCards: true
---

Agentregistry, an open source, secure, and centralized AI artifact catalog that helps you build, package, publish, discover, and govern Docker images for AI artifacts, including agents, skills, prompts, and MCP servers that are spread across multiple container registries and GitHub repositories. It provides a centralized view of the images you allow your teams to share and deploy into their environments. 

## Get started

{{< cards >}}
{{< card link="/docs/quickstart/" title="Get started" >}}
{{< /cards >}}

## Learn more

Want to learn more about agentregistry? Check out the following resources: 

{{< cards>}}
{{< card link="/docs/about/" title="Read more about agentregistry" >}}
{{< card link="https://www.youtube.com/watch?v=l6QicyGg46A" title="Watch this video to see agentregistry in action" >}}
{{< /cards >}}