import { httpBatchLink } from "@trpc/client";
import { FateClient } from "react-fate";
import { Suspense, useMemo } from "react";
import { createFateClient } from "./fate.ts";
import { App } from "../app.tsx";

const apiUrl = import.meta.env.VITE_API_URL;

export const FateClientProvider = () => {
  const fate = useMemo(
    () =>
      createFateClient({
        links: [
          httpBatchLink({
            url: `${apiUrl}/trpc`,
          }),
        ],
      }),
    [],
  );
  return (
    <FateClient client={fate}>
      <Suspense>
        <App />
      </Suspense>
    </FateClient>
  );
};
