export const imageUrl = (image, base) => {
    if (!image) return "/img/no-image.png";

    // cloudinary object
    if (typeof image === "object" && image.url) {
        return image.url;
    }

    // cloudinary string
    if (typeof image === "string" && image.startsWith("http")) {
        return image;
    }

    // 🚫 BLOCK LOCAL IMAGE DI PRODUCTION
    if (import.meta.env.PROD) {
        return "/img/no-image.png";
    }

    // lokal dev only
    return image.startsWith("/")
        ? `${base}${image}`
        : `${base}/${image}`;
};
