import midtransClient from "midtrans-client";
import {
  create,
  getAll,
  getOneByTrx,
  updateOrderStatus,
} from "../repositories/OrderRepository";
import { RequestOrder } from "../types/request-order.interface";
import ParamFilterOrder from "../types/param-filter-order.interface";
import { response, setResponse } from "../response";
import { Status } from "@prisma/client";
import fetch from "node-fetch";

export const getAllOrder = async (data: ParamFilterOrder) => {
  let status: Status[] = [];
  if (data.status) {
    data.status.split(",").forEach((item) => {
      switch (item) {
        case "1":
          status.push(Status.PENDING);
          break;
        case "2":
          status.push(Status.PAID);
          break;
        case "3":
          status.push(Status.ON_DELIVERY);
          break;
        case "4":
          status.push(Status.DELIVERED);
          break;
        case "5":
          status.push(Status.CANCELED);
          break;
      }
    });
  }

  try {
    const orders = await getAll(data, status);
    setResponse({
      status: true,
      statusCode: 200,
      data: orders,
      message: "Success getting orders",
      errors: [],
    });
  } catch (error: any) {
    setResponse({
      status: false,
      statusCode: 422,
      data: [],
      message: "Failed getting orders",
      errors: [error.message],
    });
  }
  return response;
};

export const findOrder = async (trx: string) => {
  try {
    const order = await getOneByTrx(trx);
    setResponse({
      status: true,
      statusCode: 200,
      data: order,
      message: "Success getting order",
      errors: [],
    });
  } catch (error: any) {
    setResponse({
      status: false,
      statusCode: 422,
      data: [],
      message: "Failed getting orders",
      errors: [error.message],
    });
  }
  return response;
};

export const createOrder = async (data: RequestOrder) => {
  const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.SERVER_KEY_PAYMENT,
  });

  const timestamp = Math.floor(new Date().getTime() / 1000.0);
  const orderId = `TRX${timestamp}`;
  const params = {
    transaction_details: {
      order_id: orderId,
      gross_amount: data.total,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: data.name,
      last_name: "",
      email: data.email,
      phone: data.phone,
    },
  };

  try {
    const { redirect_url } = await snap.createTransaction(params);

    await create({
      id: orderId,
      status: "PENDING",
      quantity: data.quantity,
      total: data.total,
      link: redirect_url,
      food_id: data.food_id,
      user_id: data.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    setResponse({
      status: true,
      statusCode: 200,
      data: {
        redirect_url: redirect_url,
      },
      message: "Redirect page",
      errors: [],
    });
  } catch (error: any) {
    setResponse({
      status: false,
      statusCode: 422,
      data: {
        redirect_url: "",
      },
      message: "Failed",
      errors: [error.message],
    });
  }
  return response;
};

export const paymentNotification = async (data: any) => {
  const apiClient = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.SERVER_KEY_PAYMENT,
    clientKey: process.env.CLIENT_KEY_PAYMENT,
  });

  try {
    const statusResponse = await apiClient.transaction.notification(data);
    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;

    if (transactionStatus == "settlement") {
      // TODO set transaction status on your database to 'success'
      // and response with 200 OK
      await updateOrderStatus(orderId, "DELIVERED");
      setResponse({
        status: true,
        statusCode: 200,
        message: "Success payment order",
        data: {} as any,
        errors: [],
      });
    } else if (
      transactionStatus == "cancel" ||
      transactionStatus == "deny" ||
      transactionStatus == "expire"
    ) {
      // TODO set transaction status on your database to 'failure'
      // and response with 200 OK
      await updateOrderStatus(orderId, "CANCELED");
      setResponse({
        status: true,
        statusCode: 200,
        message: "Failed payment order",
        data: {} as any,
        errors: [],
      });
    } else if (transactionStatus == "pending") {
      // TODO set transaction status on your database to 'pending' / waiting payment
      // and response with 200 OK
      await updateOrderStatus(orderId, "PENDING");
      setResponse({
        status: true,
        statusCode: 200,
        message: "Waiting payment order",
        data: {} as any,
        errors: [],
      });
    }
  } catch (error: any) {
    setResponse({
      status: false,
      statusCode: 422,
      message: "Failed getting payment notification",
      data: {} as any,
      errors: [error.message],
    });
  }
  return response;
};

export const cancelOrder = async (trxId: string) => {
  const apiUrl = `https://api.sandbox.midtrans.com/v2/${trxId}/cancel`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      authorization: `Basic ${process.env.SERVER_KEY_PAYMENT_HASHED}`,
    },
  };
  const { status_code } = await fetch(apiUrl, options).then((res) =>
    res.json()
  );

  switch (status_code) {
    case "401":
      setResponse({
        status: false,
        statusCode: 401,
        message: "Unauthorized",
        data: {} as any,
        errors: [],
      });
      break;
    case "200":
      await updateOrderStatus(trxId, "CANCELED");
      setResponse({
        status: true,
        statusCode: 200,
        message: "Success cancel order",
        data: {} as any,
        errors: [],
      });
      break;
    default:
      setResponse({
        status: false,
        statusCode: Number(status_code),
        message: "Failed cancel order",
        data: {} as any,
        errors: [],
      });
      break;
  }
  return response;
};
