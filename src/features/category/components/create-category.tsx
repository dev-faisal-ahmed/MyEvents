import type { TCategorySchema } from "../category-validation-schema";
import { useState } from "react";
import { FormSheet } from "@/components/form/form-sheet";
import { TooltipContainer } from "@/components/shared/tooltip-container";
import { Button } from "@/components/ui/button";
import { queryKeys } from "@/lib/query-keys";
import { FaPlus } from "react-icons/fa6";
import { CategoryForm } from "./category-form";
import { useMutation } from "@tanstack/react-query";
import { createCategory } from "../category.service";
import { useAuth } from "@/providers/auth-provider";

const formId = `create-${queryKeys.categories}`;

export function CreateCategory() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { mutate, isPending } = useMutation({ mutationKey: [formId], mutationFn: createCategory });

  const handleCreateCategory = (formData: TCategorySchema, reset: () => void) => {
    mutate(
      { ...formData, createdBy: user!.uid },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      },
    );
  };

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
        <CategoryForm formId={formId} isLoading={isPending} onSubmit={handleCreateCategory} />
      </FormSheet>
    </>
  );
}
