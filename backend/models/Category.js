import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    deletedAt: { type: Date, default: null }
}, { timestamps: true });

export default mongoose.model("Category", CategorySchema, "categories");
