import { Router } from "express";
import {
  handleGetAllOrder,
  handleGetOrder,
  handlerOrder,
  handlerPaymentNotification,
} from "../controllers/OrderController";

export const orderRouter: Router = Router();

orderRouter.get("/", handleGetAllOrder);
orderRouter.get("/:trx", handleGetOrder);
orderRouter.post("/", handlerOrder);
orderRouter.post("/payment-notification", handlerPaymentNotification);
