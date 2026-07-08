import z from "zod";

export enum FileType {
  PNG = "image/png",
  JPEG = "image/jpeg",
  WEBP = "image/webp",
}

export const uploadMediaValidation = z.object({
  fileType: z.enum([FileType.PNG, FileType.JPEG, FileType.WEBP]),
  fileName: z.string().min(2).max(100),
});
export type UploadMediaValidation = z.infer<typeof uploadMediaValidation>;
