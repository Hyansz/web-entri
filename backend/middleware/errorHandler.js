export const errorHandler = (err, req, res, next) => {
    console.error("🔥 ERROR:", err);

    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }

    if (err.name === "TokenExpiredError") {
        return res.status(401).json({
            success: false,
            message: "Token expired",
        });
    }

    const statusCode = err.statusCode || 500;
    const message = err.message || "Terjadi kesalahan pada server";

    res.status(statusCode).json({
        success: false,
        message,
    });
};
