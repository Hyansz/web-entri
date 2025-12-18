import { Router } from "express";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

const router = Router();

router.get("/dashboard-counts", async (req, res, next) => {
    try {
        const categoryCount = await Category.countDocuments({
            deletedAt: null,
        });

        const productCount = await Product.estimatedDocumentCount();

        res.json({
            success: true,
            productCount,
            categoryCount,
        });
    } catch (err) {
        next(err);
    }
});

export default router;
