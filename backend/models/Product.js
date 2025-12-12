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

export default mongoose.model("Product", ProductSchema);
