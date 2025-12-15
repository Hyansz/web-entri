import express from "express";
import multer from "multer";
import { Resend } from "resend";

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

/* =========================
    MULTER MEMORY STORAGE
========================= */
const uploadMemory = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});

/* =========================
    POST /send-email
========================= */
router.post("/send-email", uploadMemory.single("photo"), async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                message: "Data tidak lengkap",
            });
        }

        const attachments = req.file
            ? [
                {
                    filename: req.file.originalname,
                    content: req.file.buffer.toString("base64"),
                },
            ]
            : [];

        await resend.emails.send({
            from: process.env.EMAIL_FROM,
            to: [process.env.EMAIL_TO],
            subject: subject || "Pesan dari Website",
            html: `
                <h2>Pesan Baru dari Website</h2>
                <p><b>Nama:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Pesan:</b></p>
                <p>${message}</p>
            `,
            attachments,
        });

        return res.status(200).json({
            message: "Email berhasil dikirim",
        });
    } catch (error) {
        console.error("RESEND ERROR:", error);
        return res.status(500).json({
            message: "Gagal mengirim email",
        });
    }
});

export default router;
