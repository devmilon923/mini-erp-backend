import z from "zod";

export const uploadMediaValidation = z.object({
  fileType: z
    .string()
    .refine((v) => ["image/png", "image/jpeg", "image/webp"].includes(v), {
      message: "Invalid file type. Only PNG, JPEG, and WEBP are allowed.",
    }),
  fileName: z.string().min(2).max(100),
});
