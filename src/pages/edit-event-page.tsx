import { ScrollArea } from "@/components/ui/scroll-area";
import { EditEvent } from "@/features/event/components/edit-event";
import { useParams } from "react-router";

export default function EditEventPage() {
  const { id } = useParams();

  return (
    <ScrollArea className="grow">
      <section className="mx-auto my-6 max-w-3xl">
        <EditEvent id={id ?? ""} />
      </section>
    </ScrollArea>
  );
}
