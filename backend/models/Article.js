import mongoose from "mongoose";
import slugify from "slugify";

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    thumbnail: { type: String },
    createdAt: { type: Date, default: Date.now },
});

ArticleSchema.pre("validate", function (next) {
    if (this.title)
        this.slug = slugify(this.title, { lower: true, strict: true });
    next();
});

export default mongoose.model("Article", ArticleSchema);
