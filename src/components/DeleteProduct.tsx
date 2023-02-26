"use client";

import { Dialog, DialogBody } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { trpc } from "../providers/trpcProvider";
import Button from "./buttons/Button";

interface DeleteProductProps {
  id: string;
  disabled?: boolean;
}
const DeleteProduct = ({ id, disabled }: DeleteProductProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { isLoading, mutate } = trpc.admin.deleteProduct.useMutation({
    retry: false,
    onSuccess: () => {
      toast.success("Product successfully deleted");
      router.refresh();
    },
    onError: (err) => toast.error(err.message),
  });

  const handleSubmit = () => {
    mutate({ id });
  };

  return (
    <>
      <Button
        color="red"
        className="p-3 mr-1"
        disabled={disabled}
        isLoading={isLoading}
        localLoaderOnClick={false}
        type="button"
        onClick={() => setOpen(!open)}
      >
        Delete Product
      </Button>
      <Dialog
        className="md:mx-auto mx-2 bg-gray-100 mt-40 shadow-md border border-zinc-300 rounded-md"
        open={open}
        handler={() => setOpen(!open)}
      >
        <DialogBody className="block">
          <h1 className="font-bold 2xl mb-2">Confirm</h1>
          <div>Are you sure you want to delete this product?</div>
          <div className="flex flex-row justify-end mt-5">
            <Button
              color="secondary"
              className="p-3 mr-1"
              disabled={disabled}
              isLoading={isLoading}
              localLoaderOnClick={false}
              type="button"
              onClick={() => setOpen(!open)}
            >
              No, cancel
            </Button>
            <Button
              color="red"
              className="p-3"
              disabled={disabled}
              isLoading={isLoading}
              localLoaderOnClick={false}
              type="button"
              onClick={() => handleSubmit()}
            >
              Yes, proceed
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default DeleteProduct;
