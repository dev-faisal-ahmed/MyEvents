import { useState } from "react";
import { FormSheet } from "@/components/form/form-sheet";
import { TooltipContainer } from "@/components/shared/tooltip-container";
import { Button } from "@/components/ui/button";
import { queryKeys } from "@/lib/query-keys";
import { FaPlus } from "react-icons/fa6";
import { CategoryForm } from "./category-form";

const formId = `create-${queryKeys.categories}`;

export function CreateCategory() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TooltipContainer label="Create Category">
        <Button onClick={() => setOpen(true)}>
          <FaPlus />
        </Button>
      </TooltipContainer>

      <FormSheet
        open={open}
        onOpenChange={setOpen}
        formId={formId}
        title="Create Category"
        description="Please fill up the form to create a new category"
      >
        <CategoryForm formId={formId} isLoading={true} onSubmit={() => {}} />
      </FormSheet>
    </>
  );
}
