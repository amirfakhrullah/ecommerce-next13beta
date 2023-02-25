"use client";

import { toast } from "react-hot-toast";
import { trpc } from "../../../providers/trpcProvider";
import ProductForm from "../../forms/ProductForm";
import Loader from "../../loaders/Loader";

const EditProduct = ({ id }: { id: string }) => {
  const { data, isLoading } = trpc.product.get.useQuery(id, {
    refetchOnWindowFocus: false,
    onError: (err) => toast.error(err.message),
  });

  if (isLoading || !data) {
    return <Loader />;
  }
  return <ProductForm type="edit" initialData={data} />;
};

export default EditProduct;
