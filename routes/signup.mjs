import { Router } from "express";
import { registeruser } from "../controllers/signupcontroller.mjs";
const router = Router();

router.post("/", registeruser);

export default router;