import mongoose from "mongoose";

const labSchema = new mongoose.Schema({
  patientId: {
    type: String,
  },
  reportIssued: {
    type: String,
  },
  report: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  delivered: {
    type: Boolean,
    default: false,
  },
  pdfUrl: {
    type: String,
    default: "",
  },
});

const Lab = mongoose.model("Lab", labSchema);
export default Lab;
