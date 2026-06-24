import { body, param, query } from "express-validator";

export const validateGetCertifications = [
    query("page").optional().isInt({ min: 1 }),

    query("limit").optional().isInt({ min: 1, max: 100 }),

    query("search").optional().trim(),
];

export const validateCertificationId = [param("id").isMongoId()];

export const validateCreateCertification = [
    body("title").trim().notEmpty().withMessage("Title wajib diisi"),

    body("description").optional().trim(),

    body("order").optional().isInt({ min: 0 }),

    body("active").optional().isBoolean(),
];
