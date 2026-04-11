import mongoose, { Document } from "mongoose";

export interface ListingDocument extends Document {
  userId: string;
  templateId: mongoose.Schema.Types.ObjectId;
  slug: string;
  title: string;
  description: string;
  sellingPrice: number;
  colorIds: mongoose.Schema.Types.ObjectId[];
  artworkUrl: string;
  artworkPlacement: {
    top: number;
    left: number;
    width: number;
    height: number;
    refDisplayWidth: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const listingSchema = new mongoose.Schema<ListingDocument>(
  {
    userId: {
      type: String,
      required: true,
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    colorIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductColor",
      },
    ],
    slug: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    artworkUrl: {
      type: String,
      required: true,
    },
    artworkPlacement: {
      top: Number,
      left: Number,
      width: Number,
      height: Number,
      refDisplayWidth: Number,
    },
  },
  {
    timestamps: true,
  },
);
