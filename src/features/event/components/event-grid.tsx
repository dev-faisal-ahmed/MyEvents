import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TEvent } from "../event-type";
import { cn, stripMarkdown } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, UserIcon } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import type { PropsWithChildren } from "react";

// main components to export
type TEventGirdProps = { events: TEvent[] };
export function EventGrid({ events }: TEventGirdProps) {
  return (
    <EventGridContainer>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </EventGridContainer>
  );
}

export function EventGridSkeleton() {
  return (
    <EventGridContainer>
      {Array.from({ length: 6 }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </EventGridContainer>
  );
}

// helper components
const EventGridContainer = ({ children }: PropsWithChildren) => {
  return <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{children}</section>;
};

type TEventCardProps = {
  event: TEvent;
  isOwner?: boolean;
  className?: string;
};

const EventCard = ({ event, className }: TEventCardProps) => {
  const { coverImage, title, category, startDate, location, description } = event;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all hover:shadow-lg dark:border-neutral-800 dark:hover:border-neutral-700",
        className,
      )}
    >
      {/* Blurry Background Layer */}
      <div className="relative h-56 w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src={coverImage} alt="blurred background" className="h-full w-full scale-110 object-cover blur-lg brightness-75" />
        </div>

        {/* Foreground Image (contained) */}
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <img
            src={coverImage}
            alt={title}
            className="max-h-full w-full rounded-xl object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <Badge className="absolute top-3 left-3 z-20 text-xs font-medium tracking-wide uppercase">{category}</Badge>
      </div>

      {/* Content */}
      <CardHeader>
        <CardTitle className="line-clamp-1">
          <Link to={`/events/${event.id}`} className="hover:text-primary">
            {title}
          </Link>
        </CardTitle>
        <div className="text-muted-foreground mt-1 flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <UserIcon className="size-4" />
            <span>{event.createdBy.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays className="size-4" />
            <span>{format(startDate.toDate(), "MMM dd, yyyy : hh:mm aa")}</span>
          </div>

          <div className="flex gap-2">
            <MapPin className="size-4" />
            <span className="w-full">
              {location} {location}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground line-clamp-3 text-sm">{stripMarkdown(description)}</p>
      </CardContent>
    </Card>
  );
};

const EventCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("relative overflow-hidden dark:border-neutral-800", className)}>
      {/* Image area */}
      <div className="relative h-56 w-full overflow-hidden">
        <Skeleton className="h-full w-full rounded-none" />
        {/* Category badge placeholder */}
        <Skeleton className="absolute top-3 left-3 h-5 w-16 rounded-md" />
      </div>

      <CardHeader>
        {/* Title */}
        <Skeleton className="h-5 w-2/3" />

        {/* Date row */}
        <div className="mt-2 flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Location row */}
        <div className="mt-2 flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-4/6" />
        </div>
      </CardContent>
    </Card>
  );
};
