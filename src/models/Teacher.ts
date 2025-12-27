import { Document, model, Schema } from "mongoose";

export interface ITeacher extends Document {
  staffId: string;
  role: string;
  name: string;
  fatherName: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  dateOfJoining: string;
  phone: string;
  address: string;
  qualification: string;
  workExperience: string;
  note: string;
  panNumber: string;
}

const TeacherSchema = new Schema<ITeacher>(
  {
    staffId: { type: String, required: true },
    role: { type: String, required: true },
    name: { type: String, required: true },
    fatherName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    dateOfJoining: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: false },
    qualification: { type: String, required: false },
    workExperience: { type: String, required: false },
    note: { type: String, required: false },
    panNumber: { type: String, required: false },
  },
  { timestamps: true }
);

export const Teacher = model<ITeacher>("Teacher", TeacherSchema);
