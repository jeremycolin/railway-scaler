import { graphql } from "../codegen/index.ts";
import { createRailwayApi } from "../railway-api.ts";

const projectTokenInfoQuery = graphql(`
  query projectTokenInfo {
    projectToken {
      project {
        id
        name
        environments {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  }
`);

export async function getProjectInfo({ railwayProjectAccessToken }: { railwayProjectAccessToken: string }) {
  const executor = createRailwayApi(railwayProjectAccessToken);
  return executor(projectTokenInfoQuery);
}
