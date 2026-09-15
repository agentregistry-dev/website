---
title: Expose an MCP Registry v0.1 API
weight: 30
description: "Re-expose the MCP servers in your catalog through the official MCP Registry v0.1 read API so that registry-aware clients, such as VS Code, can discover them."
---

Agentregistry can re-expose the MCPServer resources in your catalog through the read API of the [official MCP Registry](https://github.com/modelcontextprotocol/registry), in the standard `server.json` shape. Registry-aware clients, such as the VS Code MCP gallery, use this API to discover the MCP servers in your catalog.

This compatibility layer does not change the native `MCPServer` API. You continue using `arctl` or the REST API to build out and update your catalog. The compatibility layer only adds a read-only, alternate view of the same resources that you have in your catalog — you cannot use it to publish or update MCP servers.

## v0.1 spec endpoints

When you enable the compatibility layer, the registry server serves the following endpoints at the standard spec paths. You can optionally configure a custom prefix as the base path for these endpoints. For more information, see [Enable the compatibility layer](#enable-the-compatibility-layer).

| Method | Path | Description |
| -- | -- | -- |
| `GET` | `/v0.1/servers` | List servers. Cursor-paginated. Each response carries a token that you pass back to fetch the next page, instead of a page number. To filter or search the list, see [Filter search results](#filter). |
| `GET` | `/v0.1/servers/{serverName}/versions` | List all versions of one server. |
| `GET` | `/v0.1/servers/{serverName}/versions/{version}` | Get one version. The `{version}` segment accepts `latest`. |

The `{serverName}` segment is the namespace-qualified `<namespace>/<name>` catalog name, such as `default/weather`. URL-encode the forward slash as `%2F` in both routes above, for example `GET /v0.1/servers/default%2Fweather/versions/latest`. A request that leaves the slash unencoded does not match the route.

> [!NOTE]
> The [MCP Registry v0.1 API spec](https://github.com/modelcontextprotocol/registry/blob/main/docs/reference/api/official-registry-api.md) also defines write endpoints, such as publishing a server or editing its status. Agentregistry does not support any of these write endpoints. The compatibility layer serves only the read paths in the preceding table.

#### Filter search results {#filter}

Add query parameters to the `GET /v0.1/servers` path to search, filter, or page through the catalog as shown in the following example request:
```sh
GET /v0.1/servers?limit=50&search=weather&updated_since=2026-09-01T00:00:00Z&include_deleted=false&version=1.2.0
```

| Parameter | Description |
| -- | -- |
| `search` | Filters the list to servers where the resource name contains this text, such as `weather` in the example. Case-insensitive. Matches the resource-name column only, not the namespace-qualified catalog name that the endpoint returns. |
| `limit` | The number of servers to return per page. Capped at 100. Omit to use the default page size. |
| `cursor` | A pagination token. Set this to the `metadata.nextCursor` value from a previous response to get the next page. Omit to get the first page. |
| `updated_since` | An RFC3339 timestamp, such as `2026-09-01T00:00:00Z`. Returns only servers that changed at or after this time. |
| `version` | Filters the list to one specific version of each server. Omit this parameter, or set it to `latest`, to return only the latest version of each server, which is the default. |
| `include_deleted` | Set to `true` to include servers that are pending deletion. Defaults to `false`. |

Responses use the official MCP Registry envelope, with camelCase fields and an `io.modelcontextprotocol.registry/official` `_meta` block. The following example is trimmed for readability. A response also includes fields such as `$schema`, `description`, `title`, `repository`, and `statusChangedAt` that are omitted here. 

```console
{
  "servers": [
    {
      "server": {
        "name": "default/weather",
        "version": "1.2.0",
        "packages": [],
        "remotes": []
      },
      "_meta": {
        "io.modelcontextprotocol.registry/official": {
          "status": "active",
          "isLatest": true,
          "publishedAt": "2026-08-01T12:00:00Z",
          "updatedAt": "2026-08-01T12:00:00Z"
        }
      }
    },
    {
      "server": {
        "name": "default/echo",
        "version": "0.3.1",
        "packages": [],
        "remotes": []
      },
      "_meta": {
        "io.modelcontextprotocol.registry/official": {
          "status": "active",
          "isLatest": true,
          "publishedAt": "2026-07-14T09:30:00Z",
          "updatedAt": "2026-07-14T09:30:00Z"
        }
      }
    }
  ],
  "metadata": { "nextCursor": "eyJvZmZzZXQiOjUwfQ", "count": 2 }
}
```

The `metadata.nextCursor` value is not empty here, so more servers exist past this page. Pass the `metadata.nextCursor` value back as `cursor` on the next request. A response with no further pages omits the `nextCursor` field entirely.

## Access

The compatibility endpoints have no authentication. Enabling the layer does not lower your security posture below that existing baseline, but it does add one more reachable, unauthenticated path. Anyone who can reach the registry over the network can list and read your entire MCP server catalog. Only enable it on a registry where a public, read-only catalog is acceptable.

> [!WARNING]
> A remote MCP server's stored headers, including an `Authorization` header value, are returned as-is in the catalog response. If you registered a remote MCP server with a credential in its headers, that credential is exposed to anyone who can reach this endpoint once the compatibility layer is enabled. Rotate or avoid storing long-lived credentials in remote server headers on a registry where you plan to enable this layer.

## Limitations

- **v0.1 only.** The legacy, deprecated `v0` MCP Registry API is not served.
- **Read-only.** The [MCP Registry v0.1 API spec](https://github.com/modelcontextprotocol/registry/blob/main/docs/reference/api/official-registry-api.md) also defines write endpoints, such as publishing a server or editing its status. Agentregistry does not support any of these write endpoints. The compatibility layer serves only the read paths.
- **Best-effort version mapping.** The catalog picks a server's `version` from the first of these that is set: the package version (an npm or PyPI version, or the OCI tag or digest), a non-`latest` tag on the server itself, or `0.0.0` as a last resort. Because the package version is used as-is, an OCI image tagged `:latest` shows up as `"version": "latest"` in the catalog.
- **Best-effort transport mapping.** If a server uses an `http` transport, the catalog relabels it as `streamable-http` and fills in a placeholder URL, such as `http://localhost:<port><path>`, which is a requirement from the spec. This placeholder is not necessarily where the server is actually reachable.

## Before you begin

1. Install agentregistry on [Kubernetes]({{< link path="/setup/kubernetes" >}}), or run it locally with Docker Compose.
2. [Publish at least one MCP server]({{< link path="/mcp/local/publish/" >}}) to the catalog, or [register a remote one]({{< link path="/mcp/remote/" >}}).
3. If you plan to verify the compatibility layer with VS Code, expose the registry through an ingress or gateway that terminates HTTPS in front of it. VS Code requires the registry to be exposed on an HTTPS URL and refuses a plain `http://` URL. Port-forwarding the registry on `localhost` does not work for VS Code.

## Enable the compatibility layer

The compatibility layer is off by default. Enable it by setting the `AGENT_REGISTRY_MCP_REGISTRY_COMPAT_ENABLED` environment variable to `true` on the registry server.

{{< tabs >}}
{{% tab name="Docker" %}}

1. Add the environment variable to the `agentregistry` service in your `docker-compose.yml`.

   ```yaml
   services:
     agentregistry:
       environment:
         AGENT_REGISTRY_MCP_REGISTRY_COMPAT_ENABLED: "true"
   ```

2. Restart the service.

   ```sh
   docker compose up -d agentregistry
   ```

{{% /tab %}}
{{% tab name="Kubernetes" %}}

1. Pass the environment variable as an extra env var in your Helm upgrade command.

   ```sh
   helm upgrade -i agentregistry oci://ghcr.io/agentregistry-dev/agentregistry/charts/agentregistry \
     --namespace agentregistry \
     --reuse-values \
     --set extraEnvVars[0].name=AGENT_REGISTRY_MCP_REGISTRY_COMPAT_ENABLED \
     --set extraEnvVars[0].value=true
   ```

   > [!WARNING]
   > The `extraEnvVars[0]` syntax writes to the first entry in the list. If your release already sets other extra environment variables, add this variable to your Helm values file instead, so that you do not overwrite an existing entry.

2. Verify that the registry server restarted with the new environment variable.

   ```sh
   kubectl -n agentregistry get deploy agentregistry \
     -o jsonpath='{.spec.template.spec.containers[0].env[?(@.name=="AGENT_REGISTRY_MCP_REGISTRY_COMPAT_ENABLED")].value}'
   ```

   Example output:
   ```console
   true
   ```

{{% /tab %}}
{{< /tabs >}}

3. Confirm that you can access the v0.1 endpoints. The following example sends a request to the `/v0.1/servers` endpoint to list available MCP servers in your catalog.

   ```sh
   curl http://localhost:12121/v0.1/servers
   ```

   Example output:
   ```console
   {
     "servers": [
       {
         "server": {
           "$schema": "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
           "name": "default/mymcp",
           "description": "mymcp MCP server",
           "title": "mymcp",
           "version": "latest",
           "packages": [
             {
               "registryType": "oci",
               "identifier": "localhost:5001/mymcp:latest"
               ...
             }
           ]
         }
         ...
       }
     ]
     ...
   }
   ```

   > [!TIP]
   > By default, the registry serves these endpoints at the root path, such as `/v0.1/servers`. To mount it under a base path instead, such as `/mcp-registry/v0.1/servers`, also set the `AGENT_REGISTRY_MCP_REGISTRY_COMPAT_PATH_PREFIX` environment variable to the prefix that you want, such as `/mcp-registry`. Use this prefix as the base of the URL that you register with a client later.

   > [!TIP]
   > To disable the compatibility layer again, repeat the same steps with `AGENT_REGISTRY_MCP_REGISTRY_COMPAT_ENABLED` set to `false`.

## Access your MCP servers in VS Code

Registry-aware clients, such as VS Code, take a base URL and append the standard relative path, such as `/v0.1/servers`, themselves. Configure only the base URL, never the full path. VS Code discovers a private MCP registry through the `McpGalleryServiceUrl` enterprise policy for GitHub Copilot. An administrator typically sets this policy outside of VS Code, at the operating system level, so it applies to every VS Code install on a managed machine.

1. Set the `McpGalleryServiceUrl` policy to the HTTPS base URL of the ingress or gateway that you set up in [Before you begin](#before-you-begin), such as `https://registry.example.com`, or `https://registry.example.com/mcp-registry` if you configured `AGENT_REGISTRY_MCP_REGISTRY_COMPAT_PATH_PREFIX`. Depending on the type of machine that you use, you must set the policy in a different way:

   | Platform | Where to set the policy |
   | -- | -- |
   | Windows | Push a Windows Registry value through the Group Policy or Intune. Use the registry key `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\GitHubCopilot` and value `McpGalleryServiceUrl`. You can alternatively write the `McpGalleryServiceUrl` key into GitHub Copilot's `managed-settings.json` file. See the **Any platform** row for more details.  |
   | macOS | Push a Managed Preference through an MDM profile. Use the `com.github.copilot` preference domain and `McpGalleryServiceUrl` key. You can alternatively write the `McpGalleryServiceUrl` key into GitHub Copilot's `managed-settings.json` file. See the **Any platform** row for more details.   |
   | Any platform | Write the `McpGalleryServiceUrl` key into GitHub Copilot's `managed-settings.json` file: <ul><li>macOS: `/Library/Application Support/GitHubCopilot/managed-settings.json`</li><li>Windows: `%ProgramFiles%\GitHubCopilot\managed-settings.json`</li><li>Linux: `/etc/github-copilot/managed-settings.json`</li></ul> Use this mechanism for Linux, which has no native registry or MDM equivalent, or when you prefer a scripted file deployment over the Group Policy or MDM tooling. |

2. Restart VS Code so that it picks up the policy.
3. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and run **MCP: Browse Servers**. Alternatively, open the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`) and search for `@mcp`.
4. Confirm that the servers you published to your catalog appear in the list.
5. Select a server and select **Install** to confirm that VS Code can add it to your workspace.

> [!NOTE]
> VS Code does not support connecting to more than one private MCP registry at a time. If your organization already points `McpGalleryServiceUrl` at a different registry, adding agentregistry as a second source is not supported.

## Next steps

{{< cards >}}
{{< card link="/docs/mcp/local/publish/" title="Publish an MCP server" description="Build and publish an MCP server to the catalog so that it appears in the compatibility layer." >}}
{{< card link="/docs/mcp/remote/" title="Register remote MCP servers" description="Add an existing remote MCP server to the catalog." >}}
{{< /cards >}}
