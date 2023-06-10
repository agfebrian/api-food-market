import { Application, Router } from "express";
import { foodRouter } from "./food";
import { authRoute } from "./auth";
import { categoryRouter } from "./category";
import { orderRouter } from "./order";

// index routes
const routesArr: [string, Router][] = [
  ["/auth", authRoute],
  ["/foods", foodRouter],
  ["/categories", categoryRouter],
  ["/order", orderRouter],
];

export const routes = (app: Application) => {
  routesArr.map((item) => {
    const [url, route] = item;
    app.use(url, route);
  });
};
