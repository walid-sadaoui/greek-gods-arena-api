export default class HttpError extends Error {
  code: number;

  description: string;

  message: string;

  isOperational: boolean;

  constructor(
    code: number,
    descritpion: string,
    message: string,
    isOperational: boolean
  ) {
    super();

    this.code = code;
    this.description = descritpion;
    this.message = message;
    this.isOperational = isOperational;
  }
}
