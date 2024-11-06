import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";

// API FOR ADDING DOCTOR
// const addDoctor = async (req, res) => {
//   try {
//     const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
//     const imageFile = req.file;

//     // cheking for all data to add doctor
//     if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
//       return res.json({ success: false, message: "Missing Details" });
//     }

//     // validating email format
//     if (!validator.isEmail(email)) {
//       return res.json({ success: false, message: "Please enter a valid email" });
//     }

//     // validating strong password
//     if (password.length < 6) {
//       return res.json({ success: false, message: "Please enter a strong password" });
//     }

//     // hashing doctor password 
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // upload image to cloudinary
//     const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
//     const imageUrl = imageUpload.secure_url;

//     const doctorData = {
//       name,
//       email,
//       image: imageUrl,
//       password: hashedPassword,
//       speciality,
//       degree,
//       experience,
//       about,
//       fees,
//       address: JSON.parse(address),
//       date: Date.now(),
//     }

//     const newDoctor = new doctorModel(doctorData);
//     await newDoctor.save();

//     res.json({ success: true, message: "Doctor Added" });

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// }

const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    // cheking for all data to add doctor
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Validate strong password
    if (password.length < 6) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    // Check if image is uploaded
    if (!imageFile) {
      return res.json({ success: false, message: "Image file is missing" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    let imageUrl;
    try {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      imageUrl = imageUpload.secure_url;
    } catch (uploadError) {
      return res.json({ success: false, message: "Image upload failed: " + uploadError.message });
    }

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor Added" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addDoctor };