1. Install the agentregistry `arctl` binary on your local machine.
   ```sh
   curl -fsSL https://raw.githubusercontent.com/agentregistry-dev/agentregistry/main/scripts/get-arctl | bash

   export PATH="/usr/local/bin:$PATH"
   ```

2. Verify that the CLI is installed correctly.
   ```sh
   arctl version
   ```

3. Download the Docker Compose file that matches your installed `arctl` version.
   ```sh
   export VERSION="$(arctl version | awk 'NR == 1 { print $3 }')"
   curl -fsSLo agentregistry-compose.yml \
     "https://raw.githubusercontent.com/agentregistry-dev/agentregistry/${VERSION}/docker/docker-compose.yml"
   ```

4. Start the agentregistry server and its bundled PostgreSQL database.
   ```sh
   docker compose -f agentregistry-compose.yml up -d --wait
   ```

   Example output: 
   ```console
   [+] Running 4/4
    ✔ Network agentregistry_agentregistry-network  Created                                                                                                                                                                                 0.0s 
    ✔ Volume agentregistry_postgres_data           Created                                                                                                                                                                                 0.0s 
    ✔ Container agent-registry-postgres            Healthy                                                                                                                                                                                 6.3s 
    ✔ Container agentregistry-server               Healthy    
    ```

5. [Open the agentregistry UI](http://localhost:12121/) in your browser. The UI is automatically exposed on port 12121 on your local machine.

   {{< reuse-image src="img/ar-local.svg" width="800px" srcDark="img/ar-local-dark.svg" >}}