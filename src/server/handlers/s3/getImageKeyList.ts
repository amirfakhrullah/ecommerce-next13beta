import {
  ListObjectsCommand,
  ListObjectsCommandInput,
} from "@aws-sdk/client-s3";
import env from "../../../env";
import { s3Client } from "../../../lib/servers/s3";

export const getImageKeyList = async () => {
  const params: ListObjectsCommandInput = {
    Bucket: env.S3_BUCKET_NAME,
  };
  const output = await s3Client.send(new ListObjectsCommand(params));
  return (
    (output.Contents?.map((obj) => obj.Key).filter(Boolean) as string[]) ?? []
  );
};
