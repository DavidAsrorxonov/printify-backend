import mongoose, { Document } from "mongoose";

export enum ProductType {
  TSHIRT = "TSHIRT",
  HOODIE = "HOODIE",
}

export const SIZE_OPTIONS = ["S", "M", "L", "XL", "XXL"] as const;

export enum Section {
  CATALOG = "catalog",
  FEATURED = "featured",
}

export interface PrintableArea {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface ProductDocument extends Document {
  type: ProductType;
  template: boolean;
  section: Section;
  name: string;
  body: string;
  displayUrl: string;

  basePrice?: number;
  baseUrl?: string;
  sizes?: typeof SIZE_OPTIONS;
  printableArea?: PrintableArea;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<ProductDocument>({
  type: {
    type: String,
    enum: [ProductType.TSHIRT, ProductType.HOODIE],
    required: true,
  },
  template: {
    type: Boolean,
    default: false,
  },
  section: {
    type: String,
    enum: Section,
    default: Section.CATALOG,
  },
  name: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});
