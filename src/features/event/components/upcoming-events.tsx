import { queryKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getUpComingEvents } from "../event-service";
import { EventGrid, EventGridSkeleton } from "./event-grid";
import { ErrorMessage } from "@/components/shared/error-message";
import { useEventsWithFilters } from "../event-hook";
import { Pagination } from "@/components/shared/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";

export function UpcomingEvent() {
  const { data, isLoading } = useQuery({ queryKey: [queryKeys.events], queryFn: getUpComingEvents, select: (res) => res.data });
  const { events, page, totalPage } = useEventsWithFilters(data || []);

  console.log(page, totalPage);

  if (isLoading) return <EventGridSkeleton />;
  if (!data?.length) return <ErrorMessage title="No Event Found" message="Please add some event" />;

  return (
    <>
      <ScrollArea className="grow px-6">
        <div className="my-6">
          <EventGrid events={events} />
        </div>
      </ScrollArea>
      {totalPage > 1 && <Pagination totalPage={totalPage} />}
    </>
  );
}
