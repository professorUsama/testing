import bcrypt from "bcrypt";
import passwordValidation from "../../utils/passwordValidation.js";
import checkEmptyFields from "../../utils/checkEmptyFields.js";
import asyncErrorHandler from "express-async-handler";
import {
  EMAIL_REGEX,
  NAME_REGEX,
  PHONE_NUMBER_REGEX,
} from "../../constants/regex.js";
import { Users } from "../../models/usersSchema.js";
import generateUserOtp from "../../utils/otpGenerator.js";
import sendEmail from "../../config/sendOtpToEmail.js";
import verifyEmail from "./verifyEmailOtp.js";

const signUp = asyncErrorHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    age,
    address,
    password,
    confirmPassword,
  } = req.body;

  // console.log(`${passwordValidation.match(password, confirmPassword).error}`);
  if (!checkEmptyFields(req.body)) {
    res.status(400);
    throw new Error("some fields are empty", { cause: "validation error" });
  }

  if (passwordValidation.length(password) !== true) {
    res.status(400);
    throw new Error(`${passwordValidation.length(password).error}`, {
      cause: "validation error",
    });
  }
  if (passwordValidation.match(password, confirmPassword) !== true) {
    res.status(400);
    throw new Error(
      `${passwordValidation.match(password, confirmPassword).error}`,
      { cause: "validation error" }
    );
  }
  if (passwordValidation.strength(password) !== true) {
    res.status(400);
    throw new Error(`${passwordValidation.strength(password).error}`, {
      cause: "validation error",
    });
  }

  if (!email.match(EMAIL_REGEX)) {
    res.status(400);
    throw new Error("Please enter valid email", { cause: "Validation error" });
  }

  if (!phone.match(PHONE_NUMBER_REGEX)) {
    res.status(400);
    throw new Error("Please enter valid phone number", {
      cause: "validation error",
    });
  }

  if (!firstName.match(NAME_REGEX) || !lastName.match(NAME_REGEX)) {
    res.status(400);
    throw new Error("Please enter the valid name", {
      cause: "validation error",
    });
  }
  // generate hash password

  const otp = generateUserOtp();
  const otpExpiry = new Date().getTime() + 5 * 60 * 1000;
  const hashPassword = await bcrypt.hash(password, 10);

  const user = new Users({
    firstName,
    lastName,
    email,
    phone,
    age,
    otp,
    otpExpiry,
    address,
    password: hashPassword,
  });

  const checkExistingEmail = await Users.findOne({ email: email });
  const checkExistingPhoneNumber = await Users.findOne({ phone: phone });
  if (checkExistingEmail) {
    console.log("enter the check email");
    res.status(400);
    throw new Error("Email already exist", { cause: "validation error" });
  }

  if (checkExistingPhoneNumber) {
    res.status(400);
    throw new Error("Phone number already exist", {
      cause: "validation error",
    });
  }

  const userData = await user.save();
  if (!userData) {
    res.status(400);
    throw new Error("please enter the valid data", {
      cause: "validation error",
    });
  }

  await sendEmail(email, otp.toString());
  const userJwtToken = await user.generateAuthToken();
  console.log(userJwtToken);
  res.status(200).json(userData);
});

export default signUp;
