import { Router } from "express";
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = Router();

router.post("/products", createProduct);

router.get("/products", getProducts);

router.get("/products/:id", getProduct);

router.patch("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

export default router;
