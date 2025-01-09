import express from "express";
import { getAdmins, editAdmins, deleteAdmins, getUserPerformance } from "../../controllers/admin/management.js";

const router = express.Router();

router.get("/admins", getAdmins);
router.post("/admins", editAdmins);
router.delete("/admins/:id", deleteAdmins);
router.get("/performance/:id", getUserPerformance);

export default router;
