import { Prisma, PrismaClient } from "@prisma/client";
import {
  massageProductClient,
  massageProductClientList,
} from "../helpers/massageProductClient";
import db from "../lib/servers/prismadb";

export const fetchPopularProducts = async (
  limit: number,
  prisma?: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => {
  const products = await (prisma ?? db).product.findMany({
    take: limit,
    orderBy: {
      price: "desc",
    },
    include: {
      category: true,
      _count: {
        select: {
          orderItems: true,
        },
      },
    },
  });
  return massageProductClientList(products);
};

export const fetchProducts = async (
  skip?: number,
  take?: number,
  prisma?: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => {
  const products = await (prisma ?? db).product.findMany({
    include: {
      category: true,
      _count: {
        select: {
          orderItems: true,
        },
      },
    },
    ...(skip && { skip }),
    ...(take && { take }),
  });
  return massageProductClientList(products);
};

export const fetchProductById = async (
  id: string,
  prisma?: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => {
  const product = await (prisma ?? db).product.findFirst({
    where: {
      id,
    },
    include: {
      category: true,
      _count: {
        select: {
          orderItems: true,
        },
      },
    },
  });
  if (!product) return;
  return massageProductClient(product);
};

export const getProductsBySearch = async (
  search: string,
  take?: number,
  skip?: number,
  prisma?: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => {
  const products = await (prisma ?? db).product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          category: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ],
    },
    include: {
      category: true,
      _count: {
        select: {
          orderItems: true,
        },
      },
    },
    ...(take && { take }),
    ...(skip && { skip }),
  });
  return massageProductClientList(products);
};
