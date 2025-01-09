import express from "express";
import { getProducts, getCustomers, editCustomers, deleteCustomers, getTransactions, getGeography } from "../../controllers/admin/client.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.post("/customers", editCustomers);
router.delete("/customers/:id", deleteCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;
