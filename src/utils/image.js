export const imageUrl = (image, base) => {
    if (!image) return "/img/no-image.png";

    // 🔹 Format BARU (Cloudinary object)
    if (typeof image === "object" && image.url) {
        return image.url;
    }

    // 🔹 Format string
    if (typeof image === "string") {
        // cloudinary / external
        if (image.startsWith("http")) return image;

        // lokal upload (lama)
        if (!base) return "/img/no-image.png";

        return image.startsWith("/")
            ? `${base}${image}`
            : `${base}/${image}`;
    }

    return "/img/no-image.png";
};
