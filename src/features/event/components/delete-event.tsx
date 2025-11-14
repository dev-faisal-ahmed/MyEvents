import { DeleteDialog } from "@/components/shared/delete-dialog";
import { Button } from "@/components/ui/button";
import { queryKeys } from "@/lib/query-keys";
import { useMutation } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { deleteEvent } from "../event-service";
import { useNavigate } from "react-router";
import { useRevalidate } from "@/lib/cache-helper";

type TDeleteEventProps = { id: string; disabled?: boolean };
const mutationKey = `delete_${queryKeys.events}`;

export function DeleteEvent({ id, disabled }: TDeleteEventProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { mutate } = useMutation({ mutationKey: [mutationKey], mutationFn: deleteEvent });
  const { revalidate } = useRevalidate();

  const handleDeleteEvent = () => {
    mutate(id, {
      onSuccess: () => {
        setOpen(false);
        revalidate("deleteEvent");
        navigate(`/`);
      },
    });
  };

  return (
    <>
      <Button disabled={disabled} onClick={() => setOpen(true)} variant="destructive">
        <Trash2Icon className="mr-1 h-4 w-4" /> Delete
      </Button>

      <DeleteDialog mutationKey={mutationKey} open={open} onOpenChange={setOpen} onDelete={handleDeleteEvent} />
    </>
  );
}
