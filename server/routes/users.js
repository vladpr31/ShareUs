import express from "express";

import { signIn, signUp } from "../controllers/users.js";

//routes for signin signup
const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);

export default router;
