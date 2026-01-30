import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./trpc/app-router.ts";
import cors from "cors";

createHTTPServer({
  middleware: cors({ origin: "http://localhost:5173" }),
  router: appRouter,
  createContext() {
    return {};
  },
  basePath: "/trpc/",
}).listen(4000, () => {
  console.log("API server is running on http://localhost:4000");
});
