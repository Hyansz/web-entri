import express from "express";
import {
    getSummary,
    getDaily,
    getCountries,
    getPages,
    getBounceRate,
    getSummaryCompare,
} from "../controllers/umamiController.js";

const router = express.Router();

router.get("/summary", getSummary);
router.get("/daily", getDaily);
router.get("/countries", getCountries);
router.get("/pages", getPages);
router.get("/bounce-rate", getBounceRate);
router.get("/summary-compare", getSummaryCompare);

export default router;
