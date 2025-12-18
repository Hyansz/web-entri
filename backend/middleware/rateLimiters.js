import rateLimit from "express-rate-limit";

/**
 * PUBLIC API
 * Untuk user umum
 */
export const publicLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * ADMIN API
 * Lebih longgar, karena user terpercaya
 */
export const adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * UPLOAD LIMIT
 * Sangat ketat (anti spam image)
 */
export const uploadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
});
