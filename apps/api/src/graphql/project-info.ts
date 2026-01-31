import { graphql } from "./codegen/index.ts";
import { createRailwayApi } from "./railway-api.ts";

const ProjectTokenInfoQuery = graphql(`
  query ProjectTokenInfo {
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

export async function getProjectInfo(token: string) {
  console.log("token: ", token);
  const executor = createRailwayApi(token);
  const { data, errors } = await executor(ProjectTokenInfoQuery);
  console.log("data: ", data);
  console.log("errors: ", errors);
  return { data, errors };
}
