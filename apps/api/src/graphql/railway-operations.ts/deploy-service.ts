import { graphql } from "../codegen/index.ts";
import { createRailwayApi } from "../railway-api.ts";

const deployServiceMutation = graphql(`
  mutation deployService($serviceId: String!, $environmentId: String!) {
    serviceInstanceDeployV2(serviceId: $serviceId, environmentId: $environmentId)
  }
`);

export async function deployService(token: string, { environmentId, serviceId }: { environmentId: string; serviceId: string }) {
  const executor = createRailwayApi(token);
  return executor(deployServiceMutation, {
    serviceId,
    environmentId,
  });
}
