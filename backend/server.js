import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import fs from "fs";
import { fileURLToPath } from "url";
import multer from "multer";
import path from "path";
import { Resend } from "resend";

import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({ windowMs: 1000 * 60, max: 200 });
app.use(limiter);

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

const resend = new Resend(process.env.RESEND_API_KEY);

const uploadDir = path.join(__dirname, "public/uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const base = file.originalname.replace(ext, "").replace(/\s+/g, "-");
        cb(null, `${base}-${Date.now()}${ext}`);
    }
});

const upload = multer({ storage });

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

app.post("/send-email", upload.single("photo"), async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const file = req.file;

        // Definisi filePath DI SINI, di dalam route handler
        const filePath = file ? file.path : null;

        let attachments = [];
        if (filePath) {
            // baca file menjadi buffer
            attachments.push({
                filename: file.originalname,
                content: fs.readFileSync(filePath),
                type: file.mimetype,
            });
        }

        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: [process.env.TARGET_EMAIL],
            subject: `New Message from ${name}`,
            html: `
            <div style="background-color: #e0f7fa; padding: 40px 0;">
                <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); overflow: hidden;">

                <!-- FONT IMPORT -->
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
                
                <!-- HEADER -->
                <div style="background: linear-gradient(135deg, #06b6d4, #0ea5e9); padding: 25px 20px; text-align: center; color: #ffffff; font-family: 'Poppins', sans-serif;">
                    <h1 style="margin: 0; font-size: 24px; font-weight: 600;">💬 New FAQ Form Message</h1>
                    <p style="margin: 6px 0 0; font-size: 14px; font-weight: 400; opacity: 0.9;">You’ve received a new message from your website</p>
                </div>

                <!-- CONTENT -->
                <div style="padding: 30px; color: #334155; font-family: 'Poppins', sans-serif;">
                    <div style="border-left: 4px solid #06b6d4; padding-left: 15px; margin-bottom: 20px;">
                    <p style="margin: 5px 0; font-size: 16px;"><b>Subject:</b> ${subject}</p>
                    <p style="margin: 5px 0; font-size: 16px;"><b>Name:</b> ${name}</p>
                    <p style="margin: 5px 0; font-size: 16px;">
                        <b>Email:</b> 
                        <a href="mailto:${email}" style="color: #0ea5e9; text-decoration: none;">${email}</a>
                    </p>
                    </div>

                    <p style="font-weight: 600; font-size: 16px; margin-bottom: 8px;">Message:</p>
                    <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; padding: 16px 20px; border-radius: 10px; font-size: 15px; line-height: 1.6;">
                    ${message.replace(/\n/g, "<br/>")}
                    </div>

                    ${
                        file
                            ? `
                        <div style="margin-top: 25px; background-color: #ecfeff; border: 1px solid #a5f3fc; padding: 15px; border-radius: 8px;">
                        <p style="margin: 0; font-size: 15px; color: #036672;">
                            📎 <b>Attached Photo:</b> ${file.originalname}
                        </p>
                        </div>`
                            : `<p style="margin-top: 25px; color: #94a3b8; font-style: italic;">No photo uploaded</p>`
                    }
                </div>

                <!-- FOOTER -->
                <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px; text-align: center; font-family: 'Poppins', sans-serif; font-size: 13px; color: #64748b;">
                    <p style="margin: 0;">This email was sent automatically from your contact form.</p>
                    <p style="margin: 5px 0 0;">© 2025 <span style="color: #06b6d4; font-weight: 600;">PT Entri Jaya Makmur.</span> All ready reserved.</p>
                </div>

                </div>
            </div>
            `,
            attachments,
        });

        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
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