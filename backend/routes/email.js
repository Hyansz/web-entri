import express from "express";
import multer from "multer";
import { Resend } from "resend";
import { fileTypeFromBuffer } from "file-type";

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

/* =========================
    MULTER MEMORY STORAGE
========================= */
const uploadMemory = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: (req, file, cb) => {
        const allowedMime = ["image/jpeg", "image/png", "image/webp"];

        if (!allowedMime.includes(file.mimetype)) {
            return cb(new Error("Only image files are allowed"), false);
        }

        cb(null, true);
    },
});

/* =========================
    POST /send-email
========================= */
router.post("/send-email", uploadMemory.single("photo"), async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const file = req.file;

        let attachments = [];

        /* =========================
                VALIDASI FILE ASLI
            ========================= */
        if (file) {
            const type = await fileTypeFromBuffer(file.buffer);

            const allowedMime = ["image/jpeg", "image/png", "image/webp"];

            if (!type || !allowedMime.includes(type.mime)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid image file",
                });
            }

            attachments.push({
                filename: file.originalname,
                content: file.buffer,
                type: file.mimetype,
            });
        }

        /* =========================
                SEND EMAIL
            ========================= */
        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: [process.env.TARGET_EMAIL],
            subject: `New Message from ${name}`,
            html: `
                <div style="background-color: #e0f7fa; padding: 40px 0;">
                    <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); overflow: hidden;">

                    <!-- HEADER -->
                    <div style="background: linear-gradient(135deg, #06b6d4, #0ea5e9); padding: 25px 20px; text-align: center; color: #ffffff; font-family: 'Poppins', sans-serif;">
                        <h1 style="margin: 0; font-size: 24px;">💬 New FAQ Form Message</h1>
                        <p style="margin: 6px 0 0; font-size: 14px;">You’ve received a new message</p>
                    </div>

                    <!-- CONTENT -->
                    <div style="padding: 30px; font-family: 'Poppins', sans-serif; color: #334155;">
                        <p><b>Subject:</b> ${subject}</p>
                        <p><b>Name:</b> ${name}</p>
                        <p>
                            <b>Email:</b>
                            <a href="mailto:${email}" style="color: #0ea5e9;">${email}</a>
                        </p>

                        <p style="margin-top: 20px; font-weight: 600;">Message:</p>
                        <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; padding: 16px; border-radius: 8px;">
                            ${message.replace(/\n/g, "<br/>")}
                        </div>

                        ${
                            file
                                ? `
                            <div style="margin-top: 20px; padding: 12px; background-color: #ecfeff; border-radius: 8px;">
                                📎 <b>Attached Photo:</b> ${file.originalname}
                            </div>
                        `
                                : `
                            <p style="margin-top: 20px; font-style: italic; color: #94a3b8;">
                                No photo uploaded
                            </p>
                        `
                        }
                    </div>

                    <!-- FOOTER -->
                    <div style="background-color: #f8fafc; padding: 16px; text-align: center; font-size: 13px; color: #64748b;">
                        © 2025 <b style="color: #06b6d4;">PT Entri Jaya Makmur</b>
                    </div>

                    </div>
                </div>
                `,
            attachments,
        });

        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

export default router;
