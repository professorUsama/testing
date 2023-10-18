// import { Users } from "../models/usersSchema";
import ENV from ".././config/keys.js";
import jwt from "jsonwebtoken";
import asyncErrorHandler from "express-async-handler";
import { Users } from "../models/usersSchema.js";

const tokenAuthorization = asyncErrorHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(400);
    throw new Error("Please enter the valid token to verify the email", {
      cause: "Token required",
    });
  }
  const token = authorization.split(" ")[1];
  let jwtVerifiedData; // store the decoded data from the jwt.verify
  jwt.verify(token, ENV.JWT_SECRET_KEY, (error, decodedData) => {
    if (error) {
      res.status(400);
      throw new Error("verfication failed", { cause: "invalid token" });
    }
    jwtVerifiedData = decodedData;
  });
  const validUser = await Users.findOne({
    _id: jwtVerifiedData._id,
    email: jwtVerifiedData.email,
  });

  if (!validUser) {
    console.log("failed");
    res.status(400);
    throw new Error("user not found", { cause: "Access denied" });
  }

  req.user = validUser;
  next();
});

export default tokenAuthorization;
