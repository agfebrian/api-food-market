export default interface ResponseApi {
  status: boolean;
  statusCode: number;
  message: string;
  errors: Array<any>;
}
