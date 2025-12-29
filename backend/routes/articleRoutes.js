import express from "express";
import {
    getArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
} from "../controllers/articleController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getArticles);
router.get("/:slug", getArticle);

// Admin (protected)
router.post("/", protect, createArticle);
router.put("/:id", protect, updateArticle);
router.delete("/:id", protect, deleteArticle);

export default router;
