import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
} from "@aws-sdk/client-s3";
import env from "../../../env";
import { s3Client } from "../../../lib/servers/s3";

export const deleteImage = async (fullUrl: string) => {
  const splittedUrl = fullUrl.split("/");
  const imageKey = splittedUrl[splittedUrl.length - 1];

  const params: DeleteObjectCommandInput = {
    Bucket: env.S3_BUCKET_NAME,
    Key: imageKey,
  };

  return s3Client.send(new DeleteObjectCommand(params));
};
