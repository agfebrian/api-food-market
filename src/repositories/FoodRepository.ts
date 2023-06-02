import { Food } from "@prisma/client";
import { prisma } from "../prisma/orm";

export const getAll = async (params: { category: string; perPage: string }) => {
  const data = await prisma.food.findMany({
    where: {
      OR: {
        categories: {
          some: {
            category: {
              name: {
                contains: params.category,
              },
            },
          },
        },
      },
    },
    include: {
      categories: {
        select: { category: true },
      },
    },
    take: params.perPage ? Number(params.perPage) : 10,
  });
  return data;
};

export const create = async (data: Food) => {
  const food = await prisma.food.create({ data });
  return food;
};
