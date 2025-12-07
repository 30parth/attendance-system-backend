import { Schema, model } from "mongoose";

export interface IClass {
  _id: string;
  name: string;
}

const classSchema = new Schema<IClass>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const Class = model<IClass>("Class", classSchema);
