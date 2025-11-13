import { useForm } from "react-hook-form";
import { eventSchema, type TEventSchema } from "./event-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { FormField } from "@/components/form/form-field";
import { Input } from "@/components/ui/input";
import { eventCategories } from "@/data/event-categories";
import { FormSelect } from "@/components/form/form-select";
import { MarkdownEditor } from "@/components/form/markdown-editor";
import type { PropsWithChildren } from "react";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Textarea } from "@/components/ui/textarea";
import { ImageInput } from "@/components/form/image-input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const categoryOptions = Object.entries(eventCategories).map(([key, eventValue]) => ({ label: eventValue, value: key }));

export function EventForm() {
  const form = useForm<TEventSchema>({
    resolver: zodResolver(eventSchema),
    defaultValues: { title: "", description: "", category: "", location: "" },
  });

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <form>
      <FieldSet>
        <FieldGroup>
          <GridContainer>
            <FormField control={form.control} name="title" label="* Title">
              {({ field }) => <Input {...field} placeholder="Enter event name" />}
            </FormField>

            <FormField control={form.control} name="category" label="* Category">
              {({ field: { value, onChange } }) => (
                <FormSelect options={categoryOptions} value={value} onChange={onChange} placeholder="Select any category" />
              )}
            </FormField>
          </GridContainer>

          <FormField control={form.control} name="description" label="* Description">
            {({ field: { value, onChange } }) => <MarkdownEditor value={value} onChange={onChange} />}
          </FormField>

          <GridContainer>
            <FormField control={form.control} name="startDate" label="* Start Date">
              {({ field: { value, onChange } }) => <DateTimePicker value={value} onChange={onChange} />}
            </FormField>
            <FormField control={form.control} name="endDate" label="* End Date">
              {({ field: { value, onChange } }) => <DateTimePicker value={value} onChange={onChange} />}
            </FormField>
          </GridContainer>
          <FormField control={form.control} name="location" label="* Location">
            {({ field }) => <Textarea {...field} placeholder="Enter event location" />}
          </FormField>

          <FormField control={form.control} name="coverImage" label="* Cover Image">
            {({ field: { value, onChange } }) => <ImageInput value={value} onChange={onChange} />}
          </FormField>
        </FieldGroup>
      </FieldSet>
      <div className="mt-6 flex items-center justify-end gap-4">
        <Button onClick={handleCancel} type="button" variant="outline">
          Cancel
        </Button>
        <Button>Submit</Button>
      </div>
    </form>
  );
}

const GridContainer = ({ children }: PropsWithChildren) => {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
};
