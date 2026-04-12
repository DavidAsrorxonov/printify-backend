import { Request, Response } from "express";
import { asyncHandler } from "../middleware/async-handler.middleware";
import { HTTP_STATUS } from "../config/http.config";
import { getProductService } from "../services/product.service";

export const getProductsController = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await getProductService();
    return res.status(HTTP_STATUS.OK).json({
      message: "Products fetched successfully.",
      products,
    });
  },
);
