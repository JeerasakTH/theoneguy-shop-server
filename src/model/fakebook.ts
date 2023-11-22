import mongoose, { Schema } from "mongoose";

export interface fakebook {
  username: string;
  password: string;
}

const fakebookSchema = new Schema<fakebook>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const Fakebook = mongoose.model<fakebook>(
  "Fakebook",
  fakebookSchema,
  "fakebook"
);
