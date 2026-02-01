import { dataView, list, type Entity } from "@nkzw/fate/server";

const serviceView = dataView<{
  id: string;
  name: string;
}>("Service")({
  id: true,
  name: true,
});
export type Service = Entity<typeof serviceView, "Service">;

const deploymentView = dataView<{
  id: string;
  status: string;
}>("Deployment")({
  id: true,
  status: true,
});
export type Deployment = Entity<typeof deploymentView, "Deployment">;

export const serviceInstanceView = dataView<{
  id: string;
  numReplicas: number;
  sleepApplication: boolean;
  service: Service;
  latestDeployment: Deployment | null;
}>("ServiceInstance")({
  id: true,
  numReplicas: true,
  sleepApplication: true,
  service: serviceView,
  latestDeployment: deploymentView,
});

const serviceInstanceEnvView = dataView<{
  id: string;
  numReplicas: number;
  sleepApplication: boolean;
  service: Service;
  latestDeployment: Deployment | null;
}>("ServiceInstance")({
  id: true,
  numReplicas: true,
  sleepApplication: true,
  service: serviceView,
  latestDeployment: deploymentView,
});
export type ServiceInstance = Entity<typeof serviceInstanceEnvView, "ServiceInstance">;

export const environmentView = dataView<{ id: string; name: string; serviceInstances: Array<ServiceInstance> }>("Environment")({
  id: true,
  name: true,
  serviceInstances: list(serviceInstanceEnvView),
});
export type Environment = Entity<
  typeof environmentView,
  "Environment",
  {
    serviceInstances: Array<ServiceInstance>;
  }
>;

export const projectView = dataView<
  | {
      id: string;
      name: string;
      environments: Array<Environment>;
    }
  | { error: "ProjectNotFound"; message: string }
>("Project")({
  id: true,
  name: true,
  environments: list(environmentView),
  error: true,
  message: true,
});
export type Project = Entity<
  typeof projectView,
  "Project",
  {
    environments: Array<Environment>;
  }
>;

export const Root = {
  project: projectView,
  environment: environmentView,
  serviceInstance: serviceInstanceView,
};
