import { ScrollArea } from "@/components/ui/scroll-area";
import { EventDetails } from "@/features/event/components/event-details";
import { useParams } from "react-router";

export default function EventDetailsPage() {
  const { id } = useParams();

  return (
    <ScrollArea className="grow">
      <EventDetails id={id ?? ""} />
    </ScrollArea>
  );
}
