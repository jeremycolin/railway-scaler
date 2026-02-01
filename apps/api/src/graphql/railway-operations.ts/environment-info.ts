import { graphql } from "../codegen/index.ts";
import { createRailwayApi } from "../railway-api.ts";

const environmentInfoQUery = graphql(`
  query environmentInfo($id: String!) {
    environment(id: $id) {
      id
      name
      serviceInstances {
        edges {
          node {
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
      }
    }
  }
`);

export async function getEnvironmentInfo({ railwayProjectAccessToken, id }: { railwayProjectAccessToken: string; id: string }) {
  console.log("fetch!");
  const executor = createRailwayApi(railwayProjectAccessToken);
  return executor(environmentInfoQUery, { id });
}
