---
title: MCP Registry v0.1 compatibility
weight: 40
description: Expose the MCP servers in your registry through the official MCP Registry read API so that registry-aware clients, such as VS Code, can discover them.
---

Agentregistry can re-expose the `MCPServer` resources in your catalog through the read API of the [official MCP Registry](https://github.com/modelcontextprotocol/registry), in the standard `server.json` shape. This compatibility layer lets registry-aware clients, such as the VS Code MCP gallery, discover the MCP servers in your registry without any changes to those clients.

## About the compatibility layer

Agentregistry began as a fork of the official MCP Registry, but its public API was reorganized around Kubernetes-style `v1alpha1` resources (`MCPServer` at `/v0/mcpservers`). That change moved agentregistry off the upstream `server.json` contract, so clients that expect an MCP registry could no longer consume it.

This compatibility layer re-projects the MCPServer resources that are already in your catalog into the **frozen v0.1** MCP Registry read API. A few things to keep in mind:

* It is **read-only**. No publish or write path is available through these endpoints.
* It is **additive**. The native `v1alpha1` API is unchanged and remains the source of truth.
* It is **off by default**. You opt in with an environment variable, as described in [Configuration](#configuration).

## Endpoints

When enabled, the following endpoints are served at the standard spec paths, optionally under a configured prefix. For more information about the prefix, see [Configuration](#configuration).

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/v0.1/servers` | List servers. Cursor-paginated. Supported query parameters: `cursor`, `limit` (up to 100), `search`, `updated_since` (RFC3339), `version`, and `include_deleted`. |
| `GET` | `/v0.1/servers/{serverName}/versions` | List all versions (tags) of one server. |
| `GET` | `/v0.1/servers/{serverName}/versions/{version}` | Get one version. The `{version}` segment accepts `latest`. |

Responses use the upstream envelope, with camelCase fields and the `io.modelcontextprotocol.registry/official` `_meta` block, pinned to the `2025-12-11` schema.

```json
{
  "servers": [
    {
      "server": {
        "$schema": "…/2025-12-11/server.schema.json",
        "name": "…",
        "version": "…",
        "packages": [],
        "remotes": []
      },
      "_meta": {
        "io.modelcontextprotocol.registry/official": {
          "status": "active",
          "isLatest": true,
          "publishedAt": "…",
          "updatedAt": "…"
        }
      }
    }
  ],
  "metadata": { "nextCursor": "…", "count": 1 }
}
```

### Server names

The catalog is flattened across every namespace. Each server's `name` is `<namespace>/<resourceName>`, which uses one forward slash, as the spec requires, and is unique and reversible across namespaces.

On the get-by-name routes, you must URL-encode the `{serverName}` segment. This means encoding the slash as `%2F`, for example:

```
GET /v0.1/servers/default%2Fweather/versions/latest
```

## Point a client at the registry

Registry-aware clients take a **base URL** and append the standard relative path (`/v0.1/servers`) themselves, so you configure only the base URL, never the full path.

For VS Code, this is the enterprise or organization Copilot policy `McpGalleryServiceUrl`. This is an organization policy, not a per-user setting. Set it to one of the following values:

* The registry root, such as `https://registry.example.com`, when no prefix is configured.
* `https://registry.example.com/mcp-registry` when you set `AGENT_REGISTRY_MCP_REGISTRY_COMPAT_PATH_PREFIX=/mcp-registry`.

The client then requests `<base>/v0.1/servers`.

{{< callout type="warning" >}}
Some clients require the registry to be served over HTTPS. For example, the VS Code webview refuses `http://` URLs. If you serve agentregistry over plain HTTP for local testing, those clients cannot connect. Put the registry behind a TLS-terminating endpoint before you point such a client at it.
{{< /callout >}}

## Configuration

The compatibility layer is controlled by the following environment variables on the agentregistry server.

| Environment variable | Default | Description |
| --- | --- | --- |
| `AGENT_REGISTRY_MCP_REGISTRY_COMPAT_ENABLED` | `false` | Toggle the compatibility API. It is off by default, so you must opt in. For the reasons behind this default, see [Caveats](#caveats). |
| `AGENT_REGISTRY_MCP_REGISTRY_COMPAT_PATH_PREFIX` | `""` (empty) | An optional base prefix to mount the endpoints under, such as `/mcp-registry`. An empty value serves the spec paths at the root. The root paths do not collide with the native `/v0/*` API. |

## Caveats

Before you enable the compatibility layer, review the following behavior.

* **Unauthenticated and cross-namespace in OSS.** In the open source build, the endpoints read directly from the store across all namespaces and are unauthenticated, which matches the already-public OSS reads. Because of this, the feature ships disabled by default. Enable it only in deployments where an anonymous, flattened, all-namespace catalog is acceptable. A downstream build that restricts MCPServer reads applies the same scoping to these endpoints automatically.
* **v0.1 only.** The legacy, deprecated `v0` MCP Registry API is not served.
* **Best-effort field mapping.** Some fields are mapped on a best-effort basis:
   * `http` package transports are surfaced as `streamable-http` with a synthesized `http://localhost:<port><path>` URL.
   * A server's catalog `version` is derived from the package origin, such as the npm or PyPI version, or the OCI tag or digest, and falls back to the tag or `0.0.0`.
   * The `search` parameter matches the agentregistry resource-name column as a substring, not the namespace-qualified catalog name.
