import mongoose from "mongoose";

const ProductVersionSchema = new mongoose.Schema({
    key: {
        type: String,
        default: "products",
        unique: true,
    },
    version: {
        type: Number,
        required: true,
    },
});

export default mongoose.model("ProductVersion", ProductVersionSchema);
