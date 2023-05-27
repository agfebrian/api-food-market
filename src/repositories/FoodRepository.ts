import { prisma } from "../prisma/orm";

export const getAll = async () => {
  const data = await prisma.food.findMany();
  return data;
};
