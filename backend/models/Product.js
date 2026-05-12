import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: {
            type: String,
            unique: true,
            index: true,
        },
        kemenkesType: {
            type: String,
            enum: ["AKD", "PKD"],
            default: "AKD",
        },
        kemenkesNumber: { type: String },
        brand: { type: String },
        location: { type: String },
        specifications: { type: String },
        image: {
            url: String,
            public_id: String,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: false,
        },
    },
    { timestamps: true },
);

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

ProductSchema.pre("save", function (next) {
    if (this.name && !this.slug) {
        this.slug = slugify(this.name);
    }
    next();
});

ProductSchema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();

    if (update.name) {
        update.slug = slugify(update.name);
    }

    next();
});

ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ name: "text" });
ProductSchema.index({ category: 1 });

export default mongoose.model("Product", ProductSchema);
