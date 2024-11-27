import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, minlength: 5 },
    password: { type: String, required: true },
    role: { type: String, enum: ["jury", "admin"], default: "jury" },
    jury_number: { type: String, default: "1" },
  },
  { timestamps: true } // Menambahkan createdAt dan updatedAt
);

const User = models.User || model("User", userSchema);

export default User;