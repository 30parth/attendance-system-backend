import { Document, Schema, model } from "mongoose";

export interface ISubject extends Document {
  name: string;
  code: string;
  divition: string;
}

const SubjectSchema = new Schema<ISubject>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    divition: { type: String, required: true },
  },
  { timestamps: true }
);

export const Subject = model<ISubject>("Subject", SubjectSchema);
