// models/Queue.js
import mongoose from "mongoose";

// Define the schema for each item in the queue array
const QueueItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patients",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the main Queue schema
const QueueSchema = new mongoose.Schema({
  queue: {
    type: [QueueItemSchema], // Array of QueueItem objects
    required: true,
  },
});

// Create and export the Queue model
const Queue = mongoose.model("Queue", QueueSchema);
export default Queue;
