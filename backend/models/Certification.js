import mongoose from "mongoose";

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

const CertificationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            unique: true,
            index: true,
        },

        description: {
            type: String,
            default: "",
        },

        image: {
            url: String,
            public_id: String,
        },

        order: {
            type: Number,
            default: 0,
        },

        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);

// ✅ FIX: slug update saat title berubah
CertificationSchema.pre("save", async function () {
    if (this.isModified("title")) {
        this.slug = slugify(this.title);
    }
});

CertificationSchema.index({ createdAt: -1 });
CertificationSchema.index({ title: "text" });
CertificationSchema.index({ active: 1 });
CertificationSchema.index({ order: 1 });

export default mongoose.model("Certification", CertificationSchema);
