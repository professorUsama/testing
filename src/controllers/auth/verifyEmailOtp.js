import { Users } from "../../models/usersSchema.js";
import asyncErrorHandler from "express-async-handler";
const verifyEmail = asyncErrorHandler(async (req, res) => {
  const db = req.user;
  const { otp } = req.body;
  if (!otp) {
    res.status(400);
    throw new Error("Please provide the otp that you recevied in eamil", {
      cause: "otp required",
    });
  }
  if (db.emailVerified === true) {
    res.status(400);
    throw new Error("your email already verified", { cause: "authenticated" });
  }
  const currentTime = new Date().getTime();
  if (db.otpExpiry < currentTime) {
    res.status(400);
    throw new Error("your otp expired, please try again", {
      cause: "OTP expired",
    });
  }
  if (!(db.otp === otp)) {
    res.status(400);
    throw new Error("OTP verification failed...", { cause: "invalid OTP" });
  }

  const userUpdate = await Users.updateOne(
    { _id: db._id },
    {
      $set: {
        otp: null,
        otpExpiry: null,
        emailVerified: true,
      },
    }
  );
  if (!userUpdate) {
    res.status(400);
    throw new Error("verification not fulfiled", {
      cause: "authentication failed",
    });
  }
  res.status(200).json("email verification sucessfull");
});

export default verifyEmail;
