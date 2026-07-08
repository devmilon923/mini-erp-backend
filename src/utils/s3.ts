import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ACCOUNT_S3_API,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export const getUploadURL = async ({
  fileName,
  fileType,
}: {
  fileName: string;
  fileType: string;
}) => {
  const key = `${fileName}-${Date.now()}`;
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    ContentType: fileType,
  });

  // URL expires in 300 seconds (5 minutes)
  const signedUrl = await getSignedUrl(s3client, command, { expiresIn: 300 });

  return { signedUrl, publicUrl: `${process.env.R2_PUBLIC_URL}${key}` };
};
