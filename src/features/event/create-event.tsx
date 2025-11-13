import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EventForm } from "./event-form";

export function CreateEvent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-title">Create New Event</CardTitle>
        <CardDescription>Provide information to create your event</CardDescription>
      </CardHeader>
      <CardContent>
        <EventForm />
      </CardContent>
    </Card>
  );
}
