import { getDateCompare } from "../../helpers/date";
import { ProductsInfoResponse } from "../../server/routers/subRouters/admin.router";
import Image from "next/image";
import EditOrAddProductDialog from "../sections/EditOrAddProductSection/EditOrAddProductDialog";

const ProductForAdminCard = ({
  id,
  name,
  updatedAt,
  createdAt,
  image,
  price,
  _count: { orderItems: sold },
}: ProductsInfoResponse["products"][number]) => {
  return (
    <div className="p-4 md:mx-0 mx-2 border border-zinc-300 mt-2 rounded-md shadow-md grid md:grid-cols-4 grid-cols-2">
      <div className="md:col-span-2 cols-span-1 flex flex-row items-center">
        <div className="sm:block hidden flex-[0.5] mr-2">
          <Image
            src={image}
            alt={id}
            width={20}
            height={20}
            className="w-auto h-auto"
          />
        </div>
        <div className="flex-1">
          <p className="sm:text-[16px] text-[14px] font-semibold">{name}</p>
          <p className="sm:text-[16px] text-[14px] font-semibold text-red-800">
            ${price}
          </p>
          <p className="text-sm">{sold} sold</p>
        </div>
      </div>
      <div className="md:flex col-span-1 hidden flex-row items-center justify-center">
        <p className="text-sm">
          {updatedAt ? "Updated " : "Created "}
          {getDateCompare(new Date(updatedAt || createdAt))}
        </p>
      </div>
      <div className="col-span-1 flex items-center justify-end">
        <EditOrAddProductDialog id={id} />
      </div>
    </div>
  );
};

export default ProductForAdminCard;
