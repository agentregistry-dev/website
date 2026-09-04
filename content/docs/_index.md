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
# PDF export. This one page opting into `book` is the whole opt-in: the format
# stitches this page plus its entire .Pages subtree into one print document. This
# site is flat and unversioned, so there is exactly one page to target and the
# manual covers the whole of /docs/.
#
# LIST THE WHOLE SET, not just html and book. Hugo's `outputs` REPLACES a page's
# defaults rather than adding to them, so `["html", "book"]` would silently drop
# this page's .md, RSS and llms.txt. Nothing fails and only this page is
# affected, which is exactly why it would survive review. These four are
# `outputs.section` from hugo.yaml, copied, plus `book`.
#
# The book is not built by an ordinary build: docs-theme-extras gates it behind
# `HUGO_PARAMS_BUILDBOOK=true`, which only the PDF workflow in solo-io/docs sets.
outputs: ["html", "rss", "markdown", "llms", "book"]
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