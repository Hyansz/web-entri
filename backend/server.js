import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import { Resend } from "resend";
import fs from "fs";
import { fileURLToPath } from "url";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);
// Setup multer (tempat simpan file upload)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// data produk
const furniture = [
    {
        id: 1,
        title: "Hospital Bed Manual (1 Crank)",
        img: "/img/bed1.png",
    },
    {
        id: 2,
        title: "Hospital Bed Manual (2 Crank)",
        img: "/img/bed2.png",
    },
    {
        id: 3,
        title: "Hospital Bed Manual (3 Crank)",
        img: "/img/bed3.png",
    },
    {
        id: 4,
        title: "Hospital Bed Electric (3 Crank)",
        img: "/img/bed4.png",
    },
    {
        id: 5,
        title: "Hospital Bed ICU",
        img: "/img/bed5.png",
    },
    {
        id: 6,
        title: "Examine Bed SS",
        img: "/img/examin1.png",
    },
    {
        id: 7,
        title: "Examine Bed PC",
        img: "/img/examin2.png",
    },
    {
        id: 8,
        title: "Stretcher Type 01",
        img: "/img/examin3.png",
    },
    {
        id: 9,
        title: "Stretcher Type 02",
        img: "/img/examin4.png",
    },
    {
        id: 10,
        title: "Verlos Bed SS",
        img: "/img/examin5.png",
    },
    {
        id: 11,
        title: "Phlebotomy Chair",
        img: "/img/kursi-gigi.png",
    },
    {
        id: 12,
        title: "Hospital Children Bed",
        img: "/img/kasur-bayi1.png",
    },
    {
        id: 13,
        title: "Baby Box",
        img: "/img/kasur-bayi2.png",
    },
    {
        id: 14,
        title: "Bed Side Cabinet Type 01",
        img: "/img/bed-cabinet1.png",
    },
    {
        id: 15,
        title: "Bed Side Cabinet Type 02",
        img: "/img/bed-cabinet2.png",
    },
    {
        id: 16,
        title: "Bed Side Cabinet Type 03",
        img: "/img/bed-cabinet3.png",
    },
    {
        id: 17,
        title: "Instrumen Cabinet 2 Door Type 01",
        img: "/img/lemari1.png",
    },
    {
        id: 18,
        title: "Instrumen Cabinet 2 Door Type 02",
        img: "/img/lemari2.png",
    },
    {
        id: 19,
        title: "Instrumen Cabinet 2 Door Type 03",
        img: "/img/lemari3.png",
    },
    {
        id: 20,
        title: "Instrumen Cabinet 2 Door Type 04",
        img: "/img/lemari4.png",
    },
    {
        id: 21,
        title: "Instrumen Cabinet Single Door",
        img: "/img/lemari5.png",
    },
    {
        id: 22,
        title: "Instrumen Cabinet 4 Door",
        img: "/img/lemari6.png",
    },
    {
        id: 23,
        title: "Baby Dressing Table PC",
        img: "/img/dressing-table1.png",
    },
    {
        id: 24,
        title: "Baby Dressing Table PC + Lamp",
        img: "/img/dressing-table2.png",
    },
    {
        id: 25,
        title: "Infus Stand Kaki 5 SS",
        img: "/img/infus-stand1.png",
    },
    {
        id: 26,
        title: "Infus Stand Kaki 5 PC",
        img: "/img/infus-stand2.png",
    },
    {
        id: 27,
        title: "Infus Stand Kaki 5 Plastik",
        img: "/img/infus-stand3.png",
    },
    {
        id: 28,
        title: "Infus Stand Kaki 3 SS",
        img: "/img/infus-stand4.png",
    },
    {
        id: 29,
        title: "Infus Stand Kaki 3 SS",
        img: "/img/infus-stand5.png",
    },
    {
        id: 30,
        title: "Foot Step Single SS",
        img: "/img/foot-step1.png",
    },
    {
        id: 31,
        title: "Foot Step Single PC",
        img: "/img/foot-step2.png",
    },
    {
        id: 32,
        title: "Foot Step Double SS",
        img: "/img/foot-step3.png",
    },
    {
        id: 33,
        title: "Foot Step Double PC",
        img: "/img/foot-step4.png",
    },
    {
        id: 34,
        title: "Overbed Table SS",
        img: "/img/meja1.png",
    },
    {
        id: 35,
        title: "Overbed Table PC",
        img: "/img/meja2.png",
    },
    {
        id: 36,
        title: "X-RAY Viewer Single",
        img: "/img/x-ray1.png",
    },
    {
        id: 37,
        title: "X-RAY Viewer Double",
        img: "/img/x-ray2.png",
    },
    {
        id: 38,
        title: "Bed Screen Single",
        img: "/img/bed-screen1.png",
    },
    {
        id: 39,
        title: "Bed Screen Double",
        img: "/img/bed-screen2.png",
    },
    {
        id: 40,
        title: "Bed Screen Triple",
        img: "/img/bed-screen3.png",
    },
    {
        id: 41,
        title: "Infant Warmer Inkubator",
        img: "/img/inkubator.png",
    },
    {
        id: 42,
        title: "X-Ray Hanger",
        img: "/img/x-ray-hanger.png",
    },
    {
        id: 43,
        title: "Emergency Trolley",
        img: "/img/emergency-trolley.png",
    },
    {
        id: 44,
        title: "Medicine Trolley",
        img: "/img/medicine-trolley.png",
    },
    {
        id: 45,
        title: "Instrument Trolley Type 01",
        img: "/img/introll1.png",
    },
    {
        id: 45,
        title: "Instrument Trolley Type 02",
        img: "/img/introll2.png",
    },
    {
        id: 45,
        title: "Instrument Trolley Type 03",
        img: "/img/introll3.png",
    },
    {
        id: 45,
        title: "Instrument Trolley 03 Sap",
        img: "/img/introll4.png",
    },
    {
        id: 46,
        title: "ECG Trolley",
        img: "/img/ecg-trolley.png",
    },
    {
        id: 47,
        title: "Linen Trolley",
        img: "/img/lintroll.png",
    },
    {
        id: 48,
        title: "Food Trolley Type 01",
        img: "/img/fotroll1.png",
    },
    {
        id: 49,
        title: "Food Trolley Type 02",
        img: "/img/fotroll2.png",
    },
    {
        id: 50,
        title: "Almari Narkotik 2 Sap",
        img: "/img/almari-narkotik1.png",
    },
    {
        id: 51,
        title: "Almari Narkotik 3 Sap",
        img: "/img/almari-narkotik2.png",
    },
    {
        id: 52,
        title: "Standard Waskom Single SS Type 01",
        img: "/img/waskom1.png",
    },
    {
        id: 53,
        title: "Standard Waskom Single PC Type 01",
        img: "/img/waskom2.png",
    },
    {
        id: 54,
        title: "Standard Waskom Double SS Type 01",
        img: "/img/waskom3.png",
    },
    {
        id: 55,
        title: "Standard Waskom Double PC Type 01",
        img: "/img/waskom4.png",
    },
    {
        id: 56,
        title: "Standard Waskom Single SS Type 02",
        img: "/img/waskom5.png",
    },
    {
        id: 57,
        title: "Standard Waskom Single SS Type 02",
        img: "/img/waskom6.png",
    },
    {
        id: 58,
        title: "Standard Waskom Double SS Type 02",
        img: "/img/waskom7.png",
    },
    {
        id: 59,
        title: "Standard Waskom Double PC Type 02",
        img: "/img/waskom8.png",
    },
    {
        id: 60,
        title: "Oksigen Trolley Type 01",
        img: "/img/oksigen-trolley1.png",
    },
    {
        id: 61,
        title: "Oksigen Trolley Type 02",
        img: "/img/oksigen-trolley2.png",
    },
    {
        id: 62,
        title: "Scrub Station",
        img: "/img/scrub-station.png",
    },
    {
        id: 63,
        title: "Keranda Jenazah",
        img: "/img/keranda.png",
    },
    {
        id: 64,
        title: "Ambulance Type 01",
        img: "/img/ambulan1.png",
    },
    {
        id: 65,
        title: "Ambulance Type 02",
        img: "/img/ambulan2.png",
    },
    {
        id: 66,
        title: "Examination Lamp With Dimmer",
        img: "/img/lampu.png",
    },
];

const liquid = [
    {
        id: 1,
        title: "masker Antiseptik",
        img: "/img/alkohol.png",
    },
    {
        id: 2,
        title: "Hand Sanitizer",
        img: "/img/hand-sanitizer.png",
    },
    {
        id: 3,
        title: "masker 95%, 96% ( 200 L )",
        img: "/img/alkohol.png",
    },
    {
        id: 4,
        title: "Chlorhexidine 0.5%, 2%, 4% ( 5 L )",
        img: "/img/chlorhexidine.png",
    },
    {
        id: 5,
        title: "Aquadest Water 5L",
        img: "/img/aquadest-5L.png",
    },
    {
        id: 6,
        title: "Aquadest Water 20L",
        img: "/img/aquadest-20L.png",
    },
    {
        id: 7,
        title: "Polyhexamethylene Biguanide",
        img: "/img/phmb.png",
    },
    {
        id: 8,
        title: "Zyme",
        img: "/img/zyme.png",
    },
];

const bmhp = [
    {
        id: 1,
        title: "Surgical Facemask (Ear Loop)",
        img: "/img/masker1.png",
    },
    {
        id: 2,
        title: "Korset",
        img: "/img/korset.png",
    },
    {
        id: 3,
        title: "Surgical Facemask (Head Loop)",
        img: "/img/masker2.png",
    },
    {
        id: 4,
        title: "masker Swab",
        img: "/img/alswab.png",
    },
    {
        id: 5,
        title: "Masker Sterile KF-94 4 Ply",
        img: "/img/masker3.png",
    },
    {
        id: 6,
        title: "N95 Particular Respirator 5 Ply",
        img: "/img/masker4.png",
    },
    {
        id: 7,
        title: "Nitrile Examination Gloves",
        img: "/img/gloves.png",
    },
    {
        id: 8,
        title: "Blood Lancet",
        img: "/img/blood-lancet.png",
    },
];

const lab = [
    {
        id: 1,
        title: "Centrifuge 12 Holes",
        img: "/img/lab1.png",
    },
    {
        id: 2,
        title: "Bio Safety Cabinet",
        img: "/img/lab2.png",
    },
    {
        id: 3,
        title: "Laminar Air Flow",
        img: "/img/lab3.png",
    },
];

const videos = [
    {
        _id: "1",
        title: "Cara Menggunakan Produk Kami",
        videoId: "t_9Zu8M9KJI",
        description:
            "Panduan lengkap penggunaan produk secara aman dan efisien.",
    },
    {
        _id: "2",
        title: "Perawatan Produk Agar Tahan Lama",
        videoId: "5qap5aO4i9A",
        description:
            "Tips merawat produk agar tetap awet dan berfungsi optimal.",
    },
    {
        _id: "3",
        title: "Penjelasan Fitur Unggulan Kami",
        videoId: "kXYiU_JCYtU",
        description: "Pelajari keunggulan yang membuat produk kami berbeda.",
    },
    {
        _id: "4",
        title: "Tutorial Singkat: Instalasi Mudah",
        videoId: "9bZkp7q19f0",
        description: "Panduan instalasi produk dengan langkah mudah dan cepat.",
    },
    {
        _id: "5",
        title: "Demo Produk untuk Industri",
        videoId: "E7wJTI-1dvQ",
        description:
            "Lihat bagaimana produk kami digunakan dalam skala industri.",
    },
];

const blogs = [
    {
        id: 1,
        slug: "panduan-produk-terbaru",
        title: "Panduan Menggunakan Produk Terbaru Kami",
        description:
            "Pelajari cara terbaik menggunakan produk kami untuk hasil maksimal. Dalam artikel ini, kami akan membahas langkah-langkah penting agar Anda mendapatkan hasil terbaik dari setiap produk.",
        thumbnail: "https://placehold.co/600x400?text=Blog+1",
        content: `
        <p>Produk terbaru kami dirancang dengan teknologi mutakhir untuk memudahkan Anda. Berikut panduannya:</p>
        <ul>
            <li>Langkah 1: Unboxing produk dengan hati-hati.</li>
            <li>Langkah 2: Baca petunjuk penggunaan di kemasan.</li>
            <li>Langkah 3: Gunakan sesuai instruksi.</li>
        </ul>
        <p>Dengan mengikuti panduan ini, Anda bisa memastikan produk bekerja optimal.</p>
    `,
        createdAt: "2025-10-01T10:00:00Z",
    },
    {
        id: 2,
        slug: "tips-perawatan-produk",
        title: "5 Tips Merawat Produk Agar Lebih Awet",
        description:
            "Dengan perawatan yang tepat, produk Anda bisa bertahan lebih lama. Yuk simak beberapa tips sederhana agar produk tetap prima.",
        thumbnail: "https://placehold.co/600x400?text=Blog+2",
        content: `
        <p>Merawat produk tidak sulit, asal tahu caranya:</p>
        <ol>
            <li>Bersihkan secara rutin.</li>
            <li>Hindari paparan panas berlebihan.</li>
            <li>Simpan di tempat kering.</li>
        </ol>
        <p>Dengan langkah ini, umur produk bisa bertambah hingga 2x lipat!</p>
    `,
        createdAt: "2025-09-25T09:00:00Z",
    },
];

app.get("/api/blogs", (req, res) => {
    res.json({ blogs });
});

app.get("/api/blogs/:slug", (req, res) => {
    const blog = blogs.find((b) => b.slug === req.params.slug);
    if (!blog) return res.status(404).json({ message: "Blog tidak ditemukan" });
    res.json(blog);
});

app.get("/api/videos", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedVideos = videos.slice(startIndex, endIndex);

    res.json({
        videos: paginatedVideos,
        total: videos.length,
        page,
        limit,
    });
});

// endpoint paginasi furniture
app.get("/api/furniture", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const start = (page - 1) * limit;
    const end = start + limit;

    const paginated = furniture.slice(start, end);

    res.json({
        total: furniture.length,
        page,
        limit,
        furniture: paginated,
    });
});

// endpoint paginasi liquid
app.get("/api/liquid", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const start = (page - 1) * limit;
    const end = start + limit;

    const paginated = liquid.slice(start, end);

    res.json({
        total: liquid.length,
        page,
        limit,
        liquid: paginated,
    });
});

// endpoint paginasi bmhp
app.get("/api/bmhp", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const start = (page - 1) * limit;
    const end = start + limit;

    const paginated = bmhp.slice(start, end);

    res.json({
        total: bmhp.length,
        page,
        limit,
        bmhp: paginated,
    });
});

// endpoint paginasi lab
app.get("/api/lab", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const start = (page - 1) * limit;
    const end = start + limit;

    const paginated = lab.slice(start, end);

    res.json({
        total: lab.length,
        page,
        limit,
        lab: paginated,
    });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.post("/send-email", upload.single("photo"), async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const file = req.file;

        // Definisi filePath DI SINI, di dalam route handler
        const filePath = file ? path.join(__dirname, file.path) : null;

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
        <h3>${subject}</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/>${message}</p>
        ${
            file
                ? `<p><b>Photo uploaded:</b> ${file.originalname}</p>`
                : `<p><i>No photo uploaded</i></p>`
        }
    `,
            attachments,
        });

        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server running on port ${PORT}`);
});
