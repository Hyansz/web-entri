export const imageUrl = (image, base) => {
    if (!image) return "/img/no-image.png";

    // Cloudinary object
    if (typeof image === "object") {
        if (image.secure_url) return image.secure_url;
        if (image.url) return image.url;

        // fallback kalau nested
        if (image.image?.secure_url) return image.image.secure_url;
        if (image.image?.url) return image.image.url;

        return "/img/no-image.png";
    }

    // String path / URL
    if (typeof image === "string") {
        if (image.startsWith("http")) return image;
        if (!base) return image;
        if (image.startsWith("/")) return `${base}${image}`;
        return `${base}/${image}`;
    }

    return "/img/no-image.png";
};
