import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "jury" },
    jury_number: { type: String, default: "1" },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;