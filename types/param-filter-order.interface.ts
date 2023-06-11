import { Status } from "@prisma/client";

export default interface ParamFilterOrder {
  trx?: string;
  status?: string;
  userId?: string;
}
