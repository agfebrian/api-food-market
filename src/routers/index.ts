import { Application, Router } from "express";
import { foodRouter } from "./food";

const routesArr: [string, Router][] = [["/foods", foodRouter]];

export const routes = (app: Application) => {
  routesArr.map((item) => {
    const [url, route] = item;
    app.use(url, route);
  });
};
