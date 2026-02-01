import { graphql } from "../codegen/index.ts";
import { createRailwayApi } from "../railway-api.ts";

const deploymentRemoveMutation = graphql(`
  mutation deploymentRemove($id: String!) {
    deploymentRemove(id: $id)
  }
`);

export async function removeDeployment({
  railwayProjectAccessToken,
  deploymentId,
}: {
  railwayProjectAccessToken: string;
  deploymentId: string;
}) {
  const executor = createRailwayApi(railwayProjectAccessToken);
  return executor(deploymentRemoveMutation, { id: deploymentId });
}
