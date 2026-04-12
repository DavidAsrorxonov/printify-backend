import { Router } from "express";
import productRoutes from "./product.route";

const router = Router();
router.use("/product", productRoutes);

export default router;
