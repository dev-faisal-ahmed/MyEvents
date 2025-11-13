import z from "zod";

const categorySchema = z.object({
  name: z.string().trim().nonempty("Name can not be empty"),
  description: z.string().trim().nonempty("Description can not be empty"),
});

type TCategorySchema = z.infer<typeof categorySchema>;

export { categorySchema };
export type { TCategorySchema };
