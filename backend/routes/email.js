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

export default router;
