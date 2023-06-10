import jwt from "jsonwebtoken";

export const signJWT = (email: string, password: string) => {
  const key = "secret";
  const token = jwt.sign({ email, password }, key);
  return token;
};
