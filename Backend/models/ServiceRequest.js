import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    office: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Office",
    },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceCategory",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
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
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
    paymentAmount: {
      type: Number,
      required: true,
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      default: "MEDIUM",
    },
    status: {
      type: String,
      enum: [
        "OPEN",
        "ACCEPTED",
        "ENGINEER_ASSIGNED",
        "ENGINEER_REACHED",
        "IN_PROGRESS",
        "COMPLETED",
        "CUSTOMER_CONFIRMED",
        "PAYMENT_RELEASED",
        "CANCELLED",
        "REJECTED",
        "DISPUTED"
      ],
      default: "OPEN",
    },
    assignedEngineer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    attachments: [
      {
        type: String, // URLs to images/videos
      },
    ],
    beforeWorkPhotos: [
        { type: String }
    ],
    afterWorkPhotos: [
        { type: String }
    ],
    workNotes: {
        type: String
    },
    acceptedAt: { type: Date },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

// Geospatial index for requests
serviceRequestSchema.index({ location: "2dsphere" });

const ServiceRequest = mongoose.model("ServiceRequest", serviceRequestSchema);
export default ServiceRequest;
