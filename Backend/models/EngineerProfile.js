import mongoose from "mongoose";

const engineerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    profilePhoto: {
      type: String,
    },
    experienceYears: {
      type: Number,
      required: true,
    },
    skills: [
      {
        type: String,
      },
    ],
    serviceCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceCategory",
      },
    ],
    districts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "District",
      },
    ],
    address: {
      type: String,
    },
    serviceRadiusKm: {
      type: Number,
      enum: [5, 10, 25, 50],
      default: 10,
    },
    status: {
      type: String,
      enum: ["PENDING_VERIFICATION", "APPROVED", "REJECTED", "SUSPENDED"],
      default: "PENDING_VERIFICATION",
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },
  },
  { timestamps: true }
);

// Crucial geospatial index for finding nearby engineers
engineerProfileSchema.index({ location: "2dsphere" });

const EngineerProfile = mongoose.model("EngineerProfile", engineerProfileSchema);
export default EngineerProfile;
