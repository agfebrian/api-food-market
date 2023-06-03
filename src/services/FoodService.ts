import { Food } from "@prisma/client";
import resposeApi from "../response";
import ResponseApi from "../types/response.interface";
import { create, getAll, getOneById } from "../repositories/FoodRepository";

interface Data extends ResponseApi {
  data: Food | Food[];
}

export let response: Data = {
  ...resposeApi,
  data: {} as Food,
};

export const getAllFoods = async (params: {
  category: string;
  perPage: string;
}) => {
  try {
    const foods = await getAll(params);
    // changes categories structure
    foods.forEach((food) => {
      food.categories = food.categories.map(
        (category) => category.category
      ) as any;
    });

    response = {
      status: true,
      statusCode: 200,
      data: foods,
      message: "Success getting foods",
      errors: [],
    };
  } catch (error: any) {
    response = {
      status: false,
      statusCode: 422,
      data: [],
      message: "Failed getting foods",
      errors: [error.message],
    };
  }
  return response;
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
  } catch (error: any) {
    response = {
      status: false,
      statusCode: 422,
      data: {} as Food,
      message: "Failed add food",
      errors: [error.message],
    };
  }
  return response;
};

export const findFood = async (id: string) => {
  try {
    const food = await getOneById(id);
    // changes ingredients structure
    food!.ingredients = food!.ingredients.map(
      (ingredient) => ingredient.ingredient
    ) as any;

    response = {
      status: true,
      statusCode: 200,
      data: food as Food,
      message: "Success getting food",
      errors: [],
    };
  } catch (error: any) {
    response = {
      status: false,
      statusCode: 422,
      data: {} as Food,
      message: "Failed getting food",
      errors: [error.message],
    };
  }
  return response;
};
