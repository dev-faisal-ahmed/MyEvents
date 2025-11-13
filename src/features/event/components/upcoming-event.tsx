import { queryKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../event-service";
import { EventGrid } from "./event-grid";

export function UpcomingEvent() {
  const { data, isLoading } = useQuery({ queryKey: [queryKeys.categories], queryFn: getEvents, select: (res) => res.data });

  if (isLoading) return "Loading";
  if (!data?.length) return "No Data Found";

  return (
    <>
      <EventGrid events={data} />
    </>
  );
}
