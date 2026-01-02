// import cloudinary from "../config/cloudinary.js";
import Post from "../models/Post.js";

// CREATE
export const createPost = async (req, res) => {
    try {
        let imageUrl = "";
        if (req.file) {
            imageUrl = req.file.path; // sudah Cloudinary URL
        }

        const post = await Post.create({
            title: req.body.title,
            excerpt: req.body.excerpt,
            content: req.body.content,
            image: imageUrl,
        });

        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// READ + SEARCH + PAGINATION
export const getPosts = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = 6;
    const search = req.query.search || "";

    const query = {
        title: { $regex: search, $options: "i" },
    };

    const posts = await Post.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

    const total = await Post.countDocuments(query);

    res.json({ posts, total, page });
};

// DETAIL
export const getPostById = async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.json(post);
};

// UPDATE
export const updatePost = async (req, res) => {
    try {
        const updateData = {
            title: req.body.title,
            excerpt: req.body.excerpt,
            content: req.body.content,
        };

        // kalau upload gambar baru
        if (req.file) {
            updateData.image = req.file.path; // Cloudinary URL
        }

        const post = await Post.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// DELETE
export const deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
};
