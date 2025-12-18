import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import Product from "./models/Product.js";

dotenv.config();

await connectDB();

// 🔥 PREWARM DATABASE (ANTI ERROR AWAL)
(async () => {
    try {
        await Product.estimatedDocumentCount();
        console.log("🔥 Database warmed up");
    } catch (e) {
        console.warn("⚠️ DB warmup failed");
    }
})();

// 🔒 HARDEN UPLOAD ACCESS
app.use("/uploads", (req, res, next) => {
    const blocked = [".js", ".exe", ".sh", ".php"];
    if (blocked.some((ext) => req.path.endsWith(ext))) {
        return res.status(403).end();
    }

    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Content-Disposition", "inline");
    next();
});

// GLOBAL ERROR HANDLER (tetap di bawah)
app.use(errorHandler);

export default app;
