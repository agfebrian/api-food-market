import { Request, Response } from "express";
import {
  createOrder,
  findOrder,
  getAllOrder,
  paymentNotification,
} from "../services/OrderService";
import { RequestOrder } from "../types/request-order.interface";
import ParamFilterOrder from "../types/param-filter-order.interface";

export const handleGetAllOrder = async (req: Request, res: Response) => {
  const query: ParamFilterOrder = {
    trx: (req.query.trx as string) || "",
    status: (req.query.status as any) || "",
    userId: (req.query.userId as string) || "",
  };
  const data = await getAllOrder(query);
  res.status(data.statusCode).send(data);
};

export const handleGetOrder = async (req: Request, res: Response) => {
  const params = req.params.trx;
  const data = await findOrder(params);
  res.status(data.statusCode).send(data);
};

export const handlerOrder = async (req: Request, res: Response) => {
  const request: RequestOrder = req.body;
  const data = await createOrder(request);
  res.status(data.statusCode).send(data);
};

export const handlerPaymentNotification = async (
  req: Request,
  res: Response
) => {
  const request = req.body;
  const data = await paymentNotification(request);
  res.status(data.statusCode).send(data);
};
