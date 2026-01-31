import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

import { useView, view, type ViewRef } from "react-fate";
import type { Project, Environment } from "@app/api/src/trpc/views";

const EnvironmentView = view<Environment>()({
  id: true,
  name: true,
});

const EnvironmentConnectionView = {
  items: {
    node: EnvironmentView,
  },
};

export const ProjectView = view<Project>()({
  id: true,
  name: true,
  environments: EnvironmentConnectionView,
  error: true,
  message: true,
});

export const EnvironmentSelector = ({ project: projectRef }: { project: ViewRef<"Project"> }) => {
  const project = useView(ProjectView, projectRef);

  if (!project.id) {
    return null;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold my-4">Project: {project.name}</h2>
      <NativeSelect>
        <NativeSelectOption value="">Select an environment</NativeSelectOption>
        {project.environments.items.map(({ node }) => (
          <EnvironmentItem key={node.id} environment={node} />
        ))}
      </NativeSelect>
    </div>
  );
};

const EnvironmentItem = ({ environment: environmentRef }: { environment: ViewRef<"Environment"> }) => {
  const environment = useView(EnvironmentView, environmentRef);
  return (
    <NativeSelectOption key={environment.id} value={environment.id}>
      {environment.name}
    </NativeSelectOption>
  );
};
