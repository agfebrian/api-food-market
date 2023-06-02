import { Food } from "@prisma/client";
import resposeApi from "../response";
import ResponseApi from "../types/response.interface";
import { create } from "../repositories/FoodRepository";

interface Data extends ResponseApi {
  data: Food;
}

export let response: Data = {
  ...resposeApi,
  data: {} as Food,
};

export const createFood = async (data: Food) => {
  try {
    const food = await create(data);
    response = {
      status: true,
      statusCode: 201,
      data: food,
      message: "Success add food",
      errors: [],
    };
  } catch (error) {
    response = {
      status: false,
      statusCode: 422,
      data: {} as Food,
      message: "Failed add food",
      errors: [],
    };
  }
  return response;
};
