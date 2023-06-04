import { Category } from "@prisma/client";
import { prisma } from "../prisma/orm";

export const getAll = async () => {
  const data = await prisma.category.findMany();
  return data;
};

export const create = async (data: Category[]) => {
  const category = await prisma.category.createMany({ data });
  return category;
};
