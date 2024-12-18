import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

// API FOR REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing Details" });
    }
    // VALIDATEING EMAIL
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Enter a valid Email" });
    }
    // VALIDATEING PASSWORD
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Enter a strong Password" });
    }

    // HASHING USER PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// API FOR USER LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid Credentials" });
    }

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// API TO GET USER PROFILE DATA
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");

    res.status(200).json({ success: true, userData });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

//API TO UPDATE USER PROFILE
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !address || !dob || !gender) {
      return res.status(400).json({ success: false, message: "Data Missing" });
    }

    await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender });

    // UPLOAD IMAGE TO CLOUDINARY
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.status(200).json({ success: true, message: "Profile Updated" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// API FOR BOOK APPIONTMENT
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.status(409).json({ success: false, message: "Doctor Not Available" });
    }

    let slots_booked = docData.slots_booked;

    // CHECKING FOR SLOT AVAILABLITY
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.status(409).json({ success: false, message: "Slot Not Available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }

    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      // slotDate,
      slotData: slotDate,
      date: Date.now(),
    }

    const newAppointment = new appointmentModel(appointmentData);

    await newAppointment.save();

    // SAVE NEW SLOTS DATA IN docData ||  Update doctor's slotsBooked
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.status(201).json({ success: true, message: "Appointment Booked" });

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }

}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment };