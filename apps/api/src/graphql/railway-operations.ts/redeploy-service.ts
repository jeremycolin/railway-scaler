import { graphql } from "../codegen/index.ts";
import { createRailwayApi } from "../railway-api.ts";

const redeployServiceMutation = graphql(`
  mutation redeployService($serviceId: String!, $environmentId: String!) {
    serviceInstanceRedeploy(serviceId: $serviceId, environmentId: $environmentId)
  }
`);

export async function redeployService(token: string, { environmentId, serviceId }: { environmentId: string; serviceId: string }) {
  const executor = createRailwayApi(token);
  return executor(redeployServiceMutation, {
    serviceId,
    environmentId,
  });
}
