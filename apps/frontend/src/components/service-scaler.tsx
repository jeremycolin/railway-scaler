import { Suspense, useState } from "react";
import type { ViewRef } from "react-fate";
import { EnvironmentSelector } from "./environment-selector";
import { ServicesList } from "./services-list";

export const ServiceScaler = ({
  project,
  railwayProjectAccessToken,
}: {
  project: ViewRef<"Project">;
  railwayProjectAccessToken: string;
}) => {
  const [environmentId, setEnvironmentId] = useState<string | null>(null);

  return (
    <>
      <EnvironmentSelector project={project} onSelect={setEnvironmentId} />
      {environmentId ? (
        <Suspense>
          <ServicesList environmentId={environmentId} railwayProjectAccessToken={railwayProjectAccessToken} />
        </Suspense>
      ) : null}
    </>
  );
};
