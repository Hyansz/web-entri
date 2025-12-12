import { Router } from "express";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

const router = Router();

router.get("/dashboard-counts", async (req, res) => {
    try {
        const categoryCount = await Category.countDocuments({
            deletedAt: null,
        });
        const productCount = await Product.countDocuments({}); // Sesuaikan jika ada soft delete juga

        res.json({
            success: true,
            productCount,
            categoryCount,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard data",
        });
    }
});

export default router;
