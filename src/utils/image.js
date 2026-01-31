export const imageUrl = (image, base) => {
    if (!image) return "/img/no-image.png";

    // 🔹 Cloudinary object
    if (typeof image === "object") {
        if (image.url) return image.url;
        if (image.secure_url) return image.secure_url;
        if (image.path) return image.path;
    }

    // 🔹 String URL
    if (typeof image === "string") {
        if (image.startsWith("http")) return image;

        if (!base) return image;

        if (image.startsWith("/")) return `${base}${image}`;

        return `${base}/${image}`;
    }

    return "/img/no-image.png";
};
