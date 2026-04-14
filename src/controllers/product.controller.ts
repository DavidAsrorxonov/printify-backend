import { Request, Response } from "express";
import { asyncHandler } from "../middleware/async-handler.middleware";
import { HTTP_STATUS } from "../config/http.config";
import {
  getProductByIdService,
  getProductService,
} from "../services/product.service";

export const getProductsController = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await getProductService();
    return res.status(HTTP_STATUS.OK).json({
      message: "Products fetched successfully.",
      products,
    });
  },
);

export const getProductByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const params = req.params;
    const id = params.id as string;
    const data = await getProductByIdService(id);
    return res.status(HTTP_STATUS.OK).json({
      message: "Product fetched successfully.",
      ...data,
    });
  },
);
