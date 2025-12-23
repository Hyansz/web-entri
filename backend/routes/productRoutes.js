import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import { upload } from "../middleware/upload.js";
import {
    getProducts,
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";
import {
    validateCreateProduct,
    validateGetProducts,
    validateProductId,
} from "../middleware/validators/productValidator.js";
import { validate } from "../middleware/validate.js";
import { uploadLimiter } from "../middleware/rateLimiters.js";

const router = express.Router();

router.get("/", validateGetProducts, validate, getProducts);
router.get("/all", getAllProducts);
router.get("/:id", validateProductId, validate, getProductById);

router.post(
    "/",
    adminAuth,
    uploadLimiter,
    upload.single("image"),
    validateCreateProduct,
    validate,
    createProduct
);

router.put(
    "/:id",
    adminAuth,
    uploadLimiter,
    upload.single("image"),
    validateProductId,
    validate,
    updateProduct
);
router.delete("/:id", adminAuth, validateProductId, validate, deleteProduct);

export default router;
