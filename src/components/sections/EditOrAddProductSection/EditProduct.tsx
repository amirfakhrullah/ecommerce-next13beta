"use client";

import { toast } from "react-hot-toast";
import { trpc } from "../../../providers/trpcProvider";
import ProductForm from "../../forms/ProductForm";
import Loader from "../../loaders/Loader";

const EditProduct = ({ id, deletePostAction }: { id: string; deletePostAction: () => void }) => {
  const { data, isLoading, isRefetching } = trpc.product.get.useQuery(id, {
    refetchOnWindowFocus: false,
    onError: (err) => toast.error(err.message),
  });

  if (isLoading || isRefetching || !data) {
    return <Loader />;
  }
  return <ProductForm type="edit" initialData={data} deletePostAction={deletePostAction} />;
};

export default EditProduct;
