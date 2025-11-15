import { queryKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getFavoritedEvents } from "../event-service";
import { EventGrid, EventGridSkeleton } from "./event-grid";
import { useEventsWithFilters } from "../event-hook";
import { Pagination } from "@/components/shared/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ErrorMessage } from "@/components/shared/error-message";

export function FavoritedEvents() {
  const { data, isLoading } = useQuery({ queryKey: [queryKeys.favoritedEvents], queryFn: getFavoritedEvents });
  const { events, totalPage } = useEventsWithFilters(data ?? []);

  if (isLoading)
    return (
      <div className="p-6">
        <EventGridSkeleton />
      </div>
    );

  return (
    <>
      <ScrollArea className="grow">
        <ScrollArea className="my-6 grow px-6">
          {events.length ? <EventGrid events={events} /> : <ErrorMessage title="No Event Found" message="Please favorite some event" />}
        </ScrollArea>
      </ScrollArea>
      {totalPage > 1 && <Pagination totalPage={totalPage} />}
    </>
  );
}
