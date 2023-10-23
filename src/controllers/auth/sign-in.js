import asyncErrorHandler from "express-async-handler";
import checkEmptyFields from "../../utils/checkEmptyFields.js";
import { Users } from "../../models/usersSchema.js";
import bcrypt from "bcrypt";
import { EMAIL_REGEX } from "../../constants/regex.js";
import generateUserOtp from "../../utils/otpGenerator.js";
import sendEmail from "../../config/sendOtpToEmail.js";
import verifyEmail from "./verifyEmailOtp.js";
const signIn = asyncErrorHandler(async (req, res) => {
  if (!checkEmptyFields(req.body)) {
    res.status(400);
    throw new Error("all fields are mandatory", { cause: "empty fields" });
  }

  if (!email.match(EMAIL_REGEX)) {
    res.status(400);
    throw new Error("Please enter valid email", { cause: "Validation error" });
  }

  //   const fetchUserData = await Users.aggregate([
  //     {
  //       $match: {
  //         email,
  //       },
  //     },
  //     {
  //       $project: {
  //         email: 1,
  //         password: 1,
  //       },
  //     },
  //   ]);
  const user = await Users.findOne({ email: email });
  // console.log(user);
  if (!user) {
    res.status(400);
    throw new Error("According to the email, you are not registered", {
      cause: "user not found",
    });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(400);
    throw new Error("your password is incorrect, please try again...", {
      cause: "incorrect password",
    });
  }

  const otp = generateUserOtp();
  const otpExpiry = new Date().getTime() + 5 * 60 * 1000;
  const updateUserDetails = await Users.updateOne(
    { _id: user._id },
    {
      $set: {
        otp: otp,
        otpExpiry: otpExpiry,
        emailVerified: false,
      },
    }
  );

  if (!updateUserDetails) {
    res.status(400);
    throw new Error("invalid information", { cause: "user not found" });
  }

  await sendEmail(email, otp.toString());
  const userJwtToken = await user.generateAuthToken();
  console.log(userJwtToken);
  res.status(200).json("Login successfull");
});

export default signIn;
