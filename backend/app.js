import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { fileURLToPath } from "url";
import path from "path";

import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import umamiRoutes from "./routes/umami.js";
import emailRoutes from "./routes/email.js";
import mongoSanitize from "mongo-sanitize";
import { publicLimiter, adminLimiter } from "./middleware/rateLimiters.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

app.use(
    helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
    })
);

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://web-entri.vercel.app",
            "https://entrijayamakmur.co.id",
            "https://www.entrijayamakmur.co.id",
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use((req, res, next) => {
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "0");
    next();
});

app.use(express.json({ limit: "2mb" }));

app.use((req, res, next) => {
    if (req.body) {
        req.body = mongoSanitize(req.body);
    }

    if (req.params) {
        req.params = mongoSanitize(req.params);
    }

    if (req.query) {
        req.cleanedQuery = mongoSanitize(req.query);
    }

    next();
});

app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
});

app.use("/api/products2/version", (req, res, next) => next());

app.use("/api", publicLimiter);
app.use("/api/admin", adminLimiter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
    "/uploads",
    (req, res, next) => {
        res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
        next();
    },
    express.static(path.join(__dirname, "public/uploads"))
);

app.use("/api/admin", adminRoutes);
app.use("/api/products2", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/posts", postRoutes);
app.use("/api", dashboardRoutes);
app.use("/api/analytics", umamiRoutes);
app.use("/", emailRoutes);

const videos = [
    {
        _id: "1",
        title_id: "Apa Itu Diabetes?",
        title_en: "What is Diabates",
        videoId: "fwN6EMQuVfU",
        description_id: "Simak pengertian dari diabetes lebih lengkap",
        description_en:
            "Learn more about the definition of diabetes in detail.",
    },
    {
        _id: "2",
        title_id: "Mengapa Pilih N3 Gluco",
        title_en: "Why Choose N3 Gluco",
        videoId: "8DWUlpkHMtI",
        description_id:
            "Menghasilkan Akurasi Tinggi, Hasil Cepat, Mudah Digunakan, DLL",
        description_en:
            "Delivers High Accuracy, Fast Results, Easy to Use, and More",
    },
    {
        _id: "3",
        title_id: "Cara Penggunaan Produk N3 Gluco",
        title_en: "How To Use N3 Gluco",
        videoId: "Efyfmk2Xjbs",
        description_id:
            "Panduan lengkap penggunaan produk secara aman dan efisien.",
        description_en:
            "A complete guide to using the product safely and efficiently.",
    },
    {
        _id: "4",
        title_id: "Pusat Supply Alkohol Antiseptik",
        title_en: "How To Use N3 Gluco",
        videoId: "sI_kjrHiNQU",
        description_id:
            "Pusat supply alkohol antiseptik harga pabrik dijamin murah",
        description_en:
            "The leading supplier of antiseptic alcohol at factory prices — guaranteed affordable.",
    },
];

// videos
app.get("/api/videos", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    if (!videos || videos.length === 0) {
        return res.json({
            status: "empty",
            message: "Belum ada video yang tersedia",
            total: 0,
            videos: [],
        });
    }

    const paginatedVideos = videos.slice(startIndex, endIndex);

    res.json({
        status: "success",
        total: videos.length,
        page,
        limit,
        videos: paginatedVideos,
    });
});

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, "0.0.0.0", () => {
//     console.log(`✅ Server running on port ${PORT}`);
// });
export default app;
