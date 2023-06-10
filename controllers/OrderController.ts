import { Request, Response } from "express";
import { createOrder, paymentNotification } from "../services/OrderService";
import { RequestOrder } from "../types/request-order.interface";

export const handlerOrder = async (req: Request, res: Response) => {
  const request: RequestOrder = req.body;
  const data = await createOrder(request);
  res.status(data.statusCode).send(data);
};

export const handlerPaymentNotification = async (res: Response) => {
  const data = await paymentNotification();
  res.status(data.statusCode).send(data);
};
