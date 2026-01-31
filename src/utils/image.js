export const imageUrl = (image, base) => {
    if (!image) return "/img/no-image.png";

    // kalau image object dari API / cloudinary
    if (typeof image === "object") {
        if (image.url) return image.url;
        if (image.secure_url) return image.secure_url;
        return "/img/no-image.png";
    }

    if (typeof image === "string") {
        // cloudinary / external
        if (image.startsWith("http")) return image;

        // lokal upload
        return image.startsWith("/")
            ? `${base}${image}`
            : `${base}/${image}`;
    }

    return "/img/no-image.png";
};
