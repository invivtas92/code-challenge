import { ReqMethods } from "../utils/constants"

interface ConstructorParams {
  message: string
  resStatus?: number
  resError?: unknown
  reqUrl: string
  reqBody?: unknown
  reqMethod: ReqMethods
}

export class ApiServerError extends Error {
  resStatus?: number;
  resError?: unknown;
  reqUrl: string;
  reqBody?: unknown;
  reqMethod: ReqMethods;
  readonly name = 'ApiServerError';
  

  constructor({ message, resStatus, resError, reqUrl, reqBody, reqMethod }: ConstructorParams) {
    super(message);
    this.resStatus = resStatus;
    this.resError = resError;
    this.reqUrl= reqUrl;
    this.reqBody = reqBody;
    this.reqMethod = reqMethod
  }
}

