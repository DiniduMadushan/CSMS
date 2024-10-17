// models/XrayQueue.js
import mongoose from "mongoose";

// Define the schema for each item in the X-ray queue
const XrayQueueItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Xray", // Assuming you have a separate Xray model
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient", // Reference to the Patient model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the main X-ray Queue schema
const XrayQueueSchema = new mongoose.Schema({
  queue: {
    type: [XrayQueueItemSchema], // Array of XrayQueueItem objects
    required: true,
  },
});

// Create and export the X-ray Queue model
const XrayQueue = mongoose.model("XrayQueue", XrayQueueSchema);
export default XrayQueue;
