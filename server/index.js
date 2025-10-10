import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send-email", async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        const data = await resend.emails.send({
            from: "onboarding@resend.dev", // HARUS pakai ini atau domain verified
            to: [process.env.TARGET_EMAIL],
            subject: `New Message from ${name}`,
            html: `
        <h3>${subject}</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b><br/>${message}</p>
    `,
        });

        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error });
    }
});

app.listen(5000, () => {
    console.log("✅ Server running at http://localhost:5000");
});
