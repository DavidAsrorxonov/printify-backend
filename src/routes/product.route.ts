import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { getProductsController } from "../controllers/product.controller";

const productRoutes = Router()
  .use(requireAuth)
  .get("/all", getProductsController);

export default productRoutes;
