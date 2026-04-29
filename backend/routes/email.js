import express from "express";
import multer from "multer";
import { Resend } from "resend";
import { fileTypeFromBuffer } from "file-type";
import sanitizeHtml from "sanitize-html";

/* =========================
   TURNSTILE VERIFY
========================= */
async function verifyTurnstile(token) {
    const secret = process.env.TURNSTILE_SECRET_KEY;

    const res = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `secret=${secret}&response=${token}`,
        },
    );

    const data = await res.json();
    return data.success;
}

/* =========================
   VALIDATION HELPERS
========================= */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function containsSpam(text) {
    const spamKeywords = [
        "http://",
        "https://",
        "www.",
        "viagra",
        "casino",
        "slot",
        "porn",
        "sex",
        "loan",
        "free money",
    ];

    const lower = text.toLowerCase();
    return spamKeywords.some((k) => lower.includes(k));
}

const router = express.Router();

/* =========================
   RESEND LAZY INIT
========================= */
let resend;

function getResend() {
    if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY not set");
    }

    if (!resend) {
        resend = new Resend(process.env.RESEND_API_KEY);
    }

    return resend;
}

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
        if (!process.env.RESEND_API_KEY) {
            return res.status(500).json({
                success: false,
                message: "Email service not configured",
            });
        }

        const resendClient = getResend();

        const {
            name,
            email,
            subject,
            message,
            captchaToken,
            website,
            company_code,
        } = req.body;

        /* =========================
            HONEYPOT (ANTI BOT)
        ========================= */
        if (website || company_code) {
            return res.status(400).json({
                success: false,
                message: "Spam detected",
            });
        }

        /* =========================
            CAPTCHA VALIDATION
        ========================= */
        if (!captchaToken) {
            return res.status(400).json({
                success: false,
                message: "Captcha required",
            });
        }

        const isValidCaptcha = await verifyTurnstile(captchaToken);

        if (!isValidCaptcha) {
            return res.status(403).json({
                success: false,
                message: "Invalid captcha",
            });
        }

        /* =========================
            INPUT VALIDATION
        ========================= */
        if (!name || name.length < 2) {
            return res.status(400).json({
                success: false,
                message: "Nama tidak valid",
            });
        }

        if (!email || !isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Email tidak valid",
            });
        }

        if (!message || message.length < 10) {
            return res.status(400).json({
                success: false,
                message: "Pesan terlalu pendek",
            });
        }

        /* =========================
            ANTI SPAM TEXT
        ========================= */
        if (containsSpam(message) || containsSpam(subject || "")) {
            return res.status(403).json({
                success: false,
                message: "Spam terdeteksi",
            });
        }

        /* =========================
            SANITIZE MESSAGE
        ========================= */
        const cleanMessage = sanitizeHtml(message, {
            allowedTags: ["br"],
            allowedAttributes: {},
        });

        const file = req.file;
        let attachments = [];

        /* =========================
            VALIDASI FILE
        ========================= */
        if (file) {
            const forbiddenExt = /\.(exe|js|php|sh|bat|cmd|svg)$/i;

            if (forbiddenExt.test(file.originalname)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid file extension",
                });
            }

            const type = await fileTypeFromBuffer(file.buffer);

            const allowedMime = ["image/jpeg", "image/png", "image/webp"];

            if (!type || !allowedMime.includes(type.mime)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid image file",
                });
            }

            const safeFilename = file.originalname.substring(0, 100);

            attachments.push({
                filename: safeFilename,
                content: file.buffer,
                type: file.mimetype,
            });
        }

        /* =========================
            SEND EMAIL (UNCHANGED)
        ========================= */
        const data = await resendClient.emails.send({
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
                            ${cleanMessage.replace(/\n/g, "<br/>")}
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
