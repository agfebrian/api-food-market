import express, { Application } from "express";
import { routes } from "./routers";
import bodyParser from "body-parser";

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
routes(app);

const port: number = 4000;
app.listen(port, () => console.log(`Server is listening app on port ${port}`));
