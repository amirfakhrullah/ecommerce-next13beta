"use client";

import { useForm } from "react-hook-form";
import { FullProductClient } from "../../types/types";
import Input from "../inputs/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProductInputSchema,
  CreateProductsInput,
} from "../../helpers/validations/productRoutesSchema";
import { trpc } from "../../providers/trpcProvider";
import { toast } from "react-hot-toast";
import useUploadImage from "../../hooks/useUploadImage";
import Image from "next/image";
import { useState } from "react";
import Button from "../buttons/Button";
import { DEFAULT_SIZES } from "../../constants";
import cn from "../../helpers/cn";
import Loader from "../loaders/Loader";
import DeleteProduct from "../DeleteProduct";

interface ProductFormProps {
  type: "add" | "edit";
  initialData?: FullProductClient;
  deletePostAction?: () => void;
}

const ProductForm = ({
  type,
  initialData,
  deletePostAction,
}: ProductFormProps) => {
  const [changeImage, setChangeImage] = useState(type === "add");
  const utils = trpc.useContext();

  const { data: categoryList, isLoading: isCategoryListLoading } =
    trpc.admin.getCategoryList.useQuery(undefined, {
      refetchOnWindowFocus: false,
      onError: (err) => toast.error(err.message),
    });

  //   add new product
  const { mutate: saveNewProduct, isLoading: isSavingNewProduct } =
    trpc.admin.createProduct.useMutation({
      retry: false,
      onSuccess: (res) => {
        toast.success(`${res.name} data successfully added`);
        utils.product.get.invalidate();
        utils.admin.getProductsInfo.invalidate();
        reset();
      },
      onError: (err) => toast.error(err.message),
    });

  // update existing product
  const { mutate: updateProduct, isLoading: isUpdatingProduct } =
    trpc.admin.updateProduct.useMutation({
      retry: false,
      onSuccess: (res) => {
        toast.success(`${res.name} data successfully updated`);
        utils.product.get.invalidate();
        utils.admin.getProductsInfo.invalidate();
        reset();
      },
      onError: (err) => toast.error(err.message),
    });

  const {
    id: imageId,
    mutate: submitImage,
    handleChange: saveImageLocal,
    isLoading: isUploadingImage,
    file,
    setFile,
  } = useUploadImage(initialData?.id);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    resetField,
    getValues,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<CreateProductsInput>({
    defaultValues: {
      name: initialData?.name,
      image: initialData?.image,
      description: initialData?.description || undefined,
      sizes: initialData?.sizes?.filter(Boolean) || [],
      quantity: initialData?.quantity || 0,
      price: initialData?.price || 0,
      categoryId: initialData?.categoryId,
    },
    resolver: zodResolver(createProductInputSchema),
  });

  const onSubmit = async () => {
    const price = getValues("price").toString();
    const quantity = getValues("quantity").toString();
    setValue("price", parseInt(price));
    setValue("quantity", parseInt(quantity));
    trigger([
      "name",
      "description",
      "categoryId",
      "price",
      "quantity",
      "sizes",
      ...((!changeImage ? ["image"] : []) as []),
    ]);
    // upload image
    if (changeImage && !!file) {
      await submitImage();
      const newUrl = process.env.NEXT_PUBLIC_S3_BUCKET_URL! + `/${imageId}`;
      if (getValues("image") !== newUrl) {
        setValue("image", newUrl);
      }
    }
    handleSubmit((data) => {
      switch (type) {
        case "add":
          return saveNewProduct(data);
        case "edit":
          return updateProduct({
            ...data,
            id: initialData?.id || "",
          });
        default:
          return;
      }
    })();
  };

  const changeImageState = () => {
    if (changeImage) {
      setFile(null);
    }
    setChangeImage(!changeImage);
  };

  const handleSize = (size: string) => {
    const sizes = getValues("sizes");
    if (sizes.includes(size)) {
      setValue(
        "sizes",
        sizes.filter((cur) => cur !== size)
      );
    } else {
      setValue("sizes", [...sizes, size]);
    }
  };

  const watchSizes = watch("sizes");
  const watchCategoryId = watch("categoryId");

  const loading = isUploadingImage || isSavingNewProduct || isUpdatingProduct;

  if (isCategoryListLoading) {
    return <Loader />;
  }
  return (
    <div>
      {!file && getValues("image") && (
        <div className="max-w-[400px] mx-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            src={getValues("image")}
            alt="image"
            width={50}
            height={50}
            className="w-auto h-auto"
          />
        </div>
      )}
      {file && (
        <div className="max-w-[400px] mx-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            src={URL.createObjectURL(file)}
            alt="image"
            width={50}
            height={50}
            className="w-auto h-auto"
          />
        </div>
      )}

      {initialData?.image && (
        <div className="flex flex-row justify-end">
          <Button
            color="secondary"
            className="p-3"
            disabled={loading}
            localLoaderOnClick={false}
            type="button"
            onClick={() => changeImageState()}
          >
            {changeImage ? "Cancel Change" : "Change Image"}
          </Button>
        </div>
      )}

      {changeImage && (
        <Input
          type="file"
          title="Image"
          required
          disabled={loading}
          error={errors.image}
          onChange={(e) => {
            saveImageLocal(e as React.ChangeEvent<HTMLInputElement>);
          }}
        />
      )}

      <Input
        title="Name"
        placeholder="Air Jordan 1 Retro High Dior"
        required
        disabled={loading}
        error={errors.name}
        register={register("name")}
      />

      <div className="flex flex-row mt-3">
        <p className="font-bold text-sm text-gray-700">Category</p>
        <p className="text-red-400 ml-1">*</p>
      </div>
      <div className="flex flex-row flex-wrap gap-1 pt-2 pb-5">
        {categoryList?.map(({ id, name }) => (
          <div
            onClick={() =>
              !loading &&
              (() => {
                setValue("categoryId", id);
              })()
            }
            key={id}
            className={cn(
              "cursor-pointer border border-zinc-300 hover:border-zinc-800 hover:text-zinc-800 p-2 ease-in duration-75",
              watchCategoryId === id &&
                "bg-zinc-700 text-white hover:text-white",
              loading &&
                "cursor-not-allowed bg-zinc-300 text-zinc-500 hover:border-zinc-300 hover:text-zinc-500"
            )}
          >
            {name}
          </div>
        ))}
      </div>
      <p className="text-sm font-bold text-red-400 mt-1 text-right">
        {errors.categoryId && errors.categoryId.message}
      </p>

      <Input
        title="Description"
        placeholder="Jordan has collaborated with a legacy fashion ..."
        required
        disabled={loading}
        error={errors.description}
        register={register("description")}
        textArea
      />

      <Input
        title="Price (USD)"
        placeholder="Product name"
        type="number"
        required
        disabled={loading}
        error={errors.price}
        register={register("price")}
      />

      <div className="flex flex-row mt-3">
        <p className="font-bold text-sm text-gray-700">Available Sizes</p>
        <p className="text-red-400 ml-1">*</p>
      </div>
      <div className="flex flex-row flex-wrap gap-1 pb-5">
        {DEFAULT_SIZES.map((currSize) => (
          <div
            onClick={() => !loading && handleSize(currSize)}
            key={currSize}
            className={cn(
              "cursor-pointer border border-zinc-300 hover:border-zinc-800 hover:text-zinc-800 p-2 ease-in duration-75",
              watchSizes.includes(currSize) &&
                "bg-zinc-700 text-white hover:text-white",
              loading &&
                "cursor-not-allowed bg-zinc-300 text-zinc-500 hover:border-zinc-300 hover:text-zinc-500"
            )}
          >
            US M {currSize}
          </div>
        ))}
      </div>
      <p className="text-sm font-bold text-red-400 mt-1 text-right">
        {errors.sizes && errors.sizes.message}
      </p>

      <Input
        title="Quantity"
        placeholder="Product name"
        type="number"
        required
        disabled={loading}
        error={errors.quantity}
        register={register("quantity")}
      />

      <div className="flex flex-row justify-end mt-5">
        {type === "edit" && initialData && (
          <DeleteProduct disabled={loading} id={initialData.id} deletePostAction={deletePostAction} />
        )}

        <Button
          color="primary"
          className="p-3"
          disabled={loading}
          isLoading={loading}
          localLoaderOnClick={false}
          type="button"
          onClick={() => onSubmit()}
        >
          {type === "add" ? "Add Product" : "Save Product"}
        </Button>
      </div>
    </div>
  );
};

export default ProductForm;
