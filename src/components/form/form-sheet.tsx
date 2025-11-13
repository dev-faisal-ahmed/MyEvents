import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMutating } from "@tanstack/react-query";

type FormSheetProps = {
  formId: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  submitButtonTitle?: string;
  submitLoadingTitle?: string;
  open: boolean;
  onOpenChange(open: boolean): void;
};

export function FormSheet({
  open,
  onOpenChange,
  formId,
  title,
  description,
  children,
  submitButtonTitle,
  submitLoadingTitle,
}: FormSheetProps) {
  const isMutating = useIsMutating({ mutationKey: [formId] });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex h-dvh flex-col p-0">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="font-title">{title}</SheetTitle>
          <SheetDescription className="mt-1">{description}</SheetDescription>
        </SheetHeader>
        <ScrollArea className="grow px-4">{children}</ScrollArea>
        <SheetFooter className="flex-row items-center gap-4 px-6 pb-6">
          <SheetClose asChild>
            <Button className="flex-1" variant="outline">
              Cancel
            </Button>
          </SheetClose>
          <Button form={formId} type="submit" isLoading={!!isMutating} className="flex-1">
            {isMutating ? submitLoadingTitle || "Submitting..." : submitButtonTitle || "Submit"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
