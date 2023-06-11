import jwt from "jsonwebtoken";

export const signJWT = (email: string, password: string) => {
  const key = "secret";
  const token = jwt.sign({ email, password }, key);
  return token;
};

export const verifyJWT = (
  token: string
): { status: boolean; message: string } => {
  const key = "secret";
  const data = {
    status: true,
    message: "Token verified",
  };

  jwt.verify(token, key, (err: any) => {
    if (err) {
      data.status = false;
      data.message = err.message;
      return data;
    }
  });

  return data;
};
