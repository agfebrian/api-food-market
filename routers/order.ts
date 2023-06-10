import { Router } from "express";
import {
  handlerOrder,
  handlerPaymentNotification,
} from "../controllers/OrderController";

export const orderRouter: Router = Router();

orderRouter.post("/", handlerOrder);
orderRouter.post("/payment-notification", handlerPaymentNotification);