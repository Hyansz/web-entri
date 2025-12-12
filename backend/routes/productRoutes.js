import express from "express";
import Product from "../models/Product.js";
import adminAuth from "../middleware/adminAuth.js";
import { upload } from "../middleware/upload.js";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

const router = express.Router();

/**
 * GET /api/products
 * queries: page, limit, search, category
 * returns { data: [...], pagination: {...} }
 */

// ✅ GET all products (NO pagination) - for homepage / swiper
router.get("/all", async (req, res) => {
    try {
        const data = await Product.find({})
            .populate("category", "name")
            .sort({ createdAt: -1, _id: -1 });

        res.json({
            data,
            total: data.length,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        let { page = 1, limit = 10, search = "", category = "" } = req.query;
        page = Math.max(1, parseInt(page));
        limit = Math.max(1, parseInt(limit));

        const filter = {};
        if (search) filter.name = { $regex: search, $options: "i" };
        if (category && mongoose.Types.ObjectId.isValid(category)) {
            filter.category = new mongoose.Types.ObjectId(category);
        }

        const total = await Product.countDocuments(filter);
        const data = await Product.find(filter)
            .populate("category", "name")
            .sort({ createdAt: -1, _id: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            data,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get single
router.get("/:id", async (req, res) => {
    try {
        const p = await Product.findById(req.params.id).populate(
            "category",
            "name"
        );
        if (!p) return res.status(404).json({ message: "Not found" });
        res.json(p);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// create (admin) - multipart/form-data with field 'image'
router.post("/", adminAuth, upload.single("image"), async (req, res) => {
    try {
        const {
            name,
            kemenkesNumber,
            brand,
            location,
            specifications,
            category,
        } = req.body;
        if (!name) return res.status(400).json({ message: "Name required" });

        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        const product = new Product({
            name,
            kemenkesNumber,
            brand,
            location,
            specifications,
            category: category || null, // 💥 Fix here
            image: imagePath,
        });
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// update (admin)
router.put("/:id", adminAuth, upload.single("image"), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Not found" });

        const fields = [
            "name",
            "kemenkesNumber",
            "brand",
            "location",
            "specifications",
            "category",
        ];
        fields.forEach((f) => {
            if (req.body[f] !== undefined) product[f] = req.body[f];
        });

        if (req.file) product.image = `/uploads/${req.file.filename}`;

        await product.save();
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// delete (admin)
router.delete("/:id", adminAuth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Not found" });

        // --- Hapus file gambar jika ada ---
        if (product.image) {
            const imagePath = path.join(process.cwd(), "public", product.image);

            // Untuk windows/Linux path tetap aman
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await product.deleteOne();

        res.json({ message: "Deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

export default router;
