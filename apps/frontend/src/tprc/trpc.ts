import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../api/src/trpc/app-router";

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:4000/trpc",
    }),
  ],
});
