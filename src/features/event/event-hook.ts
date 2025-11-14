import { useMemo } from "react";
import type { TEvent } from "./event-type";
import { useSearchParams } from "react-router";
import { eventFilterKeys } from "./event-consts";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getEventById } from "./event-service";

export const useEventsWithFilters = (eventsFromDB: TEvent[], limit: number = 6) => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get(eventFilterKeys.search) ?? undefined;
  const category = searchParams.get(eventFilterKeys.category) ?? undefined;
  const startDate = searchParams.get(eventFilterKeys.startDate) ?? undefined;
  const endDate = searchParams.get(eventFilterKeys.endDate) ?? undefined;
  const page = searchParams.get(eventFilterKeys.page) ?? undefined;

  const eventsWithPaginationData = useMemo(() => {
    const pageAsNumber = Number(page) || 1;
    const startDateAsDate = startDate ? new Date(startDate) : undefined;
    const endDateAsDate = endDate ? new Date(endDate) : undefined;
    const lowerCaseSearch = search ? search.toLowerCase() : undefined;

    let eventList = eventsFromDB;

    if (category) eventList = eventList.filter((event) => event.category === category);
    if (startDateAsDate) eventList = eventList.filter((event) => event.startDate.toDate() >= startDateAsDate);
    if (endDateAsDate) eventList = eventList.filter((event) => event.endDate.toDate() <= endDateAsDate);
    if (lowerCaseSearch) eventList = eventList.filter((event) => event.title.toLowerCase().includes(lowerCaseSearch));

    const startIndex = (pageAsNumber - 1) * limit;
    const events = eventList.slice(startIndex, startIndex + limit);

    return {
      events,
      page: pageAsNumber,
      limit,
      totalPage: Math.ceil(eventList.length / limit),
    };
  }, [search, category, startDate, endDate, eventsFromDB, page, limit]);

  return eventsWithPaginationData;
};

export const useGetEventDetails = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.events, { id }],
    queryFn: () => getEventById(id),
    enabled: !!id,
    select: (res) => res.data,
  });
};
