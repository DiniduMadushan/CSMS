import mongoose from "mongoose";

const AppointmentsSchema = new mongoose.Schema({
  patientId: {
    type: String,
  },
  dateIssuedBy: {
    type: String,
  },
  
  date: {
    type: Date
  }
 
});

const Appointment = mongoose.model("Appointment", AppointmentsSchema);
export default Appointment;
