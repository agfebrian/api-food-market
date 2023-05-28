import { Application, Router } from "express";
import { foodRouter } from "./food";
import { authRoute } from "./auth";

const routesArr: [string, Router][] = [
  ["/auth", authRoute],
  ["/foods", foodRouter],
];

export const routes = (app: Application) => {
  routesArr.map((item) => {
    const [url, route] = item;
    app.use(url, route);
  });
};
