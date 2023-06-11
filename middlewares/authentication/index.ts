import { Request, Response, NextFunction } from "express";
import { response, setResponse } from "../../response";
import { verifyJWT } from "../../utils/auth/jwt";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    setResponse({
      status: false,
      statusCode: 403,
      data: null,
      message: "No credentials sent!",
      errors: ["Please given valid credentials"],
    });
    res.status(response.statusCode).send(response);
    return;
  }

  const token = authorization.replace("Bearer ", "");
  const verify = verifyJWT(token);
  if (!verify.status) {
    setResponse({
      status: false,
      statusCode: 401,
      data: null,
      message: verify.message,
      errors: ["Please given valid credentials"],
    });
    res.status(response.statusCode).send(response);
    return;
  }

  next();
};
