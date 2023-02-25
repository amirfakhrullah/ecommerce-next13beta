import { Prisma, PrismaClient } from "@prisma/client";
import { Sort } from "../../routers/subRouters/admin.router";

export const fetchPaginatedProducts = async (
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >,
  sort: Sort,
  take: number,
  cursor?: string
) =>
  prisma.product.findMany({
    where: {
      deleted: false,
    },
    select: {
      id: true,
      image: true,
      name: true,
      price: true,
      quantity: true,
      createdAt: true,
      updatedAt: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          orderItems: true,
        },
      },
    },
    take: take,
    ...(cursor && {
      skip: 1,
      cursor: {
        id: cursor,
      },
    }),
    orderBy: {
      ...(sort === Sort.Asc && { id: "asc" }),
      ...(sort === Sort.Desc && { id: "desc" }),
      ...(sort === Sort.PriceDown && { price: "desc" }),
      ...(sort === Sort.PriceUp && { price: "asc" }),
    },
  });
