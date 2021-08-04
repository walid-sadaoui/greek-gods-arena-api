export default class HttpError extends Error {
  statusCode: number;

  description: string;

  message: string;

  isOperational: boolean;

  constructor(
    statusCode = 500,
    descritpion: string,
    message: string,
    isOperational = false
  ) {
    super();

    this.statusCode = statusCode;
    this.description = descritpion;
    this.message = message;
    this.isOperational = isOperational;
  }
}
