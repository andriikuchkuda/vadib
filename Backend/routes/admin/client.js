import express from "express";
import { getProducts, getCustomers, editCustomers, getTransactions, getGeography } from "../../controllers/admin/client.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.post("/customers", editCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;
