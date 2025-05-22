import { Router } from "express";
import { methods as Admin } from "../controllers/login.controller.mjs";

const router = Router();

router.post("/",Admin.getUserToken);

export default router;