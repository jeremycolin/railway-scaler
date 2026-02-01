import { graphql } from "../codegen/index.ts";
import { createRailwayApi } from "../railway-api.ts";

const enableServerlessMutation = graphql(`
  mutation enableServerless($environmentId: String!, $serviceId: String!, $input: ServiceInstanceUpdateInput!) {
    serviceInstanceUpdate(environmentId: $environmentId, serviceId: $serviceId, input: $input)
  }
`);

export async function enableServerless({
  railwayProjectAccessToken,
  environmentId,
  serviceId,
  enabled,
}: {
  railwayProjectAccessToken: string;
  environmentId: string;
  serviceId: string;
  enabled: boolean;
}) {
  const executor = createRailwayApi(railwayProjectAccessToken);
  return executor(enableServerlessMutation, {
    environmentId,
    serviceId,
    input: {
      sleepApplication: enabled,
    },
  });
}
