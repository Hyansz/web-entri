// utils/image.js
export function imageUrl(image, ASSET_URL) {
    if (!image) return "/img/no-image.png";

    // 🔥 kalau dari cloudinary (object)
    if (typeof image === "object" && image.url) {
        return image.url;
    }

    // 🔹 kalau sudah URL penuh
    if (typeof image === "string" && image.startsWith("http")) {
        return image;
    }

    // 🔹 kalau path lokal
    return `${ASSET_URL}${image}`;
}
