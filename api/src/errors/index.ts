export class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly field: string | null;

  constructor(message: string, statusCode = 400, field = null) {
      this.message = message;
      this.statusCode = statusCode;
      this.field = field;
  }
}
