import type { TEventSchema } from "../event-schema";
import { EventForm } from "./event-form";
import { createEvent } from "../event-service";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function CreateEvent() {
  const { mutate, isPending } = useMutation({ mutationFn: createEvent });

  const handleAddEvent = (formData: TEventSchema, reset: () => void) => {
    mutate(formData, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-title">Create New Event</CardTitle>
        <CardDescription>Provide information to create your event</CardDescription>
      </CardHeader>
      <CardContent>
        <EventForm onSubmit={handleAddEvent} isLoading={isPending} />
      </CardContent>
    </Card>
  );
}
