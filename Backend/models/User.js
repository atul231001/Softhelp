import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "OFFICE", "ENGINEER"],
      default: "OFFICE",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // For office users
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
    },
    office: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Office",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
