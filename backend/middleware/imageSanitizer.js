import sharp from "sharp";
import fs from "fs";

export const sanitizeImage = async (req, res, next) => {
    if (!req.file) return next();

    const filePath = req.file.path;
    const buffer = await sharp(filePath)
        .resize({ width: 1200, withoutEnlargement: true })
        .toFormat("jpeg", { quality: 85 })
        .toBuffer();

    fs.writeFileSync(filePath, buffer);
    next();
};
