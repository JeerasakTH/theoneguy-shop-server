import mongoose, { Schema } from "mongoose";

export interface Item {
  name: string;
  type: string;
  price: number;
  image: string;
}

const itemSchema = new Schema<Item>({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

export const Items = mongoose.model<Item>(
  "Items",
  itemSchema,
  "items_statement"
);
