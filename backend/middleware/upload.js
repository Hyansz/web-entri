import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/uploads"));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const base = file.originalname.replace(ext, "").replace(/\s+/g, "-");
        cb(null, `${base}-${Date.now()}${ext}`);
    },
});

function fileFilter(req, file, cb) {
    if (/image\/(jpeg|png|jpg|webp)/.test(file.mimetype)) cb(null, true);
    else cb(new Error("Only images allowed"));
}

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter,
});
