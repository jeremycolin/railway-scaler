import { graphql } from "../codegen/index.ts";
import { createRailwayApi } from "../railway-api.ts";

const serviceInstanceInfoQuery = graphql(`
  query serviceInstanceInfo($environmentId: String!, $serviceId: String!) {
    serviceInstance(environmentId: $environmentId, serviceId: $serviceId) {
      id
      numReplicas
      sleepApplication
      service {
        id
        name
      }
      latestDeployment {
        id
        status
      }
    }
  }
`);

export async function getServiceInstanceInfo({
  railwayProjectAccessToken,
  environmentId,
  serviceId,
}: {
  railwayProjectAccessToken: string;
  environmentId: string;
  serviceId: string;
}) {
  const executor = createRailwayApi(railwayProjectAccessToken);
  return executor(serviceInstanceInfoQuery, { environmentId, serviceId });
}
