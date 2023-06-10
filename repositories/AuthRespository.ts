import { User } from "@prisma/client";
import { prisma } from "../prisma/orm";

export const register = async (data: User) => {
  const user = await prisma.user.create({
    data,
  });
  return user;
};

export const findUser = async (key: string, value: string) => {
  const user = await prisma.user.findUnique({
    where: {
      [`${key}`]: value,
    },
  });
  return user;
};
