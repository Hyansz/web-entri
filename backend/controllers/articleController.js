import Article from "../models/Article.js";
import { v2 as cloudinary } from "cloudinary";
import slugify from "slugify";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getArticles = async (req, res) => {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
};

export const getArticle = async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
};

export const createArticle = async (req, res) => {
    const { title, description, content, thumbnail } = req.body;

    let uploadedThumbnail;
    if (thumbnail) {
        const result = await cloudinary.uploader.upload(thumbnail, {
            folder: "articles",
        });
        uploadedThumbnail = result.secure_url;
    }

    const article = new Article({
        title,
        description,
        content,
        thumbnail: uploadedThumbnail,
    });

    await article.save();
    res.status(201).json(article);
};

export const updateArticle = async (req, res) => {
    const { title, description, content, thumbnail } = req.body;
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    if (title) article.title = title;
    if (description) article.description = description;
    if (content) article.content = content;

    if (thumbnail) {
        const result = await cloudinary.uploader.upload(thumbnail, {
            folder: "articles",
        });
        article.thumbnail = result.secure_url;
    }

    await article.save();
    res.json(article);
};

export const deleteArticle = async (req, res) => {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    await article.remove();
    res.json({ message: "Article deleted" });
};
