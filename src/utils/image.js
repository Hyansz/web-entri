const API_BASE = import.meta.env.VITE_API_URL;

export const imageUrl = (image) => {
    if (!image) return "/img/no-image.png";

    // Cloudinary object
    if (typeof image === "object") {
        if (image.secure_url) return image.secure_url;
        if (image.url) return image.url;
        return "/img/no-image.png";
    }

    // String
    if (typeof image === "string") {
        if (image === "[object Object]") {
            return "/img/no-image.png";
        }

        // Cloudinary URL
        if (image.startsWith("http")) {
            return image;
        }

        // uploads lokal
        if (image.startsWith("/uploads")) {
            return `${API_BASE}${image}`;
        }

        // uploads tanpa slash
        if (image.startsWith("uploads")) {
            return `${API_BASE}/${image}`;
        }
    }

    return "/img/no-image.png";
};
