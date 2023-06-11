import { Prisma, User } from "@prisma/client";
import { register as regist, findUser } from "../repositories/AuthRespository";
import { signJWT } from "../utils/auth/jwt";
import { response, setResponse } from "../response";
// import ResponseApi from "../types/response.interface";
import bcrypt from "bcrypt";

// interface Data extends ResponseApi {
//   data: null | object | Array<any>;
// }

// export let response: Data = {
//   status: true,
//   statusCode: 200,
//   data: {},
//   message: "",
//   errors: [],
// };

export const userRegister = async (data: User) => {
  try {
    const password = await bcrypt.hash(data.password, 10);
    const user = await regist({ ...data, ...{ password } });
    const token: string = signJWT(data.email, data.password);
    setResponse({
      status: true,
      statusCode: 200,
      data: {
        user: {
          name: user.name,
          email: user.email,
          address: user.address,
          city: user.city,
          avatar: user.avatar,
          house_number: user.house_number,
          phone_number: user.phone_number,
        },
        ...{ token },
      },
      message: "User registered",
      errors: [],
    });
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      setResponse({
        status: false,
        statusCode: 400,
        data: {},
        message: "Email is already available",
        errors: [],
      });
    } else {
      setResponse({
        status: false,
        statusCode: 500,
        data: {},
        message: error.message,
        errors: [],
      });
    }
  }

  return response;
};

export const userLogin = async (data: User) => {
  try {
    // find user on db
    const user = await findUser("email", data.email);
    // compare request password
    const comparePassword = await bcrypt.compare(data.password, user!.password);
    if (comparePassword) {
      const token = signJWT(data.email, data.password);
      setResponse({
        status: true,
        statusCode: 200,
        data: { ...user, ...{ token } },
        message: "Cool, login successed",
        errors: [],
      });
    } else {
      setResponse({
        status: false,
        statusCode: 422,
        data: {},
        message: "Password doesn't match",
        errors: [],
      });
    }
  } catch (error) {
    setResponse({
      status: false,
      statusCode: 422,
      data: {},
      message: "Email not found",
      errors: [],
    });
  }
  return response;
};
