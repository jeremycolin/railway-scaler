import { graphql } from "../codegen/index.ts";
import { createRailwayApi } from "../railway-api.ts";

const updateReplicasMutation = graphql(`
  mutation updateReplicas($environmentId: String!, $serviceId: String!, $input: ServiceInstanceUpdateInput!) {
    serviceInstanceUpdate(environmentId: $environmentId, serviceId: $serviceId, input: $input)
  }
`);

export async function updateReplicas({
  railwayProjectAccessToken,
  environmentId,
  serviceId,
  numReplicas,
}: {
  railwayProjectAccessToken: string;
  environmentId: string;
  serviceId: string;
  numReplicas: number;
}) {
  const executor = createRailwayApi(railwayProjectAccessToken);
  return executor(updateReplicasMutation, {
    environmentId,
    serviceId,
    input: {
      numReplicas,
    },
  });
}
