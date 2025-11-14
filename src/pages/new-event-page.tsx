import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateEvent } from "@/features/event/components/create-event";

export default function NewEventPage() {
  return (
    <ScrollArea className="grow">
      <section className="mx-auto my-6 max-w-3xl">
        <CreateEvent />
      </section>
    </ScrollArea>
  );
}
