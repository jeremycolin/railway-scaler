import { z } from "zod";
import { createResolver } from "@nkzw/fate/server";
import { projectDataView } from "./views.ts";
import { router, procedure } from "./init.ts";
import { getProjectInfo } from "../graphql/project-info.ts";

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
        args: input.args,
        ctx,
        select: input.select,
        view: projectDataView,
      });
      if (!input.args.railwayProjectAccessToken) {
        return resolve({
          error: "MissingProjectAccessToken",
          message: "Railway project access token is required.",
          id: "",
        });
      }
      const { data } = await getProjectInfo(input.args.railwayProjectAccessToken);
      if (!data) {
        console.warn("Railway project access token is invalid");
        return resolve({ error: "ProjectNotFound", message: "Railway project access token is invalid.", id: "" });
      }
      const { project } = data.projectToken;
      console.log("project environments: ", project.environments.edges);
      return resolve({
        id: project.id,
        name: project.name,
        environments: project.environments.edges.map(({ node }) => ({
          __typename: "Environment",
          id: node.id,
          name: node.name,
        })),
      });
    }),
});

export const appRouter = router({
  project: projectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export * from "./views.ts";
