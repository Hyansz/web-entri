import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
    try {
        let { page = 1, limit = 10, search = "", category = "" } = req.query;

        page = Number(page);
        limit = Number(limit);

        const query = {
            ...(search && { name: { $regex: search, $options: "i" } }),
            ...(category && { category }),
        };

        const products = await Product.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1, _id: -1 })

        const total = await Product.countDocuments(query);

        res.json({
            data: products,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const product = new Product({
            ...req.body,
            image: req.file ? req.file.filename : null,
        });
        await product.save();
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updatedData = {
            ...req.body,
            image: req.file ? req.file.filename : req.body.image,
        };

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
