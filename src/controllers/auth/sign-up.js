import bcrypt from "bcrypt";
import passwordValidation from "../../utils/passwordValidation.js";
import checkEmptyFields from "../../utils/checkEmptyFields.js";
import asyncErrorHandler from "express-async-handler";
import { EMAIL_REGEX, NAME_REGEX, PHONE_NUMBER_REGEX } from "../../constants/regex.js";

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
    throw new Error(`${passwordValidation.length(password).error}`, {cause: "validation error"});
  }
  if (passwordValidation.match(password, confirmPassword) !== true) {
    res.status(400);
    throw new Error(`${passwordValidation.match(password, confirmPassword).error}`, {cause: "validation error"});
  }
  if (passwordValidation.strength(password) !== true) {
    res.status(400);
    throw new Error(`${passwordValidation.strength(password).error}`, {cause: "validation error"});
  }

  if(!email.match(EMAIL_REGEX)){
    res.status(400);
    throw new Error("Please enter valid email", {cause: "Validation error"});
  }

  if(!phone.match(PHONE_NUMBER_REGEX)){
    res.status(400);
    throw new Error("Please enter valid phone number", {cause: "validation error"});
  }

  if(!firstName.match(NAME_REGEX) || !lastName.match(NAME_REGEX)){
    res.status(400);
    throw new Error("Please enter the valid name", {cause: "validation error"});
  }
  // generate hash password

  const hashPassword = await bcrypt.hash(password, 10);

  res.status(200).json({ firstName, lastName, email, phone, age, address });
});

export default signUp;
