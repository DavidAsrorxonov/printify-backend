import { ErrorRequestHandler } from "express";
import { HTTP_STATUS } from "../config/http.config";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`Error occured: ${req.path}`, error);

  if (error instanceof SyntaxError) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Invalid JSON format.",
    });
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error.",
    error: error?.message || "Something went wrong",
  });
};
