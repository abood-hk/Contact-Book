import mongoose, { Schema, Document } from 'mongoose';
export interface IContact extends Document {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
      minlength: 10,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
const contactModel = mongoose.model<IContact>('contacts', contactSchema);
export default contactModel;
