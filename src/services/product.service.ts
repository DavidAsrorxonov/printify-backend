import ProductColor from "../models/product-color.model";
import Product from "../models/products.model";
import { InternalServerException, NotFoundException } from "../utils/app-error";

export const getProductService = async () => {
  const products = await Product.find().lean();
  return {
    catalog: products.filter((prod) => prod.section === "catalog"),
    featured: products.filter((prod) => prod.section === "featured"),
  };
};

export const getProductByIdService = async (id: string) => {
  try {
    const selectedProduct = await Product.findById(id).lean();
    if (!selectedProduct) throw new NotFoundException("Product not found");

    const template = selectedProduct.template
      ? selectedProduct
      : await Product.findOne({
          type: selectedProduct.type,
          template: true,
        }).lean();

    if (!template) throw new NotFoundException("Editor template not found");

    const colors = await ProductColor.find({
      templateId: template._id,
    }).lean();

    return { template, colors };
  } catch (error) {
    throw new InternalServerException("Internal Server Error");
  }
};
