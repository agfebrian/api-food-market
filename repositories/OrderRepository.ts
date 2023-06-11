import { prisma } from "../prisma/orm";
import { Order, Status } from "@prisma/client";
import ParamFilterOrder from "../types/param-filter-order.interface";

export const getAll = async (data: ParamFilterOrder, statusEnum: Status[]) => {
  const orders = await prisma.order.findMany({
    where: {
      AND: {
        id: {
          contains: data.trx,
        },
        status: {
          in: statusEnum,
        },
        user_id: {
          contains: data.userId,
        },
      },
    },
    include: {
      food: true,
      user: true,
    },
  });
  return orders;
};

export const getOneByTrx = async (trx: string) => {
  const order = await prisma.order.findUnique({
    where: {
      id: trx,
    },
    include: {
      user: true,
      food: true,
    },
  });
  return order;
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
