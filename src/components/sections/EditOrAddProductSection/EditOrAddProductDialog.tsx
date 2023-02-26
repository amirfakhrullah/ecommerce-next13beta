"use client";

import { Dialog, DialogBody } from "@material-tailwind/react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { BiAddToQueue } from "react-icons/bi";
import Button from "../../buttons/Button";
import AddNewProduct from "./AddNewProduct";
import EditProduct from "./EditProduct";

interface EditOrAddProductDialogProps {
  id?: string;
}
const EditOrAddProductDialog = ({ id }: EditOrAddProductDialogProps) => {
  const isEdit = !!id;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const deletePostAction = () => setOpen(false);

  return (
    <>
      <Button
        type="button"
        onClick={handleOpen}
        localLoaderOnClick={false}
        className="py-3 px-6"
        color={isEdit ? "secondary" : "primary"}
      >
        {isEdit ? (
          <>
            <FiEdit2 className="mr-2" />
            Edit
          </>
        ) : (
          <>
            <BiAddToQueue className="mr-2" />
            Add New Product
          </>
        )}
      </Button>
      <Dialog
        dismiss={{
          enabled: false,
        }}
        className="w-full mx-auto max-w-[77rem] xl:px-0 px-2 pt-6 bg-gray-100 mt-20 shadow-md border border-zinc-300 rounded-md"
        open={open}
        handler={handleOpen}
      >
        <DialogBody className="block">
          <div className="mx-auto max-w-6xl flex flex-row items-center justify-between pb-4 border-b border-zinc-300">
            <h2 className="text-2xl font-black">
              {isEdit ? "Edit Product" : "Add New Product"}
            </h2>
            <Button
              color="secondary"
              localLoaderOnClick={false}
              onClick={handleOpen}
              className="py-3 px-6"
            >
              Close
              <AiOutlineClose className="ml-1" />
            </Button>
          </div>
          <div className="mx-auto pt-4 max-h-[70vh] max-w-6xl overflow-y-auto">
            {isEdit ? (
              <EditProduct id={id} deletePostAction={deletePostAction} />
            ) : (
              <AddNewProduct />
            )}
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default EditOrAddProductDialog;
