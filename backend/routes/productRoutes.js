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
    getProductVersion,
} from "../controllers/productController.js";
import { sanitizeImage } from "../middleware/imageSanitizer.js";
import {
    validateCreateProduct,
    validateGetProducts,
    validateProductId,
} from "../middleware/validators/productValidator.js";
import { validate } from "../middleware/validate.js";
import { uploadLimiter } from "../middleware/rateLimiters.js";

const router = express.Router();

router.get("/version", getProductVersion);

router.get("/", validateGetProducts, validate, getProducts);
router.get("/all", getAllProducts);
router.get("/:id", validateProductId, validate, getProductById);

router.post(
    "/",
    adminAuth,
    uploadLimiter,
    upload.single("image"),
    sanitizeImage,
    validateCreateProduct,
    validate,
    createProduct
);

router.put(
    "/:id",
    adminAuth,
    uploadLimiter,
    upload.single("image"),
    sanitizeImage,
    validateProductId,
    validate,
    updateProduct
);
router.delete("/:id", adminAuth, validateProductId, validate, deleteProduct);

export default router;
