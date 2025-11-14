import { useMemo } from "react";
import type { TEvent } from "./event-type";
import { useSearchParams } from "react-router";

export const useEventsWithFilters = (eventsFromDB: TEvent[], limit: number = 6) => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? undefined;
  const category = searchParams.get("category") ?? undefined;
  const startDate = searchParams.get("startDate") ?? undefined;
  const endDate = searchParams.get("endDate") ?? undefined;
  const page = searchParams.get("page") ?? undefined;

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
