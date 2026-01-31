import { useState } from "react";
import { ProjectToken, ProjectTokenView } from "./components/project-token";
import { EnvironmentSelector, ProjectView } from "./components/environment-selector";
import { useRequest } from "react-fate";

export function App() {
  const [railwayProjectAccessToken, setRailwayProjectAccessToken] = useState<string | null>("");

  console.log("re-render with railwayProjectAccessToken: ", railwayProjectAccessToken);

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

  console.log("project: ", project);

  return (
    <main className="container mx-auto">
      <div className="pt-20 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-20">Railway Scaler</h1>
        <div className="w-full max-w-lg">
          <ProjectToken onSelect={setRailwayProjectAccessToken} project={project} />
          {railwayProjectAccessToken ? <EnvironmentSelector project={project} /> : null}
        </div>
      </div>
    </main>
  );
}
