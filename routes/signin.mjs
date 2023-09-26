import { Router } from "express";
import { signinuser } from "../controllers/signincontrollers.mjs";
const router = Router();

router.post("/", signinuser);

export default router;