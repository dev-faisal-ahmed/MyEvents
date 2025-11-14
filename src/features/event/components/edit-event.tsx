import { ErrorMessage } from "@/components/shared/error-message";
import { useGetEventDetails } from "../event-hook";
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EventForm } from "./event-form";
import { useMutation } from "@tanstack/react-query";
import { updateEvent } from "../event-service";
import type { TEventSchema } from "../event-schema";
import { useRevalidate } from "@/lib/cache-helper";
import { Skeleton } from "@/components/ui/skeleton";

type TEditEventProps = { id: string };
export function EditEvent({ id }: TEditEventProps) {
  const navigate = useNavigate();

  const { data, isLoading } = useGetEventDetails(id);
  const { mutate, isPending } = useMutation({ mutationFn: updateEvent });
  const { revalidate } = useRevalidate();

  const handleUpdateEvent = (formData: TEventSchema) => {
    mutate(
      { id, input: formData },
      {
        onSuccess: () => {
          revalidate("updateEvent");
          navigate(`/events/${id}`);
        },
      },
    );
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) return <EditEventSkeleton />;
  if (!data) return <ErrorMessage title="Event not found" message={`No Event found with id ${id}`} onRetry={handleGoBack} />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-title">Create New Event</CardTitle>
        <CardDescription>Provide information to create your event</CardDescription>
      </CardHeader>
      <CardContent>
        <EventForm
          key={JSON.stringify(data)}
          onSubmit={handleUpdateEvent}
          isLoading={isPending}
          defaultValues={{ ...data, startDate: data.startDate.toDate(), endDate: data.endDate.toDate() }}
        />
      </CardContent>
    </Card>
  );
}

const EditEventSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-title">Loading Event...</CardTitle>
        <CardDescription>Please wait while we fetch event details.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Title + Category */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" /> {/* label */}
            <Skeleton className="h-10 w-full rounded-md" /> {/* input */}
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-40 w-full rounded-md" />
        </div>

        {/* Dates */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-24 w-full rounded-md" />
        </div>

        {/* Image input */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-48 w-full rounded-md" />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};
