import { Document, Schema, model } from "mongoose";

export interface IStudent extends Document {
  admissionNo: string;
  rollNumber: string;
  divition: string;
  section: string;
  name: string;
  gender: string;
  dob: string;
  category: string;
  mobileNumber: string;
  email: string;
  admissionDate: string;
  bloodGroup: string;
  medicalHistory: string;
}

const StudentSchema = new Schema<IStudent>(
  {
    admissionNo: { type: String, required: true },
    rollNumber: { type: String, required: true },
    divition: { type: String, required: true },
    section: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    category: { type: String, required: false },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true },
    admissionDate: { type: String, required: false },
    bloodGroup: { type: String, required: false },
    medicalHistory: { type: String, required: false },
  },
  { timestamps: true }
);

export const Student = model<IStudent>("Student", StudentSchema);
