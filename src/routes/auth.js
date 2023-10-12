import express from "express";
import signUp from "../controllers/auth/sign-up.js";
import signIn from "../controllers/auth/sign-in.js"
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);



export default router;

