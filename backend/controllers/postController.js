import Post from "../models/Post.js";

// CREATE
export const createPost = async (req, res) => {
    const post = await Post.create(req.body);
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
