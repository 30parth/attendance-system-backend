import { Document, Schema, Model } from "mongoose";

export interface ISubject extends Document {
  name: string;
  code: string;
  divitionId: string;
}

const SubjectSchema = new Schema<ISubject>({
  name: { type: String, required: true },
});
