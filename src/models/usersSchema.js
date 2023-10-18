import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import ENV from "../config/keys.js";
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
    min: 18,
    max: 110,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    default: null
  },
  otpExpiry: {
    type: Number,
    default: null
  },
  emailVerified: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      {
        _id: this._id,
        email: this.email,
      },
      ENV.JWT_SECRET_KEY
    );
    return token;
  } catch (err) {
    console.log(`something wroing ${err}`);
  }
};

const Users = mongoose.model("users", userSchema);

export { Users, userSchema };
