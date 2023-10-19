import asyncErrorHandler from "express-async-handler";
import { Users } from "../../models/usersSchema.js";
import sendEmail from "../../config/sendOtpToEmail.js";
import generateUserOtp from "../../utils/otpGenerator.js";
const resendEmailOtp = asyncErrorHandler(async (req, res) => {
  console.log("in the resend section");
  const db = req.user;
  if (db.emailVerified === true) {
    res.status(400);
    throw new Error("Your email already verified", {
      cause: "User already verified",
    });
  }

  console.log("before otp");
  const otp = generateUserOtp();
  const currentTime = new Date().getTime();
  const otpExpiry = new Date().getTime() + 5 * 60 * 1000;

  console.log(db.otpExpiry > currentTime);
  if (db.otpExpiry > currentTime) {
    res.status(400);
    throw new Error("your email otp did not expire", {
      cause: "OTP did't expire",
    });
  }
  console.log("before update");
  await Users.updateOne(
    { _id: db._id },
    {
      $set: {
        otp: otp,
        otpExpiry: otpExpiry,
      },
    }
  );
  await sendEmail(db.email, otp.toString());
  res.status(200).json("Your otp successfull resend");
});

export default resendEmailOtp;
