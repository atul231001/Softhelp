import mongoose from "mongoose";

const officeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

officeSchema.index({ location: "2dsphere" });

const Office = mongoose.model("Office", officeSchema);
export default Office;
