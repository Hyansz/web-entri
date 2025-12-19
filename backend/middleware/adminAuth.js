import jwt from "jsonwebtoken";

export default function adminAuth(req, res, next) {
    try {
        const auth = req.headers.authorization;
        if (!auth?.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = auth.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ["HS256"],
        });

        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Forbidden" });
        }

        // 🔥 PENTING
        req.user = decoded;

        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
}
