import express from "express";
import {    
    showUsernames,
    doLogin,
    doRegister, 
    getProducts,
    addProduct,
    editProduct,
    getProductById,
    deleteProduct
} from "../controllers/Controller.js";

// Import the new middleware
import { verifyToken, requireRole } from "../middleware/AuthMiddleware.js";

const router = express.Router();

// --- PUBLIC ROUTES (No Token Needed) ---
router.post("/register", doRegister);
router.post("/login", doLogin);

// --- PROTECTED ROUTES (Token Required) ---
// Everyone logged in can see products
router.get("/products", verifyToken, getProducts);
router.get("/product/:id", verifyToken, getProductById);
router.get("/usernames", verifyToken, showUsernames);

// --- ADMIN ROUTES (Optional: Specific Role Required) ---
// Example: Only allow 'admin' to add/edit/delete
// If you don't have roles set up yet, just use `verifyToken`
router.post("/add-product", verifyToken, addProduct);
router.put("/edit-product/:id", verifyToken, editProduct);
router.delete("/delete-product/:id", verifyToken, deleteProduct);

export default router;