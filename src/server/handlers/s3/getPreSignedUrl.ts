import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import env from "../../../env";
import { s3Client } from "../../../lib/servers/s3";

export const getPreSignedUrl = async (id: string) => {
  const params: PutObjectCommandInput = {
    Bucket: env.S3_BUCKET_NAME,
    Key: id,
  };
  const command = new PutObjectCommand(params);
  return getSignedUrl(s3Client, command);
};
