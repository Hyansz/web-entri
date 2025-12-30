import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        excerpt: {
            type: String,
            required: true,
        },
        content: {
            type: String, // HTML dari editor
            required: true,
        },
        image: {
            type: String, // URL gambar (Cloudinary / upload Vercel)
        },
    },
    { timestamps: true }
);

export default mongoose.model("Post", postSchema);
