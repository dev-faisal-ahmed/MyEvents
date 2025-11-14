import { queryKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../event-service";
import { EventGrid, EventGridSkeleton } from "./event-grid";
import { ErrorMessage } from "@/components/shared/error-message";

export function UpcomingEvent() {
  const { data, isLoading } = useQuery({ queryKey: [queryKeys.events], queryFn: getEvents, select: (res) => res.data });

  if (isLoading) return <EventGridSkeleton />;
  if (!data?.length) return <ErrorMessage title="No Event Found" message="Please add some event" />;

  return <EventGrid events={data} />;
}
