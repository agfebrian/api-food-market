import jwt from "jsonwebtoken";

export const signJWT = (email: string, password: string) => {
  const key = "secret";
  const token = jwt.sign({ email, password }, key);
  return token;
};

export const verifyJWT = (
  token: string
): { status: boolean; message: string; encoded: { email: string } } => {
  const key = "secret";
  const data = {
    status: true,
    message: "Token verified",
    encoded: { email: "" },
  };

  jwt.verify(token, key, (err: any, encoded) => {
    if (err) {
      data.status = false;
      data.message = err.message;
    } else {
      data.encoded = encoded as any;
    }
  });

  return data;
};
