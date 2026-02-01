/* eslint-disable */
import * as types from "./graphql.ts";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "\n  mutation deployService($serviceId: String!, $environmentId: String!) {\n    serviceInstanceDeployV2(serviceId: $serviceId, environmentId: $environmentId)\n  }\n": typeof types.DeployServiceDocument;
  "\n  mutation deploymentRemove($id: String!) {\n    deploymentRemove(id: $id)\n  }\n": typeof types.DeploymentRemoveDocument;
  "\n  mutation enableServerless($environmentId: String!, $serviceId: String!, $input: ServiceInstanceUpdateInput!) {\n    serviceInstanceUpdate(environmentId: $environmentId, serviceId: $serviceId, input: $input)\n  }\n": typeof types.EnableServerlessDocument;
  "\n  query environmentInfo($id: String!) {\n    environment(id: $id) {\n      id\n      name\n      serviceInstances {\n        edges {\n          node {\n            id\n            numReplicas\n            sleepApplication\n            service {\n              id\n              name\n            }\n            latestDeployment {\n              id\n              status\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.EnvironmentInfoDocument;
  "\n  query projectTokenInfo {\n    projectToken {\n      project {\n        id\n        name\n        environments {\n          edges {\n            node {\n              id\n              name\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.ProjectTokenInfoDocument;
  "\n  mutation redeployService($serviceId: String!, $environmentId: String!) {\n    serviceInstanceRedeploy(serviceId: $serviceId, environmentId: $environmentId)\n  }\n": typeof types.RedeployServiceDocument;
  "\n  query serviceInstanceInfo($environmentId: String!, $serviceId: String!) {\n    serviceInstance(environmentId: $environmentId, serviceId: $serviceId) {\n      id\n      numReplicas\n      sleepApplication\n      service {\n        id\n        name\n      }\n      latestDeployment {\n        id\n        status\n      }\n    }\n  }\n": typeof types.ServiceInstanceInfoDocument;
  "\n  mutation updateReplicas($environmentId: String!, $serviceId: String!, $input: ServiceInstanceUpdateInput!) {\n    serviceInstanceUpdate(environmentId: $environmentId, serviceId: $serviceId, input: $input)\n  }\n": typeof types.UpdateReplicasDocument;
};
const documents: Documents = {
  "\n  mutation deployService($serviceId: String!, $environmentId: String!) {\n    serviceInstanceDeployV2(serviceId: $serviceId, environmentId: $environmentId)\n  }\n":
    types.DeployServiceDocument,
  "\n  mutation deploymentRemove($id: String!) {\n    deploymentRemove(id: $id)\n  }\n": types.DeploymentRemoveDocument,
  "\n  mutation enableServerless($environmentId: String!, $serviceId: String!, $input: ServiceInstanceUpdateInput!) {\n    serviceInstanceUpdate(environmentId: $environmentId, serviceId: $serviceId, input: $input)\n  }\n":
    types.EnableServerlessDocument,
  "\n  query environmentInfo($id: String!) {\n    environment(id: $id) {\n      id\n      name\n      serviceInstances {\n        edges {\n          node {\n            id\n            numReplicas\n            sleepApplication\n            service {\n              id\n              name\n            }\n            latestDeployment {\n              id\n              status\n            }\n          }\n        }\n      }\n    }\n  }\n":
    types.EnvironmentInfoDocument,
  "\n  query projectTokenInfo {\n    projectToken {\n      project {\n        id\n        name\n        environments {\n          edges {\n            node {\n              id\n              name\n            }\n          }\n        }\n      }\n    }\n  }\n":
    types.ProjectTokenInfoDocument,
  "\n  mutation redeployService($serviceId: String!, $environmentId: String!) {\n    serviceInstanceRedeploy(serviceId: $serviceId, environmentId: $environmentId)\n  }\n":
    types.RedeployServiceDocument,
  "\n  query serviceInstanceInfo($environmentId: String!, $serviceId: String!) {\n    serviceInstance(environmentId: $environmentId, serviceId: $serviceId) {\n      id\n      numReplicas\n      sleepApplication\n      service {\n        id\n        name\n      }\n      latestDeployment {\n        id\n        status\n      }\n    }\n  }\n":
    types.ServiceInstanceInfoDocument,
  "\n  mutation updateReplicas($environmentId: String!, $serviceId: String!, $input: ServiceInstanceUpdateInput!) {\n    serviceInstanceUpdate(environmentId: $environmentId, serviceId: $serviceId, input: $input)\n  }\n":
    types.UpdateReplicasDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation deployService($serviceId: String!, $environmentId: String!) {\n    serviceInstanceDeployV2(serviceId: $serviceId, environmentId: $environmentId)\n  }\n",
): typeof import("./graphql.ts").DeployServiceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation deploymentRemove($id: String!) {\n    deploymentRemove(id: $id)\n  }\n",
): typeof import("./graphql.ts").DeploymentRemoveDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation enableServerless($environmentId: String!, $serviceId: String!, $input: ServiceInstanceUpdateInput!) {\n    serviceInstanceUpdate(environmentId: $environmentId, serviceId: $serviceId, input: $input)\n  }\n",
): typeof import("./graphql.ts").EnableServerlessDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query environmentInfo($id: String!) {\n    environment(id: $id) {\n      id\n      name\n      serviceInstances {\n        edges {\n          node {\n            id\n            numReplicas\n            sleepApplication\n            service {\n              id\n              name\n            }\n            latestDeployment {\n              id\n              status\n            }\n          }\n        }\n      }\n    }\n  }\n",
): typeof import("./graphql.ts").EnvironmentInfoDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query projectTokenInfo {\n    projectToken {\n      project {\n        id\n        name\n        environments {\n          edges {\n            node {\n              id\n              name\n            }\n          }\n        }\n      }\n    }\n  }\n",
): typeof import("./graphql.ts").ProjectTokenInfoDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation redeployService($serviceId: String!, $environmentId: String!) {\n    serviceInstanceRedeploy(serviceId: $serviceId, environmentId: $environmentId)\n  }\n",
): typeof import("./graphql.ts").RedeployServiceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query serviceInstanceInfo($environmentId: String!, $serviceId: String!) {\n    serviceInstance(environmentId: $environmentId, serviceId: $serviceId) {\n      id\n      numReplicas\n      sleepApplication\n      service {\n        id\n        name\n      }\n      latestDeployment {\n        id\n        status\n      }\n    }\n  }\n",
): typeof import("./graphql.ts").ServiceInstanceInfoDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation updateReplicas($environmentId: String!, $serviceId: String!, $input: ServiceInstanceUpdateInput!) {\n    serviceInstanceUpdate(environmentId: $environmentId, serviceId: $serviceId, input: $input)\n  }\n",
): typeof import("./graphql.ts").UpdateReplicasDocument;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
