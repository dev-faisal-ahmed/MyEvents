import { Controller, type ControllerProps, type FieldPath, type FieldValues } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";

type TFormFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Omit<
  ControllerProps<TFieldValues, TName>,
  "render"
> & {
  label?: string;
  description?: string;
  showError?: boolean;
  children: ControllerProps<TFieldValues, TName>["render"];
};

export function FormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  label,
  children,
  showError = true,
  ...props
}: TFormFieldProps<TFieldValues, TName>) {
  return (
    <Controller
      {...props}
      render={({ field, fieldState, formState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel id={field.name} className="font-semibold">
            {label}
          </FieldLabel>
          {children({ field, fieldState, formState })}
          {showError && fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
