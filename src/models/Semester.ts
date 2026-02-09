import { Schema, model } from "mongoose";

export interface ISemester {
  _id: string;
  name: string;
  section: ISection[];
}

export interface ISection {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const sectionSchema = new Schema<ISection>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);

const semesterSchema = new Schema<ISemester>(
  {
    name: { type: String, required: true },
    section: { type: [sectionSchema], default: [] },
  },
  { timestamps: true },
);

export const Semester = model<ISemester>("Semester", semesterSchema);
