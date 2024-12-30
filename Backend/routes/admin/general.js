import express from "express";
import { getUser, editProfile, getDashboardStats } from "../../controllers/admin/general.js";

const router = express.Router();

router.get("/user/:id", getUser);
router.post("/user", editProfile);
router.get("/dashboard", getDashboardStats);

export default router;
