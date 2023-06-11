import { Router } from "express";
import {
  handleGetAllOrder,
  handleGetOrder,
  handlerOrder,
  handlerPaymentNotification,
} from "../controllers/OrderController";
import { auth } from "../middlewares/authentication";

export const orderRouter: Router = Router();

orderRouter.use(auth);

orderRouter.get("/", handleGetAllOrder);
orderRouter.get("/:trx", handleGetOrder);
orderRouter.post("/", handlerOrder);
orderRouter.post("/payment-notification", handlerPaymentNotification);
