import { getEnvironmentInfo } from "../graphql/railway-operations.ts/environment-info.ts";
import { getServiceInstanceInfo } from "../graphql/railway-operations.ts/service-instance-info.ts";

export async function resolveEnvironment(railwayProjectAccessToken: string, environmentId: string) {
  const { data } = await getEnvironmentInfo({ railwayProjectAccessToken, id: environmentId });
  if (!data?.environment) {
    return {
      id: "",
      name: "",
      serviceInstances: [],
    };
  }
  const { environment } = data;
  return {
    id: environment.id,
    name: environment.name,
    serviceInstances: environment.serviceInstances.edges
      .map(({ node }) => ({
        __typename: "ServiceInstance" as const,
        id: node.id,
        numReplicas: node.numReplicas ?? 0,
        sleepApplication: node.sleepApplication ?? false,
        service: {
          __typename: "Service" as const,
          id: node.service.id,
          name: node.service.name,
        },
        latestDeployment: node.latestDeployment
          ? {
              __typename: "Deployment" as const,
              id: node.latestDeployment.id,
              status: node.latestDeployment.status,
            }
          : null,
      }))
      .reverse(),
  };
}

export async function resolveServiceInstance(railwayProjectAccessToken: string, environmentId: string, serviceId: string) {
  const { data } = await getServiceInstanceInfo({ railwayProjectAccessToken, environmentId, serviceId });
  if (!data?.serviceInstance) {
    return {
      __typename: "ServiceInstance" as const,
      id: "",
      numReplicas: 0,
      sleepApplication: false,
      service: {
        __typename: "Service" as const,
        id: "",
        name: "",
      },
      latestDeployment: null,
    };
  }

  const { serviceInstance } = data;
  return {
    __typename: "ServiceInstance" as const,
    id: serviceInstance.id,
    numReplicas: serviceInstance.numReplicas ?? 0,
    sleepApplication: serviceInstance.sleepApplication ?? false,
    service: {
      __typename: "Service" as const,
      id: serviceInstance.service.id,
      name: serviceInstance.service.name,
    },
    latestDeployment: serviceInstance.latestDeployment
      ? {
          __typename: "Deployment" as const,
          id: serviceInstance.latestDeployment.id,
          status: serviceInstance.latestDeployment.status,
        }
      : null,
  };
}
