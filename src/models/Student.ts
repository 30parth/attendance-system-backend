import { Document, Schema, model } from "mongoose";

export interface IStudent extends Document {
  admissionNo: string;
  rollNumber: string;
  divition: string;
  section: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  category: string;
  mobileNumber: string;
  email: string;
  admissionDate: string;
  bloodGroup: string;
  medicalHistory: string;
}

const StudentSchema = new Schema<IStudent>({
  admissionNo: { type: String, required: true },
  rollNumber: { type: String, required: true },
  divition: { type: String, required: false },
  section: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  gender: { type: String, required: true },
  dob: { type: String },
  category: { type: String },
  mobileNumber: { type: String, required: true },
  email: { type: String },
  admissionDate: { type: String, required: false },
  bloodGroup: { type: String },
  medicalHistory: { type: String },
});

export const Student = model<IStudent>("Student", StudentSchema);
