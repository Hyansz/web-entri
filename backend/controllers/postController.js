import cloudinary from "../config/cloudinary.js";
import Post from "../models/Post.js";

// CREATE
export const createPost = async (req, res) => {
    let imageUrl = "";

    if (req.file) {
        const result = await cloudinary.uploader.upload(
            `data:image/png;base64,${req.file.buffer.toString("base64")}`
        );
        imageUrl = result.secure_url;
    }

    const post = await Post.create({
        title: req.body.title,
        excerpt: req.body.excerpt,
        content: req.body.content,
        image: imageUrl,
    });

    res.status(201).json(post);
};

// READ + SEARCH + PAGINATION
export const getPosts = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = 5;
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
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(post);
};

// DELETE
export const deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
};
