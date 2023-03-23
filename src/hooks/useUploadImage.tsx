"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { trpc } from "../providers/trpcProvider";
import { v4 as uuidv4 } from "uuid";

/**
 * Only admin user can use this hook
 */
const useUploadImage = (
  id: string = uuidv4() + new Date().toISOString().split(":").join()
) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const upload = async (url: string) => {
    if (!file) return;
    return fetch(url, {
      method: "PUT",
      body: file,
    });
  };

  const { mutate } = trpc.admin.getSignedUrl.useMutation({
    retry: false,
    onError: (err) => toast.error(err.message),
    onSuccess: async (url) => {
      try {
        await upload(url);
      } catch (ex) {
        console.error(ex);
        let errMessage;
        if (ex instanceof Error) {
          errMessage = ex.message;
        }
        toast.error(
          errMessage || "There's an error occured when saving the image"
        );
      }
      setIsLoading(false);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  return {
    mutate: async () => {
      if (!file) return;
      setIsLoading(true);
      mutate({
        id,
      });
    },
    handleChange,
    isLoading,
    id,
    file,
    setFile
  };
};

export default useUploadImage;
