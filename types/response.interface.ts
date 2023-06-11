export default interface ResponseApi {
  status: boolean;
  statusCode: number;
  data: any;
  message: string;
  errors: Array<any>;
}
