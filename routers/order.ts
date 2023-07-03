import { Router } from "express";
import {
  handleGetAllOrder,
  handleGetOrder,
  handlerOrder,
  handlerPaymentNotification,
  handleCancelOrder,
} from "../controllers/OrderController";
import { auth } from "../middlewares/authentication";

export const orderRouter: Router = Router();

orderRouter.post("/payment-notification", handlerPaymentNotification);

orderRouter.use(auth);

orderRouter.get("/", handleGetAllOrder);
orderRouter.get("/:trx", handleGetOrder);
orderRouter.post("/", handlerOrder);
orderRouter.post("/:trx/cancel", handleCancelOrder);
