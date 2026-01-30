import { z } from "zod";
import { byIdInput, createResolver } from "@nkzw/fate/server";
import { postDataView, projectDataView } from "./views.ts";
import { router, procedure } from "./init.ts";
import { createConnectionProcedure } from "./connection.ts";

const postRouter = router({
  byId: procedure.input(byIdInput).query(async ({ ctx, input }) => {
    const { args, ...rest } = input;
    const { resolveMany, select } = createResolver({
      ...(args ? { args } : {}),
      ...rest,
      ctx,
      view: postDataView,
    });
    const users = [
      { id: "1", title: "Hello World", content: "This is a test post" },
    ];
    return await resolveMany(users);
  }),

  list: createConnectionProcedure({
    query: async ({ ctx, cursor, direction, input, skip, take }) => {
      const { resolveMany, select } = createResolver({
        ...input,
        ctx,
        view: postDataView,
      });
      const items = [
        { id: "1", title: "Hello World", content: "This is a test post" },
        { id: "2", title: "Hello World 2", content: "This is a test post 2" },
      ];
      return resolveMany(items);
    },
  }),
});

const projectRouter = router({
  project: procedure
    .input(z.object({ select: z.array(z.string()) }))
    .query(async ({ ctx, input }) => {
      console.log("ctx: ", ctx);
      console.log("input: ", input);

      const { resolve, select } = createResolver({
        ...input,
        select: input.select,
        ctx,
        view: projectDataView,
      });
      return resolve({
        id: "1",
        name: "Test Project",
      });
    }),
});

export const appRouter = router({
  post: postRouter,
  project: projectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export * from "./views.ts";
