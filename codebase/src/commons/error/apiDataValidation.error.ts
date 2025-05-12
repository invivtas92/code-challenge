import { ReqMethods } from "../utils/constants"

interface ConstructorParams {
  message: string
  schema: unknown
  data: unknown
  reqUrl: string
  reqBody?: unknown
  reqMethod: ReqMethods
}

export class ApiDataValidationError extends Error {
  schema: unknown;
  data: unknown;
  reqUrl: string;
  reqBody?: unknown;
  reqMethod: ReqMethods;
  readonly name = 'ApiDataValidationError';

  constructor({ message, schema, data, reqUrl, reqBody, reqMethod }: ConstructorParams) {
    super(message);
    this.schema = schema;
    this.data = data;
    this.reqUrl = reqUrl;
    this.reqBody = reqBody;
    this.reqMethod = reqMethod;
  }
}
