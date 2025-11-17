import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import { Resend } from "resend";
import fs from "fs";
import { fileURLToPath } from "url";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();

dotenv.config();
app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: 100, // maksimal 100 request per IP
    message: "Terlalu banyak request dari IP ini. Coba lagi nanti.",
});
app.use(limiter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pastikan folder uploads ada
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const resend = new Resend(process.env.RESEND_API_KEY);
// Setup multer (tempat simpan file upload)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
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
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka dari pipa besi dan matras dari plat besi | Aksesoris panel kepala dan kaki ABS | Bed rail aluminium | 1 Penggerak matras (Engkol) ABS | Castor lengkap 5” (RHJ-TW PU 125), dua pemutar dengan kunci pengaman | Tiang infus pipa stainless steel | Dimensi (P x L x T) (200 x 90 x 110 CM) | Berat +/- 108 Kg, beban maksimal 150 Kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi cat dan rangka 3 bulan",
    },
    {
        id: 2,
        title: "Hospital Bed Manual (2 Crank)",
        img: "/img/bed2.png",
        kemenkes: "10902810701",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka dari pipa besi dan matras dari plat besi | Aksesoris panel kepala dan kaki ABS | Bed rail aluminium | 2 Penggerak matras (Engkol) ABS | Castor lengkap 5” (RHJ-TW PU 125), dua pemutar dengan kunci pengaman | Tiang infus pipa stainless steel | Dimensi (P x L x T) (200 x 90 x 110 CM) | Berat +/- 108Kg, beban maksimal 150Kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi cat dan rangka 3 bulan",
    },
    {
        id: 3,
        title: "Hospital Bed Manual (3 Crank)",
        img: "/img/bed3.png",
        kemenkes: "10902810701",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka dari pipa besi dan matras dari plat besi | Aksesoris panel kepala dan kaki ABS | Bed rail aluminium | 3 Penggerak matras (Engkol) ABS | Castor lengkap 5” (RHJ-TW PU 125), dua pemutar dengan kunci pengaman | Tiang infus pipa stainless steel | Dimensi (P x L x T) (200 x 90 x 110 CM) | Berat +/- 108Kg, beban maksimal 150Kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi cat dan rangka 3 bulan",
    },
    {
        id: 4,
        title: "Hospital Bed Electric (3 Crank)",
        img: "/img/bed4.png",
        kemenkes: "10902810520",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka dari pipa besi dan matras dari plat besi | Aksesoris panel kepala dan kaki ABS | Bed rail aluminium | Tiang infus pipa stainless steel | 1 Penggerak rangka naik turun dengan electric motor | 2 Penggerak matras dengan electric motor | 3 Electric motor matras dan rangka dikendalikan dengan remote control | Castor lengkap 5” (RHJ-TW PU 125), dua pemutar dengan kunci pengaman | Dimensi (P x L x T) (200 x 90 x 110 CM) | Berat +/- 108Kg, beban maksimal 150Kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi cat dan rangka 3 bulan",
    },
    {
        id: 5,
        title: "Hospital Bed ICU",
        img: "/img/bed5.png",
        kemenkes: "10902810520",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka dari pipa besi dan matras dari plat besi | Aksesoris panel kepala dan kaki ABS | Bed rail aluminium | Tiang infus pipa stainless steel | 1 Penggerak rangka naik turun dengan electric motor | 2 Penggerak matras dengan electric motor | 3 Electric motor matras dan rangka dikendalikan dengan remote control | Castor lengkap 5” (RHJ-TW PU 125), dua pemutar dengan kunci pengaman | Dimensi (P x L x T) (200 x 90 x 110 CM) | Berat +/- 108Kg, beban maksimal 150Kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi cat dan rangka 3 bulan",
    },
    {
        id: 6,
        title: "Examine Bed SS",
        img: "/img/examin1.png",
        kemenkes: "10903810837",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka dari pipa stainless steel | Matras berbahan busa dengan plywood dilapisi sarung kulit sintetis | Pengelasan TIG | Dimensi (P x L x T) (190 x 60 x 76 CM) | Berat +/- 28Kg, beban maksimal 100Kg | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 7,
        title: "Examine Bed PC",
        img: "/img/examin2.png",
        kemenkes: "10903810837",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka dari pipa besi MS | Matras berbahan busa dengan plywood dilapisi sarung kulit sintetis | Pengelasan TIG | Dimensi (P x L x T) (190 x 60 x 76 CM) | Berat +/- 28 Kg, beban maksimal 100 Kg | Ridgid, kuat dan tahan lama, Cat powder coating tidak mudah tergores | Garansi cat dan rangka 3 bulan",
    },
    {
        id: 8,
        title: "Stretcher Type 01",
        img: "/img/examin3.png",
        kemenkes: "10903810930",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka dari pipa stainless steel | Matras berbahan busa dengan plywood dilapisi sarung kulit sintetis | Tiang infus pipa stainless steel | Pengelasan TIG | Roda ruji 25” | Castor 5” | Dimensi (P x L x T) (220 x 60 x 90 CM) | Berat +/- 28 kg, beban maksimal 150 kg | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 9,
        title: "Stretcher Type 02",
        img: "/img/examin4.png",
        kemenkes: "10903810930",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka dari pipa stainless steel | Matras berbahan busa dengan plywood dilapisi sarung kulit sintetis | Tiang infus pipa stainless steel | Pengelasan TIG | Roda ruji 25” | Castor 5” dua set roda dengan pengunci | Dimensi (P x L x T) (220 x 60 x 90 CM) | Berat +/- 28 kg, beban maksimal 150 kg | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 10,
        title: "Verlos Bed SS",
        img: "/img/examin5.png",
        kemenkes: "21103810806",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka dari pipa stainless steel | Matras berbahan busa dengan plywood dilapisi sarung kulit sintetis | Tiang infus pipa stainless steel | Pengelasan TIG | Castor 5” dua set roda dengan pengunci | Dimensi (P x L x T) (190 x 75 x 80 CM) | Berat +/- 35 kg, beban maksimal 150 kg | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 11,
        title: "Phlebotomy Chair",
        img: "/img/kursi-gigi.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama pipa dan hollow MS | Matras berbahan busa dengan plywood dilapisi sarung kulit sintetis | Warna sarung kulit Oscar, bisa request sesuai permintaan | Pengelasan MIG | Dimensi (P x L x T) (72 x 75 x 65 CM) | Berat +/- 28 kg dengan beban maksimal 100 kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 12,
        title: "Hospital Children Bed",
        img: "/img/kasur-bayi1.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka dari pipa besi dan matras dari plat besi | Bahan dasar rangka pengaman terbuat dari pipa stainless steel | Pengelasan kombinasi TIG & MIG | Castor lengkap 4” dua pemutar lengkap dengan kunci pengaman | Dimensi (P x L x T) 150 x 80 x 130 CM) | Berat +/- 15 kg dengan beban maksimal 60 kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 13,
        title: "Baby Box",
        img: "/img/kasur-bayi2.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka dari pipa besi stainless steel | Cover pengaman terbuat dari acrylic glossy 2 mm | Matras berbahan busa dengan plywood dilapisi sarung kulit sintetis | Pengelasan TIG | Castor 2” | Dimensi (P x L x T) (700 x 450 x 90 CM) | Berat +/- 15 kg dengan beban maksimal 60 kg | Garansi (-)",
    },
    {
        id: 14,
        title: "Bed Side Cabinet Type 01",
        img: "/img/bed-cabinet1.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar body rangka dan laci dari plat besi | Cover body bagian atas berbahan plat stainless steel | Meja partisi berbahan plywood | Pengelasan kombinasi TIG & MIG | Castor 2” | Dimensi (P x L x T) (46 x 45 x 100 CM) | Berat +/- 24 kg dengan beban maksimal 50 kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 15,
        title: "Bed Side Cabinet Type 02",
        img: "/img/bed-cabinet2.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar body rangka dan laci dari plat besi | Cover body bagian atas berbahan plat stainless steel dan round stainless steel | Laci bagian bawah berbahan plat stainless steel | Pengelasan kombinasi TIG & MIG | Castor 2” | Dimensi (P x L x T) (46 x 45 x 100 CM) | Berat +/- 25 kg dengan beban maksimal 50 kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 16,
        title: "Bed Side Cabinet Type 03",
        img: "/img/bed-cabinet3.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar body rangka dari plat besi | Cover body bagian atas berbahan plat stainless steel dan round stainless steel | Pengelasan kombinasi TIG & MIG | Castor 2” | Dimensi (P x L x T) (46 x 45 x 100 CM) | Berat +/- 24 kg dengan beban maksimal 50 kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 17,
        title: "Instrumen Cabinet 2 Door Type 01",
        img: "/img/lemari1.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka dari plat besi | Pintu berbahan rangka hollow MS, plat MS dan kaca | Partisi kaca 4 susun | Pengelasan MIG | Dimensi (P x L x T) (90 x 45 x 170 CM) | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 18,
        title: "Instrumen Cabinet 2 Door Type 02",
        img: "/img/lemari2.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka dari plat besi | Pintu berbahan rangka hollow MS, plat MS dan kaca | Body samping 2 sisi terbuat dari kaca | Partisi kaca 4 susun | Pengelasan MIG | Dimensi (P x L x T) (90 x 45 x 170 CM) | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 19,
        title: "Instrumen Cabinet 2 Door Type 03",
        img: "/img/lemari3.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka dari plat besi | Pintu berbahan rangka hollow MS, plat MS dan kaca | Partisi kaca 3 susun | Pengelasan MIG | Dimensi (P x L x T) (90 x 45 x 170 CM) | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 20,
        title: "Instrumen Cabinet 2 Door Type 04",
        img: "/img/lemari4.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka dari plat besi | Pintu atas berbahan rangka hollow MS, plat MS dan kaca | Pintu bawah berbahan plat besi berikut dengan handle dan pengunci | Partisi kaca 1 susun | Pengelasan MIG | Dimensi (P x L x T) (70 x 40 x 170 CM) | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 21,
        title: "Instrumen Cabinet Single Door",
        img: "/img/lemari5.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka dari plat besi | Pintu berbahan rangka hollow MS, plat MS dan kaca | Partisi kaca 3 susun | Pengelasan MIG | Dimensi (P x L x T) (70 x 45 x 170 CM) | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 22,
        title: "Instrumen Cabinet 4 Door",
        img: "/img/lemari6.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka dari plat besi | Pintu atas berbahan kaca (Sistem sliding) | Pintu bawah berbahan plat besi berikut dengan handle dan pengunci | Partisi atas 2 susun dan partisi bawah 1 susun | Pengelasan MIG | Dimensi (P x L x T) (85 x 40 x 160 CM) | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 23,
        title: "Baby Dressing Table PC",
        img: "/img/dressing-table1.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka dari plat dan pipa besi | Matras berbahan busa dan dilapisi sarung kulit sintetis | Pengelasan MIG | Dimensi (P x L x T) (100 x 50 x 90 CM) | Berat +/- 44 kg dengan beban maksimal 50 kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 24,
        title: "Baby Dressing Table PC + Lamp",
        img: "/img/dressing-table2.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka dari plat dan pipa besi | Matras berbahan busa dan dilapisi sarung kulit sintetis | Pengelasan MIG | Stand lampu unit (include dengan lampu dan knob) | Dimensi (P x L x T) (100 x 50 x 90 CM) | Berat +/- 45 kg dengan beban maksimal 50 kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi electrical 3 bulan",
    },
    {
        id: 25,
        title: "Infus Stand Kaki 5 SS",
        img: "/img/infus-stand1.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama pipa stainless steel | Rangka kaki hollow stainless steel (5 pcs) | Pengelasan TIG | Castor 2” (5 pcs) | Dimensi (P x L x T) (50 x 50 x 150 CM) | Berat +/- 2,5 kg dengan beban maksimal 2 kg | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 26,
        title: "Infus Stand Kaki 5 PC",
        img: "/img/infus-stand2.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama pipa MS | Rangka kaki hollow MS (5 pcs) | Tiang atas pipa stainless steel | Pengelasan kombinasi TIG & MIG | Castor 2” (5 pcs) | Dimensi (P x L x T) (50 x 50 x 150 CM) | Berat +/- 2,5 kg dengan beban maksimal 2 kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 27,
        title: "Infus Stand Kaki 5 Plastik",
        img: "/img/infus-stand3.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama pipa stainless steel | Rangka kaki plastik ABS dengan roda | Tiang atas pipa stainless steel | Pengelasan kombinasi TIG | Castor 2” (Swivel | Dimensi (P x L x T) (50 x 50 x 150 CM) | Berat +/- 2,5 kg dengan beban maksimal 2 kg | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 28,
        title: "Infus Stand Kaki 3 SS",
        img: "/img/infus-stand4.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama pipa stainless steel | Rangka kaki hollow stainless steel (3 pcs) | Pengelasan TIG | Castor 2” (3 pcs) | Dimensi (P x L x T) (50 x 50 x 150 CM) | Berat +/- 2,5 kg dengan beban maksimal 2 kg | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 29,
        title: "Infus Stand Kaki 3 PC",
        img: "/img/infus-stand5.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama pipa MS | Rangka kaki hollow MS (3 pcs) | Tiang atas pipa stainless steel | Pengelasan kombinasi MIG | Castor 2” (3 pcs) | Dimensi (P x L x T) (50 x 50 x 150 CM) | Berat +/- 2,5 kg dengan beban maksimal 2 kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 30,
        title: "Foot Step Single SS",
        img: "/img/foot-step1.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama pipa stainless steel | Foot stand plywood dilapisi dengan karet vinyl | Pengelasan TIG | Dimensi (P x L x T) (50 x 40 x 26 CM) | Berat +/- 2 kg dengan beban maksimal 100 kg | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 31,
        title: "Foot Step Single PC",
        img: "/img/foot-step2.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama pipa MS | Foot stand plywood dilapisi dengan karet vinyl | Pengelasan MIG | Dimensi (P x L x T) (50 x 40 x 26 CM) | Berat +/- 2 kg dengan beban maksimal 100 kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 32,
        title: "Foot Step Double SS",
        img: "/img/foot-step3.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama pipa stainless steel | Foot stand plywood dilapisi dengan karet vinyl | Pengelasan TIG | Dimensi (P x L x T) (50 x 40 x 40 CM) | Berat +/- 3 kg dengan beban maksimal 100 kg | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 33,
        title: "Foot Step Double PC",
        img: "/img/foot-step4.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama pipa MS | Foot stand plywood dilapisi dengan karet vinyl | Pengelasan MIG | Dimensi (P x L x T) (50 x 40 x 40 CM) | Berat +/- 3 kg dengan beban maksimal 100 kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 34,
        title: "Overbed Table SS",
        img: "/img/meja1.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama pipa stainless steel | Nampan terbuat dari stainless steel | Pengelasan TIG | Castor 2” | Dimensi (P x L x T) (40 x 70 x 85-130 CM) | Beban maksimal 20 kg | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 35,
        title: "Overbed Table PC",
        img: "/img/meja2.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama pipa MS | Rangka atas terbuat dari stainless steel | Nampan terbuat dari plywood 15 mm finishing powder coating putih | Pengelasan kombinasi TIG & MIG | Castor 2” | Dimensi (P x L x T) (40 x 70 x 85-130 CM) | Beban maksimal 20 kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 36,
        title: "X-RAY Viewer Single",
        img: "/img/x-ray1.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama plat besi MS | Rangka list stainless steel & aluminium | Cover viewer berbahan acrylic (milky white) | Pengelasan kombinasi TIG & MIG | Power 64 watt, voltage AC 220 V | Saklar manual | Dimensi (P x L x T) (40 x 50 x6,5 CM) | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi electric (1 bulan)",
    },
    {
        id: 37,
        title: "X-RAY Viewer Double",
        img: "/img/x-ray2.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama plat besi MS | Rangka list stainless steel & aluminium | Cover viewer berbahan acrylic (milky white) | Pengelasan kombinasi TIG & MIG | Power 64 watt, voltage AC 220 V | Saklar manual | Dimensi (P x L x T) (70 x 50 x6,5 CM) | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi electric (1 bulan)",
    },
    {
        id: 38,
        title: "Bed Screen Single",
        img: "/img/bed-screen1.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka pipa stainless steel | Warna kain bisa sesuai permintaan | Single screen | Pengelasan TIG | Castor 2” (4 pcs) | Dimensi (P x L x T) (90 x 50 x 175 CM) | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 39,
        title: "Bed Screen Double",
        img: "/img/bed-screen2.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka pipa stainless steel | Warna kain bisa sesuai permintaan | Double screen | Pengelasan TIG | Castor 2” (5 pcs) | Dimensi (P x L x T) (90 x 50 x 175 CM) 2x | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 40,
        title: "Bed Screen Triple",
        img: "/img/bed-screen3.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka pipa stainless steel | Warna kain bisa sesuai permintaan | Single screen | Pengelasan TIG | Castor 2” (6 pcs) | Dimensi (P x L x T) (90 x 50 x 175 CM) 3x | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 41,
        title: "Infant Warmer Inkubator",
        img: "/img/inkubator.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari plat besi | Pengelasan kombinasi TIG & MIG | Matras berbahan busa dengan plywood yang dilapisi sarung kulit sintetis | Alat pengontrol panas inkubator | Bohlam 40 watt (4 unit), 60 watt (2 unit) | Lampu TL 20 watt (penerangan) | Tiang infus berbahan pipa stainless steel | Castor 4” dua pemutar dengan kunci pengaman | Dimensi (P x L x T) (60 x 65 x 175 CM) | Berat +/- 30 kg, beban maksimal 10 kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi electric (3 bulan)",
    },
    {
        id: 42,
        title: "X-Ray Hanger",
        img: "/img/x-ray-hanger.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama pipa stainless steel | Pengelasan TIG | Ridgid, kuat dan tahan lama | Dimensi (P x L x T) 24 x 30 CM | Dimensi (P x L x T) 35 x 35 CM | Dimensi (P x L x T) 30 x 40 CM | Berat +/- 0,5 kg | Garansi (-)",
    },
    {
        id: 43,
        title: "Emergency Trolley",
        img: "/img/emergency-trolley.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari plat MS, stainless steel dan pipa besi | Cover body atas berbahan plat stainless steel | Pengelasan kombinasi TIG & MIG | Castor 4” dua pemutar dengan kunci pengaman | Diameter waskom 30 cm | Tiang infus berbahan pipa stainless steel | Dimensi (P x L x T) (80 x 60 x 135 CM) | Berat +/- 50 kg, beban maksimal 80 kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 44,
        title: "Medicine Trolley",
        img: "/img/medicine-trolley.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari plat MS dan pipa MS | Pengelasan MIG | Castor 4” plat, dua pemutar dengan kunci pengaman | 24 Medicine storage, 2 laci besar | Pintu dengan pengunci | Dimensi (P x L x T) (69 x 40 x 110 CM) | Berat +/- 40 kg, beban maksimal 100 kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 45,
        title: "Instrument Trolley Type 01",
        img: "/img/introll1.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari plat, pipa dan hollow stainless steel | Rak 2 susun dan laci 2 unit | Dilengkapi dengan waskom dan tempat sampah | Pengelasan TIG | Castor 3” dua set roda dengan pengunci | Dimensi (P x L x T) (75 x 45 x 90,5 CM) | Beban maksimal 50 kg | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 45,
        title: "Instrument Trolley Type 02",
        img: "/img/introll2.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari plat, pipa dan hollow stainless steel | Rak 2 susun dan laci 2 unit | Pengelasan TIG | Castor 3” dua set roda dengan pengunci | Dimensi (P x L x T) (75 x 45 x 90,5 CM) | Beban maksimal 50 kg | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 45,
        title: "Instrument Trolley Type 03",
        img: "/img/introll3.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari plat, pipa dan hollow stainless steel | Pengelasan TIG | Castor 3” dua set roda dengan pengunci | Dimensi (P x L x T) (75 x 45 x 90,5 CM) | Beban maksimal 50 kg | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 45,
        title: "Instrument Trolley 03 Sap",
        img: "/img/introll4.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari plat, pipa dan hollow stainless steel | Rak 3 susun dilengkapi dengan keranjang | Pengelasan TIG | Castor 3” dua set roda dengan pengunci | Dimensi (P x L x T) (75 x 45 x 90,5 CM) | Beban maksimal 50 kg | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 46,
        title: "ECG Trolley",
        img: "/img/ecg-trolley.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari plat, pipa dan hollow stainless steel | Rask 2 susun | Pengelasan TIG | Castor 3” dua set roda dengan pengunci | Dimensi (P x L x T) (75 x 45 x 170 CM) | Beban maksimal 50 kg | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 47,
        title: "Linen Trolley",
        img: "/img/lintroll.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari plat dan pipa MS | Rangka kain linen dari pipa dan knee stainless steel 3/4” | Pengelasan kombinasi TIG & MIG | Rak partisi 3 susun dilengkapi dengan kain linen | Castor 4”, dua pemutar dengan kunci pengaman | Warna kain linen bisa sesuai permintaan | Dimensi (P x L x T) (110 x 65 x 100 CM) | Berat +/- 34 kg dengan beban maksimal 70 kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 48,
        title: "Food Trolley Type 01",
        img: "/img/fotroll1.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari plat dan round stainless steel | Pengelasan TIG | 2 kunci pintu luar dan dalam | Rak 20 susun dan bisa dikunci | Castor 4” plat, dua pemutar dengan kunci pengaman | Dimensi (P x L x T) 80 x 57, 5 x 130 CM (Nampan multiplek) | Dimensi (P x L x T) 80 x 45 x 130 CM (Nampan stainless steel) | Berat +/- 40 kg, beban maksimal 100 kg | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 49,
        title: "Food Trolley Type 02",
        img: "/img/fotroll2.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari plat dan round stainless steel | Pengelasan TIG | 2 kunci pintu luar dan dalam | Rak 10 susun dan bisa dikunci | Castor 4” plat, dua pemutar dengan kunci pengaman | Dimensi (P x L x T) 80 x 57,5 x 82 CM (Nampan multiplek) | Dimensi (P x L x T) 80 x 45 x 82 CM (Nampan stainless steel) | Berat +/- 25 kg, beban maksimal 80 kg | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 50,
        title: "Almari Narkotik 2 Sap",
        img: "/img/almari-narkotik1.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari plat dan round stainless steel | Pengelasan TIG | Rak 2 susun | 2 kunci pintu luar dan dalam | Dimensi (P x L x T) (30 x 22 x 52 CM) | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 51,
        title: "Almari Narkotik 3 Sap",
        img: "/img/almari-narkotik2.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari plat dan round stainless steel | Pengelasan TIG | Rak 3 susun | 2 kunci pintu luar dan dalam | Dimensi (P x L x T) (30 x 22 x 52 CM) | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 52,
        title: "Standard Waskom Single SS Type 01",
        img: "/img/waskom1.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari pipa stainless steel | Pengelasan TIG | Castor 2” | Diameter waskom 30 cm | Dimensi (P x L x T) (45 x 45 x 70 CM) | Berat +/- 3 kg dengan beban maksimal 20 kg | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 53,
        title: "Standard Waskom Single PC Type 01",
        img: "/img/waskom2.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari pipa MS | Pengelasan MIG | Castor 2” | Diameter waskom 30 cm | Dimensi (P x L x T) (45 x 45 x 70 CM) | Berat +/- 3 kg dengan beban maksimal 20 kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 54,
        title: "Standard Waskom Double SS Type 01",
        img: "/img/waskom3.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari pipa stainless steel | Pengelasan TIG | Castor 2” | Diameter waskom 30 cm | Dimensi (P x L x T) (50 x 50 x 150 CM) | Berat +/- 5 kg dengan beban maksimal 20 kg | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 55,
        title: "Standard Waskom Double PC Type 01",
        img: "/img/waskom4.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari pipa MS | Pengelasan MIG | Castor 2” | Diameter waskom 30 cm | Dimensi (P x L x T) (50 x 50 x 150 CM) | Berat +/- 3 kg dengan beban maksimal 20 kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 56,
        title: "Standard Waskom Single SS Type 02",
        img: "/img/waskom5.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari pipa stainless steel | Pengelasan TIG | Kaki terbuat dari plastik ABS | Castor 2” swivel | Diameter waskom 30 cm | Dimensi (P x L x T) (50 x 50 x 100 CM) | Berat +/- 2 kg dengan beban maksimal 10 kg | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 57,
        title: "Standard Waskom Single PC Type 02",
        img: "/img/waskom6.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari pipa MS | Pengelasan MIG | Kaki terbuat dari plastik ABS | Castor 2” swivel | Diameter waskom 30 cm | Dimensi (P x L x T) (50 x 50 x 100 CM) | Berat +/- 2 kg dengan beban maksimal 10 kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 58,
        title: "Standard Waskom Double SS Type 02",
        img: "/img/waskom7.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari pipa stainless steel | Pengelasan TIG | Kaki terbuat dari plastik ABS | Castor 2” swivel | Diameter waskom 30 cm | Dimensi (P x L x T) (50 x 85 x 100 CM) | Berat +/- 2,5 kg dengan beban maksimal 15 kg | Ridgid, kuat dan tahan lama | Garansi (-)",
    },
    {
        id: 59,
        title: "Standard Waskom Double PC Type 02",
        img: "/img/waskom8.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari pipa MS | Pengelasan MIG | Kaki terbuat dari plastik ABS | Castor 2” swivel | Diameter waskom 30 cm | Dimensi (P x L x T) (50 x 85 x 100 CM) | Berat +/- 2,5 kg dengan beban maksimal 15 kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 60,
        title: "Oksigen Trolley Type 01",
        img: "/img/oksigen-trolley1.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari plat dan pipa MS | Pengelasan MIG | Castor 4” 2 pcs | Dimensi (P x L x T) (80 x 60 x 135 CM) | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 61,
        title: "Oksigen Trolley Type 02",
        img: "/img/oksigen-trolley2.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari plat dan pipa MS | Pengelasan MIG | Castor 4” plat 1 pcs, 6” 2 pcs | Dimensi (P x L x T) (80 x 60 x 135 CM) | Berat +/- 6 kg | Ridgid, kuat dan tahan lama (Cat powder coating tidak mudah tergores) | Garansi (-)",
    },
    {
        id: 62,
        title: "Scrub Station",
        img: "/img/scrub-station.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama dari plat stainless steel BA 304 (1,6 mm) | Pintu bagian bawah berbahan plat stainless steel BA 304 (1 mm) | Dilengkapi pintu 4 set (dengan handle dan pengunci) | Pengelasan TIG | 2 kran air (otomatis) dengan sensor, juga bisa manual (air panas) | Container untuk sabun (otomatis) | Dimensi (P x L x T) (65 x 135 x 155 CM) | Dispenser voltage 220 V 500 watt | Beban maksimal 100 kg",
    },
    {
        id: 63,
        title: "Keranda Jenazah",
        img: "/img/keranda.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Hollow stainless steel 40x40x1 mm | Hollow stainless steel 25x25x1 mm | Plat stainless steel 1 BA 201 (1 mm) dan (2 mm) | Plat stainless steel 1 BA 201 (0,8 mm) | Pipa stainless steel 1” | Round stainless steel 10 mm | Pengelasan TIG | Dimensi (P x L x T) (200 x 70 x 110 CM) | Castor 5” plat, dua pemutar dengan kunci pengaman",
    },
    {
        id: 64,
        title: "Ambulance Type 01",
        img: "/img/ambulan1.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Sticker samping kanan, kiri, depan dan belakang (Tulisan ambulance, logo dan alamat instansi) | Stretcher otomatis (berikut dengan rail stretcher) | Kursi perawat | Almari cabinet berbahan plywood | Infus gantung + APAR 1 kg | Plat bemper dan plat penutup scop | Lantai kabin beralaskan karpet vinyl | Wastafel (lengkap dengan pompa air, kran dan inverter) | Lampu periksa | Tabung oksigen, masker oksigen dan regulator | Dimensi menyesuaikan dengan size armada yang akan digunakan | Lampu rotary set (lengkap dengan radio, sirine dan mic) | Garansi set lampu rotary (3 bulan)",
    },
    {
        id: 65,
        title: "Ambulance Type 02",
        img: "/img/ambulan2.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Sticker samping kanan, kiri, depan dan belakang (Tulisan ambulance, logo dan alamat instansi) | Stretcher otomatis (berikut dengan rail stretcher) | Kursi perawat | Kotak P3K | Infus gantung + APAR 1 kg | Plat bemper dan plat penutup scop | Lantai kabin beralaskan karpet vinyl | Tabung oksigen, masker oksigen dan regulator | Dimensi menyesuaikan dengan size armada yang akan digunakan | Lampu periksa | Lampu rotary set (lengkap dengan radio, sirine dan mic) | Garansi set lampu rotary (3 bulan)",
    },
    {
        id: 66,
        title: "Examination Lamp With Dimmer",
        img: "/img/lampu.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan dasar rangka utama pipa stainless steel | Rangka kaki plastik ABS berikut dengan roda | Castor 2” swivel | Voltase 220 V | Lampu LED 7 watt | Intensitas cahaya dimmer max 35.000 lux | Posisi lampu bisa di adjust kanan, kiri dan naik, turun | Tombol saklar manual | Dimensi (L x T) 50 x 150 cm | Ridgid, kuat dan tahan lama",
    },
];

const liquid = [
    {
        id: 67,
        title: "Alkohol Antiseptik",
        img: "/img/alkohol.png",
        kemenkes: "20501220252",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Mengandung Ethyl alcohol food grade, Isopropil , Benzalkonium Chloride | Tersedia dengan kandungan alkohol 70%, 95%, 96% | Tersedia dalam kemasan 100ml, 1L, 5L, 20L, 200L",
    },
    {
        id: 68,
        title: "Hand Sanitizer",
        img: "/img/hand-sanitizer.png",
        kemenkes: "20501220386",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Mengandung Ethyl alcohol 70%, CHG (Chlorhexidine Gluconate) 0,5% | Aman untuk permukaan kulit | Tersedia varian aroma original dan parfum lemon | Tersedia dalam kemasan 100ml, 500ml, 1L, 5L dan 20L",
    },
    {
        id: 69,
        title: "Alkohol 95%, 96% ( 200 L )",
        img: "/img/alkohol.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi: "Alkohol 95%, 96% ( 200 L )",
    },
    {
        id: 70,
        title: "Chlorhexidine 0.5%, 2%, 4% ( 5 L )",
        img: "/img/chlorhexidine.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Mengandung Ethyl Alcohol, CHG (Chlorhexidine Gluconate) | Tersedia varian aroma original dan parfum lemon | Tersedia kadar CHG (Chlorhexidine Gluconate) 0,5%, 2% dan 4% | Tersedia dalam kemasan 1L, 5L dan 20L",
    },
    {
        id: 71,
        title: "Aquadest Water 5L",
        img: "/img/aquadest-5L.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "pH Netral (7,0) Appearance (clear and free of visible particular) | Nilai TDS (Total Dissolved Solid) 3Mg/Liter (standar max 5) | Nilai Conductivity 8,5 μS/cm (standar max 10) | Tersedia dalam kemasan 1 Liter, 5 Liter dan 20 Liter",
    },
    {
        id: 72,
        title: "Aquadest Water 20L",
        img: "/img/aquadest-20L.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "pH Netral (7,0) Appearance (clear and free of visible particular) | Nilai TDS (Total Dissolved Solid) 3Mg/Liter (standar max 5) | Nilai Conductivity 8,5 μS/cm (standar max 10) | Tersedia dalam kemasan 1 Liter, 5 Liter dan 20 Liter",
    },
    {
        id: 73,
        title: "Polyhexamethylene Biguanide",
        img: "/img/phmb.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi: "POLIHEXAMETHYLENE BIGUANIDE",
    },
    {
        id: 74,
        title: "Zyme",
        img: "/img/zyme.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi: "Multi Enzyme Cleanser ( 3 in 1 )",
    },
];

const bmhp = [
    {
        id: 75,
        title: "Surgical Facemask (Ear Loop)",
        img: "/img/masker1.png",
        kemenkes: "21603910158",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "P x L =/- 17.5cm x 9.5cm, warna hijau | Standar 3 ply surgical mask, dengan lapisan tengah meltbown filter BFE 99% | Tali atau Pengait telinga 75% nylon dan 25% spandex | Pengait hidung single dan terbuat dari metal",
    },
    {
        id: 76,
        title: "Korset",
        img: "/img/korset.png",
        kemenkes: "15402032",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi: "KORSET - DOUBLE SET LUMBAR SACRAL SUPPORTER",
    },
    {
        id: 77,
        title: "Surgical Facemask (Head Loop)",
        img: "/img/masker2.png",
        kemenkes: "21603021219",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "P x L=/- 17.5cm x 9.5cm warna hijau | Standar 3 ply surgical mask, dengan lapisan tengah meltbown filter BFE 99% | Tali atau pengait telinga 75% nylon dan 25% spandex | Pengait telinga 75% nylon dan 25% spandex | Pengait hidung single dan terbuat dari metal | Desain yang pas serta lentur, bebas lateks untuk kenyamanan pemakaian yang lama | Desain tali yang bisa diapaki untuk perempuan berhijab",
    },
    {
        id: 78,
        title: "Alkohol Swab",
        img: "/img/alswab.png",
        kemenkes: "20903220108",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Berbahan dasar kapas steril yang lembut | Bahan lebih tebal dan tidak melepaskan serabut | Komposisi Alkohol (Ethanol 70%) + Chlorhexidine gluconate 0.5%",
    },
    {
        id: 79,
        title: "Masker Sterile KF-94 4 Ply",
        img: "/img/masker3.png",
        kemenkes: "21603120478",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Bahan 4 lapis (spunbond-meltblown-meltblown-spunbond) | Melalui proses sterile EQ (metode sterilisasi dengan teknologi untuk membunuh mikroorganisme) | Dibuat dengan material lembut dengan tingkat filtrasi yang tinggi | Dilengkapi kawat hidung yang fleksibel dan mudah disesuaikan | Tali kait nyaman saat dikaitkan ke telinga, dilengkapi dengan S hook (pengait) tambahan yang mudah dikenakan bahkan untuk wanita berhijab | Model masker kekinian dengan tingkat keamanan ganda dan nyaman saat dipakai",
    },
    {
        id: 80,
        title: "N95 Particular Respirator 5 Ply",
        img: "/img/masker4.png",
        kemenkes: "21603022296",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Terdiri dari bahan 5 layer untuk memberikan perlindungan secara maksimal | Pada bagian dalam masker terdapat busa pelindung untuk memberikan kenyamanan selama pemakaian | Pada bagian luar masker terdapat nose clip yang bisa disesuaikan mengikuti bentuk wajah • Desain masker dirancang menutupi area hidung dan mulut dengan sempurna sehingga filtrasi partikel udara menjadi lebih efisien | Telah lolos pengujian dari Nelson Labs dengan prosedur NIOSH",
    },
    {
        id: 81,
        title: "Nitrile Examination Gloves",
        img: "/img/gloves.png",
        kemenkes: "20501220252",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Terdiri dari bahan 5 layer untuk memberikan perlindungan secara maksimal | Pada bagian dalam masker terdapat busa pelindung untuk memberikan kenyamanan selama pemakaian | Pada bagian luar masker terdapat nose clip yang bisa disesuaikan mengikuti bentuk wajah • Desain masker dirancang menutupi area hidung dan mulut dengan sempurna sehingga filtrasi partikel udara menjadi lebih efisien | Telah lolos pengujian dari Nelson Labs dengan prosedur NIOSH", // ko masker
    },
    {
        id: 82,
        title: "Blood Lancet",
        img: "/img/blood-lancet.png",
        kemenkes: "11603122510",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Ukuran jarum 28G | Dilengkapi dengan pengaman jarum yang mudah dilepas ketika akan digunakan | Compatible dengan semua needle pen | 1 Box işi 100pcs",
    },
];

const lab = [
    {
        id: 83,
        title: "Centrifuge 12 Holes",
        img: "/img/lab1.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "TIPE : N3CFG-12H | KLASIFIKASI : KELAS I | PROTEKSI : IPXO | RANGKA UTAMA : Terbuat dari bahan plate besi | ROTOR ADAPTER : Terbuat dari bahan cor aluminiu | KAKI : 4 dop kaki dari karet | FINISHING : Cat powder coating | KECEPATAN PUTAR : 0-5500rpm | KAPASITAS TABUNG : 12 tabung (5, 10 dan 15ml) | SUMBER LISTRIK : 220V-240 AC | FREKUENSI : 50/60 Hz | UKURAN : (P x L x T) (300mm x 420mm x 330mm) | Time Control | Speed Control | Lid Lock | Switch ON/OFF | 12 Botol (5,10 dan 15ml) | 5 dop kaki karet",
    },
    {
        id: 84,
        title: "Bio Safety Cabinet",
        img: "/img/lab2.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Dimensi (P x L x T) (120x70x180 cm) | (P x L x T) (100x70x180 cm) | (P x L x T) (80x70x180 cm) | Sirkulasi udara 70%, Exhaust udara 30% | Pintu sliding Vertikal (Tempered glass 5 MM) | Heppa Filter 99,9% Efisien 0,3 μL | Kecepatan udara naik 0,53 +/- 0,025 M/S, Udara turun 0,33 +/- 0,025 M/S | Lampu UV 18 Watt, Ilumination Led 8 Watt, Ilumination 1000 Lux Display LCD | Tinggi permukaan kerja 750 MM Tinggi aman jendela 200 MM, Maksimum terbuka 370 MM | Sistem Alarm (Audio visual alarm) | Power supply 220 Volt +/- 10%, 60/50 Hz | Level Noise/Kebisingan +/- 61 Db | Material Cabinet plat MS dengan Cat Powder Coating | Material ruang kerja atas Stainless Steel India Gilap 1 MM | Material ruang kerja bawah Stainless Steel BA 3041 MM | Material jendela depan tempered glass 5 MM | Material jendela samping Acrylic Glossy 5 MM",
    },
    {
        id: 85,
        title: "Laminar Air Flow",
        img: "/img/lab3.png",
        kemenkes: "-",
        merk: "N3",
        lokasi: "Surakarta, Indonesia",
        spesifikasi:
            "Dimensi (P x L x T) 100x75x185 cm) | Pengelasan TIG & MIG | Lampu penerangan 10 watt 2 titik | Blower atas dan blower bawah | Acrylic doff 5 mm | Body plat MS ketebalan 1,4 & 1,6 mm | Finishing cat powder coating",
    },
    {
        id: 86,
        title: "Alat Gluco",
        img: "/img/gluco.png",
    },
];

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
        thumbnail: "/img/artikel/001.png",
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
        thumbnail: "/img/artikel/002.png",
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

// furniture
app.get("/api/furniture", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const start = (page - 1) * limit;
    const end = start + limit;

    res.set("Cache-Control", "public, max-age=600, stale-while-revalidate=60");

    if (!furniture || furniture.length === 0) {
        return res.json({
            status: "empty",
            message: "Data furniture kosong",
            total: 0,
            furniture: [],
        });
    }

    const paginated = furniture.slice(start, end);

    res.json({
        status: "success",
        total: furniture.length,
        page,
        limit,
        furniture: paginated,
    });
});

// furniture Detail
app.get("/api/furniture/:id", (req, res) => {
    const { id } = req.params;
    const item = furniture.find((f) => f.id == id);

    if (!item) {
        return res.status(404).json({
            status: "error",
            message: "Produk tidak ditemukan",
        });
    }

    res.json(item);
});

// liquid
app.get("/api/liquid", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const start = (page - 1) * limit;
    const end = start + limit;

    res.set("Cache-Control", "public, max-age=600, stale-while-revalidate=60");

    if (!liquid || liquid.length === 0) {
        return res.json({
            status: "empty",
            message: "Data liquid kosong",
            total: 0,
            liquid: [],
        });
    }

    const paginated = liquid.slice(start, end);

    res.json({
        status: "success",
        total: liquid.length,
        page,
        limit,
        liquid: paginated,
    });
});

app.get("/api/liquid/:id", (req, res) => {
    const { id } = req.params;
    const item = liquid.find((f) => f.id == id);

    if (!item) {
        return res.status(404).json({
            status: "error",
            message: "Produk tidak ditemukan",
        });
    }

    res.json(item);
});

// bmhp
app.get("/api/bmhp", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const start = (page - 1) * limit;
    const end = start + limit;

    res.set("Cache-Control", "public, max-age=600, stale-while-revalidate=60");

    if (!bmhp || bmhp.length === 0) {
        return res.json({
            status: "empty",
            message: "Data BMHP kosong",
            total: 0,
            bmhp: [],
        });
    }

    const paginated = bmhp.slice(start, end);

    res.json({
        status: "success",
        total: bmhp.length,
        page,
        limit,
        bmhp: paginated,
    });
});

app.get("/api/bmhp/:id", (req, res) => {
    const { id } = req.params;
    const item = bmhp.find((f) => f.id == id);

    if (!item) {
        return res.status(404).json({
            status: "error",
            message: "Produk tidak ditemukan",
        });
    }

    res.json(item);
});

// lab
app.get("/api/lab", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const start = (page - 1) * limit;
    const end = start + limit;

    res.set("Cache-Control", "public, max-age=600, stale-while-revalidate=60");

    if (!lab || lab.length === 0) {
        return res.json({
            status: "empty",
            message: "Data laboratorium kosong",
            total: 0,
            lab: [],
        });
    }

    const paginated = lab.slice(start, end);

    res.json({
        status: "success",
        total: lab.length,
        page,
        limit,
        lab: paginated,
    });
});

app.get("/api/lab/:id", (req, res) => {
    const { id } = req.params;
    const item = lab.find((f) => f.id == id);

    if (!item) {
        return res.status(404).json({
            status: "error",
            message: "Produk tidak ditemukan",
        });
    }

    res.json(item);
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

app.use("/img", express.static(path.join(__dirname, "public/img")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server running on port ${PORT}`);
});
