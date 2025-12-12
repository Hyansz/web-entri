import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function adminAuth(req, res, next) {
    try {
        const auth = req.header("Authorization");
        if (!auth) return res.status(401).json({ message: "No token" });
        const token = auth.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // optionally check role
        if (!decoded?.id)
            return res.status(401).json({ message: "Invalid token" });
        req.admin = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
