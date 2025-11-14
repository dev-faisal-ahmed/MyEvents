import { CalendarDays, MapPin, User, Tag, EditIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MarkdownPreview } from "@/components/shared/markdown-preview";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useGetEventDetails } from "../event-hook";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router";
import { DeleteEvent } from "./delete-event";

type TEventDetailsProps = { id: string };

export function EventDetails({ id }: TEventDetailsProps) {
  const { data, isLoading } = useGetEventDetails(id);

  if (isLoading) return <EventDetailsSkeleton />;
  if (!data) return <div className="text-destructive py-20 text-center">Event not found</div>;

  const { coverImage, title, category, createdBy, startDate, endDate, location, description } = data;

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
          <img src={coverImage} alt={title} className="max-h-full w-full rounded-xl object-contain" />
        </div>
      </div>

      {/* Details Section */}
      <Card className="border-none shadow-md dark:border-neutral-800 dark:bg-neutral-900/50">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
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

          <div className="mt-4 flex gap-4 sm:mt-0">
            <Link to={`/events/${id}/edit`}>
              <Button variant="default">
                <EditIcon className="mr-1 h-4 w-4" /> Edit
              </Button>
            </Link>
            <DeleteEvent id={id} />
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
}

const EventDetailsSkeleton = () => {
  return (
    <section className="container mx-auto flex flex-col gap-6 py-8">
      {/* Cover Image Skeleton */}
      <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
        <Skeleton className="h-80 w-full rounded-xl sm:h-[450px]" />
      </div>

      {/* Details Section */}
      <Card className="border-none shadow-md dark:border-neutral-800 dark:bg-neutral-900/50">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-8 w-60 rounded-md" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-6 w-28 rounded-md" />
            </div>
          </div>

          {/* Edit/Delete Buttons */}
          <div className="mt-4 flex gap-2 sm:mt-0">
            <Skeleton className="h-10 w-20 rounded-md" />
            <Skeleton className="h-10 w-20 rounded-md" />
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          {/* Meta Info Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-3 w-20 rounded-md" />
                  <Skeleton className="h-3 w-32 rounded-md" />
                </div>
              </div>
            ))}
          </div>

          {/* Description Skeleton */}
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-11/12 rounded-md" />
            <Skeleton className="h-4 w-10/12 rounded-md" />
            <Skeleton className="h-4 w-8/12 rounded-md" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
