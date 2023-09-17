import { ErrorRequestHandler } from "express";
import { isHttpError } from "http-errors";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(error);
  let statusCode = 500;
  let errorMessage = "Internal server error";
  if (isHttpError(error)) {
    statusCode = error.statusCode;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ message: errorMessage });
};

export default errorHandler;
