import { queryKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getUpComingEvents } from "../event-service";
import { EventGrid, EventGridSkeleton } from "./event-grid";
import { ErrorMessage } from "@/components/shared/error-message";
import { useEventsWithFilters } from "../event-hook";
import { Pagination } from "@/components/shared/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilterEvents } from "./filter-events";

export function UpcomingEvent() {
  const { data, isLoading } = useQuery({ queryKey: [queryKeys.events], queryFn: getUpComingEvents, select: (res) => res.data });
  const { events, totalPage } = useEventsWithFilters(data || []);

  if (isLoading) return <EventGridSkeleton />;

  return (
    <>
      <FilterEvents />
      <ScrollArea className="grow px-6">
        <div className="lg:my-6">
          {events.length ? <EventGrid events={events} /> : <ErrorMessage title="No Event Found" message="Please add some event" />}
        </div>
      </ScrollArea>
      {totalPage > 1 && <Pagination totalPage={totalPage} />}
    </>
  );
}
