import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

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
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export { registerUser, loginUser };