import express, { Application } from "express";
import { routes } from "./routers";
import bodyParser from "body-parser";
import cors from "cors";

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
routes(app);

const port: number = 4000;
app.listen(port, () => console.log(`Server is listening app on port ${port}`));
