import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

import { useView, view, type ViewRef } from "react-fate";
import type { Project, Environment } from "@app/api/src/trpc/views";

const EnvironmentView = view<Environment>()({
  id: true,
  name: true,
});

export const ProjectView = view<Project>()({
  id: true,
  name: true,
  environments: { items: { node: EnvironmentView } },
});

export const EnvironmentSelector = ({
  project: projectRef,
  onSelect,
}: {
  project: ViewRef<"Project">;
  onSelect: (environment: string) => void;
}) => {
  const project = useView(ProjectView, projectRef);

  if (!project.id) {
    return null;
  }

  return (
    <div>
      <h2 className="text-lg mt-4 mb-8">
        Project: <span className="font-semibold">{project.name}</span>
      </h2>
      <NativeSelect onChange={(e) => onSelect(e.target.value)}>
        <NativeSelectOption value="">Select an environment</NativeSelectOption>
        {project.environments.items.map(({ node }) => (
          <EnvironmentOption key={node.id} environment={node} />
        ))}
      </NativeSelect>
    </div>
  );
};

const EnvironmentOption = ({ environment: environmentRef }: { environment: ViewRef<"Environment"> }) => {
  const environment = useView(EnvironmentView, environmentRef);
  return (
    <NativeSelectOption key={environment.id} value={environment.id}>
      {environment.name}
    </NativeSelectOption>
  );
};
