export default class HttpError extends Error {
  statusCode: number;

  description: string;

  message: string;

  isOperational: boolean;

  constructor(
    statusCode: number,
    descritpion: string,
    message: string,
    isOperational: boolean
  ) {
    super();

    this.statusCode = statusCode;
    this.description = descritpion;
    this.message = message;
    this.isOperational = isOperational;
  }
}
