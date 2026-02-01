import { useState } from "react";
import { ProjectToken, ProjectTokenView } from "./components/project-token";
import { ProjectView } from "./components/environment-selector";
import { ServiceScaler } from "./components/service-scaler";
import { useRequest } from "react-fate";

export function App() {
  const [railwayProjectAccessToken, setRailwayProjectAccessToken] = useState<string | null>("");
  const { project } = useRequest(
    {
      project: {
        args: { railwayProjectAccessToken },
        view: { ...ProjectView, ...ProjectTokenView },
      },
    },
    {
      mode: "network-only",
    },
  );

  return (
    <main className="container mx-auto">
      <div className="pt-20 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-20">Railway Scaler</h1>
        <div className="w-full max-w-lg">
          <ProjectToken project={project} onSelect={setRailwayProjectAccessToken} />
          {project.id ? <ServiceScaler project={project} railwayProjectAccessToken={railwayProjectAccessToken!} /> : null}
        </div>
      </div>
    </main>
  );
}
