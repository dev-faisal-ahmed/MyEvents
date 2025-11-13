import { useForm } from "react-hook-form";
import { eventSchema, type TEventSchema } from "./event-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { FormField } from "@/components/form/form-field";
import { Input } from "@/components/ui/input";
import { eventCategories } from "@/data/event-categories";
import { FormSelect } from "@/components/form/form-select";

const categoryOptions = Object.entries(eventCategories).map(([key, eventValue]) => ({ label: eventValue, value: key }));

export function EventForm() {
  const form = useForm<TEventSchema>({
    resolver: zodResolver(eventSchema),
    defaultValues: { title: "", description: "", category: "", location: "" },
  });

  return (
    <form>
      <FieldSet>
        <FieldGroup>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField control={form.control} name="title" label="* Title">
              {({ field }) => <Input {...field} placeholder="Enter event name" />}
            </FormField>

            <FormField control={form.control} name="category" label="* Category">
              {({ field: { value, onChange } }) => (
                <FormSelect options={categoryOptions} value={value} onChange={onChange} placeholder="Select any category" />
              )}
            </FormField>
          </div>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
