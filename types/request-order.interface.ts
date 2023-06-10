import { Order } from "@prisma/client";

export interface RequestOrder extends Order {
  name: string;
  email: string;
  phone: string;
  user_id: string;
  food_id: string;
}
