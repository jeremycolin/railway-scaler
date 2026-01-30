import { Suspense, useState } from "react";
import { ProjectSelector } from "./components/project-selector";
import { EnvironmentSelector } from "./components/environment-selector";

export function App() {
  const [railwayProjectAccessToken, setRailwayProjectAccessToken] = useState<
    string | null
  >(null);

  return (
    <main className="container mx-auto">
      <div className="pt-20 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-20">Railway Scaler</h1>
        <ProjectSelector onSelect={setRailwayProjectAccessToken} />
        <Suspense>
          {railwayProjectAccessToken ? <EnvironmentSelector /> : null}
        </Suspense>
      </div>
    </main>
  );
}
