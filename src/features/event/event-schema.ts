import z from "zod";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const eventSchema = z
  .object({
    title: z.string().trim().nonempty("Title is required"),
    description: z.string().trim().nonempty("Description is required"),
    startDate: z.date("Start date is required"),
    endDate: z.date("End date is required"),
    category: z.string().trim().nonempty("Category is required"),
    location: z.string().trim().nonempty("Location is required"),
    coverImage: z.union([
      z.string(),
      z
        .file()
        .refine((file) => file.type.startsWith("image/"), "Please provide an image file")
        .refine((file) => file.size <= MAX_FILE_SIZE, "Image can not be more than 1 mb"),
    ]),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be greater than start date",
    path: ["endDate"],
  });

type TEventSchema = z.infer<typeof eventSchema>;

export { eventSchema };
export type { TEventSchema };
