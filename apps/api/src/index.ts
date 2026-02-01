import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./trpc/app-router.ts";
import cors from "cors";

const clientUrl = process.env["CLIENT_URL"]!;
if (!clientUrl) {
  throw new Error("CLIENT_URL is not set");
}
const port = process.env["PORT"];
if (!port) {
  throw new Error("PORT is not set");
}

createHTTPServer({
  middleware: cors({ origin: clientUrl }),
  router: appRouter,
  createContext() {
    return {};
  },
  basePath: "/trpc/",
}).listen(port, () => {
  console.log(`API server is listening on port ${port}`);
});
