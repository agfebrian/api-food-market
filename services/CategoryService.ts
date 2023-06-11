import { Category } from "@prisma/client";
import { getAll, create } from "../repositories/CategoryRepository";
import { response, setResponse } from "../response";
// import responseApi from "../response";
// import ResponseApi from "../types/response.interface";

// interface Data extends ResponseApi {
//   data: Category[] | Category | null;
// }

// export let response: Data = {
//   ...responseApi,
//   data: null,
// };

export const getAllCategories = async () => {
  try {
    const data = await getAll();
    setResponse({
      status: true,
      statusCode: 200,
      data: data,
      message: "Success getting categories",
      errors: [],
    });
  } catch (error: any) {
    setResponse({
      status: false,
      statusCode: 422,
      data: [],
      message: "Failed getting categories",
      errors: [error.message],
    });
  }
  return response;
};

export const createCategory = async (payload: Category[]) => {
  try {
    const data = await create(payload);
    setResponse({
      status: true,
      statusCode: 200,
      data: data as any,
      message: "Success create categories",
      errors: [],
    });
  } catch (error: any) {
    setResponse({
      status: false,
      statusCode: 422,
      data: [],
      message: "Failed create categories",
      errors: [error.message],
    });
  }
  return response;
};
