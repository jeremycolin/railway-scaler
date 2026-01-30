import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  railwayProjectAccessToken: z
    .string()
    .trim()
    .min(1, "Project access token is required"),
});

export const ProjectSelector = ({
  onSelect,
}: {
  onSelect: (railwayProjectAccessToken: string) => void;
}) => {
  const form = useForm({
    defaultValues: {
      railwayProjectAccessToken: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      const data = value.railwayProjectAccessToken.trim();
      if (data) {
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
      className="w-full max-w-lg"
    >
      <form.Field
        name="railwayProjectAccessToken"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

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
            </Field>
          );
        }}
      />
    </form>
  );
};
