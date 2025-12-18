import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        kemenkesNumber: { type: String },
        brand: { type: String },
        location: { type: String },
        specifications: { type: String },
        image: { type: String }, // "/uploads/filename.jpg"
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: false,
        },
    },
    { timestamps: true }
);

ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ name: "text" });
ProductSchema.index({ category: 1 });

export default mongoose.model("Product", ProductSchema);
