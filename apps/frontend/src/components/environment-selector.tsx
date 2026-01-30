import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRequest, useView, view } from "react-fate";
import type { Project } from "@app/api/src/trpc/views";

export const ProjectView = view<Project>()({
  id: true,
  name: true,
});

export const EnvironmentSelector = () => {
  const { project: projectRef } = useRequest({
    project: { view: ProjectView },
  });
  const project = useView(ProjectView, projectRef);

  console.log("project: ", project);
  return (
    <Select>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select an environment" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Environments</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
