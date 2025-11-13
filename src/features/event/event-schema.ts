import z from "zod";

const eventSchema = z.object({
  title: z.string().trim().nonempty("Title is required"),
  description: z.string().trim().nonempty("Description is required"),
  startDate: z.date("Start date is required"),
  endDate: z.date("End date is required"),
  category: z.string().trim().nonempty("Category is required"),
  location: z.string().trim().nonempty("Location is required"),
  coverImage: z.union([z.string(), z.file().refine((file) => file.type.startsWith("/image"))]),
});

type TEventSchema = z.infer<typeof eventSchema>;

export { eventSchema };
export type { TEventSchema };
