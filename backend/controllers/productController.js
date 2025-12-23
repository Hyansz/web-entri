import Product from "../models/Product.js";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";

export const getProducts = async (req, res, next) => {
    try {
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

        const image = req.file
            ? {
                  url: req.file.path,
                  public_id: req.file.filename,
              }
            : null;

        const product = new Product({
            name,
            kemenkesNumber,
            brand,
            location,
            specifications,
            category: category || null,
            image,
        });

        await product.save();

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
        if (!product) {
            return res.status(404).json({ message: "Not found" });
        }

        const fields = [
            "name",
            "kemenkesNumber",
            "brand",
            "location",
            "specifications",
            "category",
        ];

        fields.forEach((field) => {
            if (req.body[field] !== undefined) {
                product[field] = req.body[field];
            }
        });

        /* ===============================
           ❌ REMOVE IMAGE (DARI FRONTEND)
        =============================== */
        if (req.body.removeImage === "true") {
            if (product.image?.public_id) {
                await cloudinary.uploader.destroy(product.image.public_id);
            }

            product.image = null;
        }

        /* ===============================
           🔥 JIKA ADA IMAGE BARU
        =============================== */
        if (req.file) {
            // hapus image lama dulu
            if (product.image?.public_id) {
                await cloudinary.uploader.destroy(product.image.public_id);
            }

            product.image = {
                url: req.file.path,
                public_id: req.file.filename,
            };
        }

        await product.save();

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
        if (!product) {
            return res.status(404).json({ message: "Not found" });
        }

        if (product.image?.public_id) {
            await cloudinary.uploader.destroy(product.image.public_id);
        }

        await product.deleteOne();

        res.json({ message: "Deleted successfully" });
    } catch (err) {
        next(err);
    }
};
