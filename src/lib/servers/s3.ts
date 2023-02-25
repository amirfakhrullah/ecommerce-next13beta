import { S3Client } from "@aws-sdk/client-s3";
import env from "../../env";

export const s3Client = new S3Client({
  credentials: {
    accessKeyId: env.S3_BUCKET_ACCESS_KEY,
    secretAccessKey: env.S3_BUCKET_SECRET_ACCESS_KEY,
  },
  region: env.S3_BUCKET_REGION,
});
