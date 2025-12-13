import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import Admin from "../models/Admin.js";

const router = express.Router();

router.post(
    "/login",
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({ message: "Invalid input" });

            const { email, password } = req.body;

            const admin = await Admin.findOne({ email });
            if (!admin)
                return res.status(401).json({ message: "Invalid credentials" });

            const match = await bcrypt.compare(password, admin.password);
            if (!match)
                return res.status(401).json({ message: "Invalid credentials" });

            const token = jwt.sign(
                { id: admin._id, role: "admin" },
                process.env.JWT_SECRET,
                { expiresIn: "2h" }
            );

            res.json({ token, expiresIn: 7200 });
        } catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    }
);

export default router;
