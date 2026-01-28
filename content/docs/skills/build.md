---
title: Build
weight: 10
description:
---

Create a skill. 

## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon. 
2. Install [`uv`](https://docs.astral.sh/uv/getting-started/installation/). 

## Create a skill

1. Create a scaffold for an `add_numbers` skill. The following command creates a `add_numbers` skill template that you can use to define your skill.  
   ```sh
   arctl skill init add_numbers
   ```