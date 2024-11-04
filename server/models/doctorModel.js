import mongoose, { Schema, model } from "mongoose";

const doctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  slots_booked: {
    type: Object,
    default: {},
  }
}, { minimize: false });

export default doctorModel = model.doctor || model("doctor", doctorSchema);