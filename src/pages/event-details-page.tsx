import { EventDetailsController } from "@/features/event/components/event-details";
import { useParams } from "react-router";

export default function EventDetailsPage() {
  const { id } = useParams();

  return <EventDetailsController id={id ?? ""} />;
}
