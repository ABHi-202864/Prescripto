import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

// API FOR DOCTOR AVAILABLITY
const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
    res.json({ success: true, message: "Availablity Changed" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// API FOR ALL DOCTOR LIST
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

// API FOR DOCTOR LOGIN
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

      res.json({ success: true, token });

    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

// API TO GET DOCTOR APPOINTMENTS FOR DOCTOR PANEL
const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    res.json({ success: true, appointments });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

// API TO MARK APPOINTMENT COMPLETED FOR DOCTOR PANEl
const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });

      return res.json({ success: true, message: "Appointment Completed" });

    } else {
      return res.json({ success: false, message: "Mark Failed" });
    }

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

// API TO CANCEL APPOINTMENT FOR DOCTOR PANEl
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

      return res.json({ success: true, message: "Appointment Completed" });

    } else {
      return res.json({ success: false, message: "Cancellation Failed" });
    }

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export { changeAvailablity, doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel };