import { body, query, param } from "express-validator";

export const validateGetProducts = [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("search").optional().isString().trim().escape(),
    query("category").optional().isMongoId(),
];

export const validateProductId = [
    param("id").isMongoId(),
];

export const validateCreateProduct = [
    body("name").isString().trim().notEmpty(),
    body("kemenkesNumber").optional().isString().trim(),
    body("brand").optional().isString().trim(),
    body("location").optional().isString().trim(),
    body("specifications").optional().isString().trim(),
    body("category").optional().isMongoId(),
];
