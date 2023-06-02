import { Food } from "@prisma/client";
import { prisma } from "../prisma/orm";

export const getAll = async () => {
  const data = await prisma.food.findMany();
  return data;
};

export const create = async (data: Food) => {
  const food = await prisma.food.create({ data });
  return food;
};
