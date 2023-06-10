import { prisma } from "../prisma/orm";
import { Order } from "@prisma/client";

export const getAll = async () => {
  const orders = await prisma.order.findMany();
  return orders;
};

export const create = async (data: Order) => {
  const order = await prisma.order.create({
    data: data,
  });
  return order;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const order = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: status as any,
    },
  });
  return order;
};
