export class AppError<T> {
  message = '';

  field: T | null = null;

  constructor(message: string, field: T | null = null) {
    this.message = message;
    this.field = field;
  }
}
