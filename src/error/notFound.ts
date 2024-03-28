import { CustomError } from "./customErrors";

export default class NotFound extends CustomError {
  private static readonly _statusCode = 404;
  private readonly _code: number;
  private readonly _context: { [key: string]: any };

  constructor(params?: {code?: number, message?: string, context?: { [key: string]: any }}) {
    const { code, message} = params || {};
    
    super(message || "Not Found");
    this._code = code || NotFound._statusCode;
    this._context = params?.context || {};

    Object.setPrototypeOf(this, NotFound.prototype);
  }

  get errors() {
    return [{ message: this.message, context: this._context }];
  }

  get statusCode() {
    return this._code;
  }
}