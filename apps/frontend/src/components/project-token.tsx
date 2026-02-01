import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useView, view, type ViewRef } from "react-fate";
import type { Project } from "@app/api/src/trpc/views";

export const ProjectTokenView = view<Project>()({
  error: true,
  message: true,
});

const formSchema = z.object({
  railwayProjectAccessToken: z.string().trim().min(1, "Railway project access token is required"),
});

export const ProjectToken = ({
  project: projectRef,
  onSelect,
}: {
  project: ViewRef<"Project">;
  onSelect: (railwayProjectAccessToken: string) => void;
}) => {
  const project = useView(ProjectTokenView, projectRef);

  const form = useForm({
    defaultValues: {
      railwayProjectAccessToken: sessionStorage.getItem("railwayProjectAccessToken") ?? "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      const data = value.railwayProjectAccessToken.trim();
      if (data) {
        sessionStorage.setItem("railwayProjectAccessToken", data);
        onSelect(data);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="railwayProjectAccessToken"
        children={(field) => {
          const isTouched = field.state.meta.isTouched;
          const isInvalid = isTouched && !field.state.meta.isValid;
          const isApiError = form.state.isSubmitted && !isInvalid && project.error === "ProjectNotFound";

          return (
            <Field data-invalid={isInvalid}>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="text"
                aria-invalid={isInvalid}
                placeholder="Enter your Railway project access token"
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
              {isApiError && <FieldError errors={[{ message: project.message }]} />}
            </Field>
          );
        }}
      />
    </form>
  );
};
