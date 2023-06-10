import midtransClient from "midtrans-client";
import { create, updateOrderStatus } from "../repositories/OrderRepository";
import { RequestOrder } from "../types/request-order.interface";
import ResponseApi from "../types/response.interface";
import responseApi from "../response";

interface Data extends ResponseApi {
  data: {
    redirect_url: string;
  };
}

export let response: Data = {
  ...responseApi,
  data: {
    redirect_url: "",
  },
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
    await create({
      id: orderId,
      status: "PENDING",
      quantity: data.quantity,
      total: data.total,
      food_id: data.food_id,
      user_id: data.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    snap
      .createTransaction(params)
      .then((transaction: { token: string; redirect_url: string }) => {
        response = {
          status: true,
          statusCode: 200,
          data: {
            redirect_url: transaction.redirect_url,
          },
          message: "Redirect page",
          errors: [],
        };
      })
      .catch((err: any) => {
        response = {
          status: false,
          statusCode: 422,
          data: {
            redirect_url: "",
          },
          message: "Failed",
          errors: [err.message],
        };
      });
  } catch (error: any) {
    response = {
      status: false,
      statusCode: 422,
      data: {
        redirect_url: "",
      },
      message: "Failed",
      errors: [error.message],
    };
  }
  return response;
};

export const paymentNotification = async () => {
  const apiClient = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.SERVER_KEY_PAYMENT,
    clientKey: process.env.CLIENT_KEY_PAYMENT,
  });

  try {
    const statusResponse = await apiClient.transaction.notification();
    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;

    if (transactionStatus == "settlement") {
      // TODO set transaction status on your database to 'success'
      // and response with 200 OK
      await updateOrderStatus(orderId, "DELIVERED");
      response = {
        status: true,
        statusCode: 200,
        message: "Success payment order",
        data: {} as any,
        errors: [],
      };
    } else if (
      transactionStatus == "cancel" ||
      transactionStatus == "deny" ||
      transactionStatus == "expire"
    ) {
      // TODO set transaction status on your database to 'failure'
      // and response with 200 OK
      await updateOrderStatus(orderId, "CANCELED");
      response = {
        status: true,
        statusCode: 200,
        message: "Failed payment order",
        data: {} as any,
        errors: [],
      };
    } else if (transactionStatus == "pending") {
      // TODO set transaction status on your database to 'pending' / waiting payment
      // and response with 200 OK
      await updateOrderStatus(orderId, "PENDING");
      response = {
        status: true,
        statusCode: 200,
        message: "Waiting payment order",
        data: {} as any,
        errors: [],
      };
    }
  } catch (error: any) {
    response = {
      status: false,
      statusCode: 422,
      message: "Failed getting payment notification",
      data: {} as any,
      errors: [error.message],
    };
  }
  return response;
};
