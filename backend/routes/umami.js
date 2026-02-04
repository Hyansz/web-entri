import express from "express";
import {
    getSummary,
    getSummaryCompare,
    getDaily,
    getCountries,
    getPages,
    getEngagement,
} from "../controllers/umamiController.js";

const router = express.Router();

router.get("/summary", getSummary);
router.get("/summary-compare", getSummaryCompare);
router.get("/daily", getDaily);
router.get("/countries", getCountries);
router.get("/pages", getPages);
router.get("/engagement", getEngagement);

export default router;
