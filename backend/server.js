import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import emailRoutes from "./routes/email.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

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

app.use(express.json({ limit: "2mb" }));

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 300,
    })
);

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
app.use("/api", dashboardRoutes);
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

const blogs = [
    {
        id: 1,
        slug: "001",
        title_id: "Alkohol Antriseptik",
        title_en: "Antiseptic Alcohol",
        description_id:
            "Alkohol antiseptik IPA 5% dan BIT 6% hadir dalam ukuran 1 liter, 5 liter, 20 liter, dan 200 liter. Produk ini sangat cocok digunakan dalam industri kosmetik, sabun, parfum isi ulang, dan produk wewangian lainnya, membantu menjaga keamanan, kualitas, dan kestabilan produk.",
        description_en:
            "Antiseptic alcohol containing 5% IPA and 6% BIT is available in 1-liter, 5-liter, 20-liter, and 200-liter sizes. This product is highly suitable for use in the cosmetics, soap, refill perfume, and other fragrance industries, helping maintain product safety, quality, and stability.",
        thumbnail: "/img/artikel/001.webp",
        createdAt: "2025-10-01T10:00:00Z",
    },
    {
        id: 2,
        slug: "002",
        title_id: "N3 Gluco",
        title_en: "N3 Gluco",
        description_id:
            "Diabetes adalah penyakit kronis yang dapat merusak organ tubuh akibat kadar gula darah tinggi, dengan risiko utama meliputi penyakit jantung, stroke, gagal ginjal, kerusakan mata (kebutaan), dan penyakit saraf.",
        description_en:
            "Diabetes is a chronic disease that can damage body organs due to high blood sugar levels, with main risks including heart disease, stroke, kidney failure, eye damage (blindness), and nerve disorders.",
        thumbnail: "/img/artikel/002.webp",
        createdAt: "2025-10-28T15:30:00Z",
    },
];

app.get("/api/blogs", (req, res) => {
    if (!blogs.length) {
        return res.json({
            status: "empty",
            message: "Belum ada blog yang tersedia",
            blogs: [],
        });
    }

    res.json({
        status: "success",
        total: blogs.length,
        blogs,
    });
});

app.get("/api/blogs/:slug", (req, res) => {
    const { slug } = req.params;
    const filePath = path.join(__dirname, "blogs", `${slug}.html`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({
            status: "fail",
            message: "Blog tidak ditemukan",
        });
    }

    const htmlContent = fs.readFileSync(filePath, "utf-8");

    // cari metadata tambahan dari const blogs (judul, thumbnail, dll)
    const blogMeta = blogs.find((b) => b.slug === slug);

    res.json({
        status: "success",
        blog: {
            ...blogMeta,
            content: htmlContent,
        },
    });
});

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

app.use(express.static(path.join(__dirname, "../dist")));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

connectDB();

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, "0.0.0.0", () => {
//     console.log(`✅ Server running on port ${PORT}`);
// });
export default app;
