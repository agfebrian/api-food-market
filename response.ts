import ResponseApi from "./types/response.interface";

const responseApi: ResponseApi = {
  status: true,
  statusCode: 200,
  data: null,
  message: "",
  errors: [],
};

export const setResponse = (params: ResponseApi) => {
  const { status, statusCode, data, message, errors } = params;
  responseApi.status = status;
  responseApi.statusCode = statusCode;
  responseApi.data = data;
  responseApi.message = message;
  responseApi.errors = errors;
};

export const response = responseApi;
