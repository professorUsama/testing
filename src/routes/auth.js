import express from "express";
import signUp from "../controllers/auth/sign-up.js";
import signIn from "../controllers/auth/sign-in.js";
import verifyEmail from "../controllers/auth/verifyEmailOtp.js";
import tokenAuthorization from "../middleware/tokenAuthorization.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/emailverify", tokenAuthorization, verifyEmail);

export default router;
