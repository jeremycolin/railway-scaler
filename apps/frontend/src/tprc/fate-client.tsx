import { httpBatchLink } from "@trpc/client";
import { FateClient } from "react-fate";
import { useMemo } from "react";
import { createFateClient } from "./fate.ts";
import { App } from "../app.tsx";

export const FateClientProvider = () => {
  const fate = useMemo(
    () =>
      createFateClient({
        links: [
          httpBatchLink({
            url: `http://localhost:4000/trpc`,
          }),
        ],
      }),
    [],
  );
  return (
    <FateClient client={fate}>
      <App />
    </FateClient>
  );
};
