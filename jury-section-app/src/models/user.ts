import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  password: string;
  role: string;
  jury_number: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, required: true },
  jury_number: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;