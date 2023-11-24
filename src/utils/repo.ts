import { Model, FilterQuery, UpdateQuery } from "mongoose";

export const getOne = async <T>(
  Model: Model<T>,
  doc: FilterQuery<T>,
  projection?: any,
  options?: any
): Promise<T> => {
  const obj = await Model.findOne(doc, projection, options);
  return obj as T;
};

export const getMany = async <T>(
  Model: Model<T>,
  filter: FilterQuery<T>,
  projection?: any,
  options?: any
): Promise<T[]> => {
  const obj = await Model.find(filter, projection, options);
  return obj as T[];
};

export const createOne = async <T>(Model: Model<T>, doc: T): Promise<T> => {
  const obj = await Model.create(doc);
  return obj as T;
};

export const updateOne = async <T>(
  Model: Model<T>,
  doc: UpdateQuery<T>,
  id: any
): Promise<T> => {
  const obj = await Model.findByIdAndUpdate(id, doc, { new: true });
  return obj as T;
};

export const deleteOne = async <T>(Model: Model<T>, id: any): Promise<T> => {
  const obj = await Model.findByIdAndDelete(id);
  return obj as T;
};
