import { Router } from "express";
import { userdashauthcontroller } from "../controllers/userdashauthcontroller.mjs";

const router = Router();
router.get("/" , userdashauthcontroller )
export default router;