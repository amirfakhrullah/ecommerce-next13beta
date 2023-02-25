"use client";

import { useForm } from "react-hook-form";
import { FullProductClient } from "../../types/types";
import Input from "../inputs/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductInputSchema } from "../../helpers/validations/productRoutesSchema";

interface ProductFormProps {
  type: "add" | "edit";
  initialData?: FullProductClient;
}

const ProductForm = ({ type, initialData }: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: initialData
      ? {
          name: initialData.name,
          image: initialData.image,
          description: initialData.description,
          sizes: initialData.sizes,
          quantity: initialData.quantity,
          price: initialData.price,
          categoryId: initialData.categoryId,
        }
      : undefined,
    resolver: zodResolver(createProductInputSchema),
  });

  const onSubmit = () => {};

  return (
    <div>
      <Input
        title="Name"
        placeholder="Product name"
        required
        error={errors.name}
        {...register("name")}
      />
      <Input
        title="Description"
        placeholder="Product name"
        required
        error={errors.description}
        {...register("description")}
      />
      <Input title="Category" placeholder="Product name" />
      <Input
        title="Quantity"
        placeholder="Product name"
        type="number"
        required
        error={errors.quantity}
        {...register("quantity")}
      />
      <Input
        title="Price"
        placeholder="Product name"
        type="number"
        required
        error={errors.quantity}
        {...register("quantity")}
      />
    </div>
  );
};

export default ProductForm;
