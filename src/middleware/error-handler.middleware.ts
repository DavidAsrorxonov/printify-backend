import { ErrorRequestHandler, Response } from "express";
import { ZodError } from "zod";
import { HTTP_STATUS } from "../config/http.config";
import { AppError } from "../utils/app-error";
import { ErrorCodes } from "../config/http-error-codes.config";

const formatZodError = (res: Response, error: ZodError) => {
  const errors = error?.issues?.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));

  return res.status(HTTP_STATUS.BAD_REQUEST).json({
    message: "Validation Error",
    errors: errors,
    errorCode: ErrorCodes.ERR_VALIDATION_ERROR,
  });
};

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`Error occured: ${req.path}`, error);

  if (error instanceof SyntaxError) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Invalid JSON format.",
    });
  }

  if (error instanceof ZodError) {
    formatZodError(res, error);
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error.",
    error: error?.message || "Something went wrong",
  });
};
