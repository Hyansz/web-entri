import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ message: "Admin not found" });

        const match = await bcrypt.compare(password, admin.password);
        if (!match) return res.status(401).json({ message: "Wrong password" });

        const token = jwt.sign(
            { id: admin._id, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "4h" } // ← 4 JAM
        );

        res.json({
            token,
            expiresIn: 14400, // ← 4 JAM dalam detik
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
