export const imageUrl = (image, base) => {
    if (!image) return "/img/no-image.png";

    if (typeof image === "object" && image.url) {
        return image.url;
    }

    if (typeof image === "string") {
        // external (Cloudinary, CDN, dll)
        if (image.startsWith("http")) return image;

        // normalize slash
        if (image.startsWith("/")) {
            return `${base}${image}`;
        }

        return `${base}/${image}`;
    }

    return "/img/no-image.png";
};
