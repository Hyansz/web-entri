import Category from "../models/Category.js";
import Product from "../models/Product.js";

// GET /api/categories
export const getCategories = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const skip = (page - 1) * limit;

        const filter = {
            deletedAt: null,
            name: { $regex: search, $options: "i" },
        };

        const categories = await Category.aggregate([
            { $match: filter },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "category",
                    as: "products",
                },
            },
            {
                $addFields: { count: { $size: "$products" } },
            },
            {
                $project: { products: 0 },
            },
            { $skip: skip },
            { $limit: limit },
        ]);

        const total = await Category.countDocuments(filter);

        res.json({
            data: categories,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /api/categories
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) return res.status(400).json({ message: "Nama wajib diisi" });

        const exists = await Category.findOne({
            name: { $regex: `^${name}$`, $options: "i" },
        });
        if (exists)
            return res.status(400).json({ message: "Kategori sudah ada" });

        const c = new Category({ name });
        await c.save();

        res.status(201).json(c);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUT /api/categories/:id
export const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "Nama wajib diisi" });

        const exists = await Category.findOne({
            _id: { $ne: req.params.id },
            name: { $regex: `^${name}$`, $options: "i" },
        });
        if (exists)
            return res.status(400).json({ message: "Nama kategori sudah ada" });

        const upd = await Category.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );
        res.json(upd);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE /api/categories/:id
export const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;

        const used = await Product.countDocuments({ category: id });
        if (used > 0) {
            return res.status(400).json({
                message: "Kategori masih digunakan produk!",
            });
        }

        await Category.findByIdAndUpdate(id, { deletedAt: new Date() });

        res.json({ message: "Kategori dihapus (soft delete)" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
