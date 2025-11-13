import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TEvent } from "../event-type";
import { cn, stripMarkdown } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin } from "lucide-react";
import { format } from "date-fns";

type TEventGirdProps = {
  events: TEvent[];
};

export function EventGrid({ events }: TEventGirdProps) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}

type TEventCardProps = {
  event: TEvent;
  isOwner?: boolean;
  className?: string;
};

const EventCard = ({ event, className }: TEventCardProps) => {
  const { coverImage, title, category, startDate, endDate, location, description } = event;

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
            className="max-h-full max-w-full rounded-xl object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <Badge className="absolute top-3 left-3 z-20 text-xs font-medium tracking-wide uppercase">{category}</Badge>
      </div>

      {/* Content */}
      <CardHeader>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <div className="text-muted-foreground mt-1 flex flex-col gap-1 text-sm">
          <div className="flex items-center gap-1">
            <CalendarDays className="size-4" />
            <span>
              {format(startDate.toDate(), "MMM dd, yyyy")} - {format(endDate.toDate(), "MMM dd, yyyy")}
            </span>
          </div>
          {location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              <span className="truncate">{location}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground line-clamp-3 text-sm">{stripMarkdown(description)}</p>
      </CardContent>
    </Card>
  );
};
