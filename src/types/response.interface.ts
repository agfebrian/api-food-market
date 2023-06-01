export default interface ResposeApi {
  status: boolean;
  statusCode: number;
  message: string;
  errors: Array<any>;
}
