import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import { upload } from "../middleware/upload.js";

import {
    getCertifications,
    getAllCertifications,
    getCertificationById,
    createCertification,
    updateCertification,
    deleteCertification,
} from "../controllers/certificationController.js";

import {
    validateCreateCertification,
    validateCertificationId,
    validateGetCertifications,
} from "../middleware/validators/certificationValidator.js";

import { validate } from "../middleware/validate.js";
import { uploadLimiter } from "../middleware/rateLimiters.js";

const router = express.Router();

// ✅ IMPORTANT: letakkan sebelum /
router.get("/all", getAllCertifications);

router.get("/", validateGetCertifications, validate, getCertifications);

router.get("/", validateCertificationId, validate, getCertificationById);

router.post(
    "/",
    adminAuth,
    uploadLimiter,
    upload.single("image"),
    validateCreateCertification,
    validate,
    createCertification,
);

router.put(
    "/",
    adminAuth,
    uploadLimiter,
    upload.single("image"),
    validateCertificationId,
    validate,
    updateCertification,
);

router.delete(
    "/",
    adminAuth,
    validateCertificationId,
    validate,
    deleteCertification,
);

export default router;
