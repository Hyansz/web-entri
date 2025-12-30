import express from "express";
import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
} from "../controllers/postController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", upload.single("image"), createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
