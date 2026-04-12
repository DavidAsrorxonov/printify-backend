import Product from "../models/products.model";

export const getProductService = async () => {
  const products = await Product.find().lean();
  return {
    catalog: products.filter((prod) => prod.section === "catalog"),
    featured: products.filter((prod) => prod.section === "featured"),
  };
};
