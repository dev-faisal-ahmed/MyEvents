"use client";

import type { TEvent } from "../event-type";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getEventById } from "../event-service";
import { CalendarDays, MapPin, User, Tag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MarkdownPreview } from "@/components/shared/markdown-preview";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// ---------------------------------------------------------------------------
// CONTROLLER COMPONENT
// ---------------------------------------------------------------------------

type TEventDetailsControllerProps = { id: string };

export function EventDetailsController({ id }: TEventDetailsControllerProps) {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.events, { id }],
    queryFn: () => getEventById(id),
    enabled: !!id,
    select: (res) => res.data,
  });

  if (isLoading) return <div className="text-muted-foreground py-20 text-center">Loading event...</div>;
  if (!data) return <div className="text-destructive py-20 text-center">Event not found</div>;

  return <EventDetails event={data} />;
}

// ---------------------------------------------------------------------------
// PRESENTATION COMPONENT
// ---------------------------------------------------------------------------

type TEventDetailsProps = {
  event: TEvent;
  isOwner?: boolean;
};

const EventDetails = ({ event }: TEventDetailsProps) => {
  const { title, description, category, location, startDate, endDate, coverImage, createdBy } = event;

  return (
    <section className="container mx-auto flex flex-col gap-6 py-8">
      {/* Cover Section */}
      <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
        {/* Blurry background for incomplete aspect ratios */}
        <div className="absolute inset-0">
          <img src={coverImage} alt="blur background" className="h-full w-full scale-110 object-cover blur-lg brightness-75" />
        </div>

        {/* Foreground main image */}
        <div className="relative z-10 flex h-80 w-full items-center justify-center sm:h-[450px]">
          <img src={coverImage} alt={title} className="max-h-full max-w-full rounded-xl object-contain" />
        </div>
      </div>

      {/* Details Section */}
      <Card className="border-none shadow-md dark:border-neutral-800 dark:bg-neutral-900/50">
        <CardHeader>
          <div className="text-white">
            <h1 className="text-3xl font-bold drop-shadow-md sm:text-4xl">{title}</h1>
            <div className="text-muted-foreground mt-2 flex flex-wrap gap-2 text-sm">
              <Badge variant="secondary" className="bg-primary/90 text-white">
                {category}
              </Badge>
              <span className="flex items-center gap-1">
                <User className="size-4" /> {createdBy.name}
              </span>
            </div>
          </div>
        </CardHeader>

        {/* Meta Info */}
        <CardContent className="flex flex-col gap-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Start Date & Time */}
            <div className="text-muted-foreground flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-medium">Start</span>
                <span className="text-xs">
                  {format(startDate.toDate(), "MMM dd, yyyy")} at {format(startDate.toDate(), "hh:mm aa")}
                </span>
              </div>
            </div>

            {/* End Date & Time */}
            <div className="text-muted-foreground flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-medium">End</span>
                <span className="text-xs">
                  {format(endDate.toDate(), "MMM dd, yyyy")} at {format(endDate.toDate(), "hh:mm aa")}
                </span>
              </div>
            </div>

            {/* Location */}
            {location && (
              <div className="text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="truncate">{location}</span>
              </div>
            )}

            {/* Category */}
            <div className="text-muted-foreground flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span>{category}</span>
            </div>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed">
            <MarkdownPreview value={description} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
