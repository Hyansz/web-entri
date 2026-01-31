export const imageUrl = (image, base) => {
    console.log("IMAGE RAW:", image);

    if (!image) return "/img/no-image.png";

    // kalau API ngirim string tapi isinya [object Object]
    if (typeof image === "string" && image === "[object Object]") {
        return "/img/no-image.png";
    }

    // kalau object cloudinary
    if (typeof image === "object") {
        if (image.secure_url) return image.secure_url;
        if (image.url) return image.url;
        return "/img/no-image.png";
    }

    // kalau string URL
    if (typeof image === "string") {
        if (image.startsWith("http")) return image;

        // lokal upload
        return image.startsWith("/")
            ? `${base}${image}`
            : `${base}/${image}`;
    }

    return "/img/no-image.png";
};
