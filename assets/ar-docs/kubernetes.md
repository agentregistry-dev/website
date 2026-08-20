The agentregistry Helm chart includes a bundled PostgreSQL instance for development and evaluation. For production, [bring your own PostgreSQL instance]({{< link path="/operations/database/" >}}) instead.

1. Install agentregistry with the bundled PostgreSQL instance.
   ```sh
   helm upgrade -i agentregistry oci://ghcr.io/agentregistry-dev/agentregistry/charts/agentregistry \
       --namespace agentregistry \
       --create-namespace
   ```

   > [!NOTE]
   > The bundled PostgreSQL instance is for development and evaluation only. Data is lost if the PostgreSQL pod is restarted or rescheduled. For production, [use an external PostgreSQL instance]({{< link path="/operations/database/" >}}) instead.

2. Verify that the agentregistry and PostgreSQL pods are up and running.
   ```sh
   kubectl get pods -n agentregistry
   ```

   Example output:
   ```console
   NAME                                       READY   STATUS    RESTARTS   AGE
   agentregistry-c46b8bd98-hvnzf              1/1     Running   0          45s
   agentregistry-postgresql-9858cbcbf-tk7p9   1/1     Running   0          45s
   ```

3. Port-forward the agentregistry service to access the UI and API from your local machine.
   ```sh
   kubectl port-forward -n agentregistry svc/agentregistry 12121:12121
   ```

4. Optional: To connect AI development tools to the registry MCP server, port-forward the MCP port in a separate terminal. For more information, see [Connect AI clients to the registry MCP server]({{< link path="/setup/mcp-client/" >}}). 
   ```sh
   kubectl port-forward -n agentregistry svc/agentregistry 31313:31313
   ```

5. [Open the agentregistry UI](http://localhost:12121/) in your browser.

   {{< reuse-image src="img/ar-local.svg" srcDark="img/ar-local-dark.svg" >}}