import { useForm } from "react-hook-form";
import { categorySchema, type TCategorySchema } from "../category-validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { FormField } from "@/components/form/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type TCategoryFormProps = {
  formId: string;
  onSubmit: (formData: TCategorySchema, reset: () => void) => void;
  isLoading: boolean;
};

export function CategoryForm({ formId, onSubmit, isLoading }: TCategoryFormProps) {
  const form = useForm<TCategorySchema>({ resolver: zodResolver(categorySchema), defaultValues: { name: "", description: "" } });
  const handleSubmit = form.handleSubmit((data) => onSubmit(data, form.reset));

  return (
    <form id={formId} onSubmit={handleSubmit} className="px-2">
      <FieldSet disabled={isLoading}>
        <FieldGroup>
          <FormField control={form.control} name="name" label="* Name">
            {({ field }) => <Input {...field} placeholder="Enter name here" />}
          </FormField>
          <FormField control={form.control} name="description" label="* Description">
            {({ field }) => <Textarea {...field} placeholder="Enter description here" />}
          </FormField>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
