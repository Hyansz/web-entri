import multer from "multer";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

const ALLOWED_EXT = [".jpg", ".jpeg", ".png", ".webp"];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/uploads"));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();

        // 🛡️ EXT CHECK
        if (!ALLOWED_EXT.includes(ext)) {
            return cb(new Error("Invalid image extension"));
        }

        // sanitize base name (tanpa ubah konsep awal)
        const base = path
            .basename(file.originalname, ext)
            .replace(/[^a-zA-Z0-9-_]/g, "-");

        const unique = crypto.randomBytes(6).toString("hex");

        cb(null, `${base}-${Date.now()}-${unique}${ext}`);
    },
});

function fileFilter(req, file, cb) {
    // 🛡️ MIME CHECK
    if (!ALLOWED_MIME.includes(file.mimetype)) {
        return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
}

export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB (TIDAK DIUBAH)
    },
    fileFilter,
});
