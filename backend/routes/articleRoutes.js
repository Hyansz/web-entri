import express from "express";
import {
    getArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
} from "../controllers/articleController.js";
import adminAuth from "../middleware/adminAuth.js"; 

const router = express.Router();

// Public
router.get("/", getArticles);
router.get("/:slug", getArticle);

// Admin (protected)
router.post("/", adminAuth, createArticle);
router.put("/:id", adminAuth, updateArticle);
router.delete("/:id", adminAuth, deleteArticle);

export default router;
