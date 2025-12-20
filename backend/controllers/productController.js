import Product from "../models/Product.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import ProductVersion from "../models/ProductVersion.js";

const bumpVersion = async () => {
    await ProductVersion.findOneAndUpdate(
        { key: "products" },
        { version: Date.now() },
        { upsert: true, new: true }
    );
};

export const getProducts = async (req, res, next) => {
    try {
        const isAdmin = !!req.admin;

        res.setHeader(
            "Cache-Control",
            isAdmin
                ? "no-store"
                : "public, s-maxage=300, stale-while-revalidate=60"
        );

        const query = req.cleanedQuery || req.query;
        let { page = 1, limit = 10, search = "", category = "" } = query;

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
        next(err);
    }
};

export const getAllProducts = async (req, res, next) => {
    try {
        const isAdmin = !!req.admin;

        res.setHeader(
            "Cache-Control",
            isAdmin
                ? "no-store"
                : "public, s-maxage=300, stale-while-revalidate=60"
        );

        const data = await Product.find({})
            .populate("category", "name")
            .sort({ createdAt: -1, _id: -1 });

        res.json({
            data,
            total: data.length,
        });
    } catch (err) {
        next(err);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        res.setHeader("Cache-Control", "no-store");

        const product = await Product.findById(req.params.id).populate(
            "category",
            "name"
        );

        if (!product) {
            return res.status(404).json({ message: "Not found" });
        }

        res.json(product);
    } catch (err) {
        next(err);
    }
};

/* =======================
   CREATE
======================= */
export const createProduct = async (req, res, next) => {
    try {
        const {
            name,
            kemenkesNumber,
            brand,
            location,
            specifications,
            category,
        } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Name required" });
        }

        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        const product = new Product({
            name,
            kemenkesNumber,
            brand,
            location,
            specifications,
            category: category || null,
            image: imagePath,
        });

        await product.save();
        await bumpVersion();

        res.status(201).json(product);
    } catch (err) {
        next(err);
    }
};

/* =======================
   UPDATE
======================= */
export const updateProduct = async (req, res, next) => {
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
        await bumpVersion();

        res.json(product);
    } catch (err) {
        next(err);
    }
};

/* =======================
   DELETE
======================= */
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Not found" });

        if (product.image) {
            const imagePath = path.join(
                process.cwd(),
                "public",
                product.image.replace(/^\/+/, "")
            );

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await product.deleteOne();
        await bumpVersion();

        res.json({ message: "Deleted successfully" });
    } catch (err) {
        next(err);
    }
};

/* =======================
   VERSION ENDPOINT
======================= */
export const getProductVersion = async (req, res) => {
    const latest = await Product.findOne({})
        .sort({ updatedAt: -1 })
        .select("updatedAt");

    res.json({
        version: latest?.updatedAt?.getTime() || 0,
    });
};