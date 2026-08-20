1. Install the `arctl` binary on your local machine to manage agentregistry resources.
   ```sh
   curl -fsSL https://raw.githubusercontent.com/agentregistry-dev/agentregistry/main/scripts/get-arctl | bash

   export PATH="/usr/local/bin:$PATH"
   ```

2. Verify that the CLI is installed correctly.
   ```sh
   arctl version
   ```

> [!TIP]
> By default, `arctl` connects to `http://localhost:12121`. If your agentregistry instance is exposed at a different address, set the `ARCTL_API_BASE_URL` environment variable or pass `--registry-url` on each command. For example: `export ARCTL_API_BASE_URL=http://<your-agentregistry-host>:12121`.