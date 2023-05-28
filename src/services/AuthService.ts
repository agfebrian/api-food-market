import { Prisma, User } from "@prisma/client";
import { register as regist } from "../repositories/AuthRespository";

export const userRegister = async (data: User) => {
  let response = {
    status: true,
    statusCode: 200,
    data: {},
    message: "",
    errors: [],
  };

  try {
    const user = await regist(data);
    response = {
      status: true,
      statusCode: 200,
      data: user,
      message: "User registered",
      errors: [],
    };
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      response = {
        status: false,
        statusCode: 400,
        data: {},
        message: "Email is already available",
        errors: [],
      };
    } else {
      response = {
        status: false,
        statusCode: 500,
        data: {},
        message: error.message,
        errors: [],
      };
    }
  }

  return response;
};
