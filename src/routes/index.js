import auth from "./auth.js";
import express from "express";

const router = express.Router();

// use middleware auth
router.use("/auth", auth);

export default router;