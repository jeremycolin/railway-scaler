import { z } from "zod";
import { createResolver } from "@nkzw/fate/server";
import { projectView, environmentView, serviceInstanceView } from "./views.ts";
import { router, procedure } from "./init.ts";
import { getProjectInfo } from "../graphql/railway-operations.ts/project-info.ts";
import { enableServerless } from "../graphql/railway-operations.ts/enable-serverless.ts";
import { resolveEnvironment, resolveServiceInstance } from "./resolvers.ts";
import { redeployService } from "../graphql/railway-operations.ts/redeploy-service.ts";
import { removeDeployment } from "../graphql/railway-operations.ts/deployment-remove.ts";
import { getServiceInstanceInfo } from "../graphql/railway-operations.ts/service-instance-info.ts";
import { deployService } from "../graphql/railway-operations.ts/deploy-service.ts";
import { updateReplicas } from "../graphql/railway-operations.ts/update-replicas.ts";

const projectRouter = router({
  project: procedure
    .input(
      z.object({
        args: z.object({
          railwayProjectAccessToken: z.string(),
        }),
        select: z.array(z.string()),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { resolve } = createResolver({
        ...input,
        ctx,
        view: projectView,
      });
      const { data } = await getProjectInfo({ railwayProjectAccessToken: input.args.railwayProjectAccessToken });
      if (!data) {
        return resolve({ error: "ProjectNotFound", message: "Railway project access token is invalid", id: "" });
      }
      const { project } = data.projectToken;
      return resolve({
        id: project.id,
        name: project.name,
        environments: project.environments.edges.map(({ node }) => ({
          __typename: "Environment",
          id: node.id,
          name: node.name,
          serviceInstances: [],
        })),
      });
    }),
});

const environmentRouter = router({
  environment: procedure
    .input(
      z.object({
        args: z.object({
          railwayProjectAccessToken: z.string(),
          environmentId: z.string(),
        }),
        select: z.array(z.string()),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { resolve } = createResolver({
        ...input,
        ctx,
        view: environmentView,
      });
      const result = await resolveEnvironment(input.args.railwayProjectAccessToken, input.args.environmentId);
      return resolve(result);
    }),
});

const serviceInstanceRouter = router({
  sync: procedure
    .input(
      z.object({
        railwayProjectAccessToken: z.string(),
        environmentId: z.string(),
        serviceId: z.string(),
        select: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { resolve } = createResolver({
        ...input,
        ctx,
        view: serviceInstanceView,
      });
      const { data } = await getServiceInstanceInfo({
        railwayProjectAccessToken: input.railwayProjectAccessToken,
        environmentId: input.environmentId,
        serviceId: input.serviceId,
      });
      return resolve({
        id: data?.serviceInstance?.id ?? "",
        numReplicas: data?.serviceInstance?.numReplicas ?? 0,
        sleepApplication: data?.serviceInstance?.sleepApplication ?? false,
        service: {
          __typename: "Service" as const,
          id: data?.serviceInstance?.service?.id ?? "",
          name: data?.serviceInstance?.service?.name ?? "",
        },
        latestDeployment: data?.serviceInstance?.latestDeployment
          ? {
              __typename: "Deployment" as const,
              id: data.serviceInstance.latestDeployment.id,
              status: data.serviceInstance.latestDeployment.status,
            }
          : null,
      });
    }),
  enableServerless: procedure
    .input(
      z.object({
        railwayProjectAccessToken: z.string(),
        environmentId: z.string(),
        serviceId: z.string(),
        enabled: z.boolean(),
        select: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { resolve } = createResolver({
        ...input,
        ctx,
        view: serviceInstanceView,
      });

      await enableServerless({
        railwayProjectAccessToken: input.railwayProjectAccessToken,
        environmentId: input.environmentId,
        serviceId: input.serviceId,
        enabled: input.enabled,
      });

      await redeployService(input.railwayProjectAccessToken, {
        environmentId: input.environmentId,
        serviceId: input.serviceId,
      });

      const result = await resolveServiceInstance(input.railwayProjectAccessToken, input.environmentId, input.serviceId);
      return resolve(result);
    }),
  redeploy: procedure
    .input(
      z.object({
        railwayProjectAccessToken: z.string(),
        environmentId: z.string(),
        serviceId: z.string(),
        select: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { resolve } = createResolver({
        ...input,
        ctx,
        view: serviceInstanceView,
      });

      await deployService(input.railwayProjectAccessToken, {
        environmentId: input.environmentId,
        serviceId: input.serviceId,
      });

      const result = await resolveServiceInstance(input.railwayProjectAccessToken, input.environmentId, input.serviceId);
      return resolve(result);
    }),
  deploymentRemove: procedure
    .input(
      z.object({
        railwayProjectAccessToken: z.string(),
        environmentId: z.string(),
        serviceId: z.string(),
        deploymentId: z.string(),
        select: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { resolve } = createResolver({
        ...input,
        ctx,
        view: serviceInstanceView,
      });

      await removeDeployment({
        railwayProjectAccessToken: input.railwayProjectAccessToken,
        deploymentId: input.deploymentId,
      });

      const result = await resolveServiceInstance(input.railwayProjectAccessToken, input.environmentId, input.serviceId);
      return resolve(result);
    }),
  updateReplicas: procedure
    .input(
      z.object({
        railwayProjectAccessToken: z.string(),
        environmentId: z.string(),
        serviceId: z.string(),
        numReplicas: z.number(),
        select: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { resolve } = createResolver({
        ...input,
        ctx,
        view: serviceInstanceView,
      });

      await updateReplicas({
        railwayProjectAccessToken: input.railwayProjectAccessToken,
        environmentId: input.environmentId,
        serviceId: input.serviceId,
        numReplicas: input.numReplicas,
      });

      const result = await resolveServiceInstance(input.railwayProjectAccessToken, input.environmentId, input.serviceId);
      return resolve(result);
    }),
});

export const appRouter = router({
  project: projectRouter,
  environment: environmentRouter,
  serviceInstance: serviceInstanceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export * from "./views.ts";
