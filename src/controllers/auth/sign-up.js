import bcrypt from "bcrypt";
import passwordValidation from "../../utils/passwordValidation.js";
import checkEmptyFields from "../../utils/checkEmptyFields.js";
import asyncErrorHandler from "express-async-handler";

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
    throw new Error("some fields are empty", {cause: "validation error"});
  }

  if (passwordValidation.length(password) !== true) {
    res.status(400);
    throw new Error("password must be at least 9 characters...", {cause: "validation error"});
  }
  if (passwordValidation.match(password, confirmPassword) !== true) {
    res.status(400);
    throw new Error("your password did'nt match...", {cause: "validation error"});
  }
  if (passwordValidation.strength(password) !== true) {
    res.status(400);
    throw new Error("entered password is too weak...", {cause: "validation error"});
  }
  // generate hash password

  const hashPassword = await bcrypt.hash(password, 10);

  res.status(200).json({ firstName, lastName, email, phone, age, address });
});

export default signUp;
