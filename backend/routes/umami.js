import express from "express";
import {
    getSummary,
    getSummaryCompare,
    getDaily,
    getCountries,
    getPages,
    getEngagement,
    getEngagementCompare,
} from "../controllers/umamiController.js";

const router = express.Router();

router.get("/summary", getSummary);
router.get("/summary-compare", getSummaryCompare);
router.get("/daily", getDaily);
router.get("/countries", getCountries);
router.get("/pages", getPages);
router.get("/engagement", getEngagement);
router.get("/engagement-compare", getEngagementCompare);
router.get("/debug-umami", async (req, res) => {
    try {
        const r = await axios.get(
            `${process.env.UMAMI_URL}/websites/${process.env.UMAMI_WEBSITE_ID}/stats`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.UMAMI_API_KEY}`,
                },
            },
        );

        res.json(r.data);
    } catch (e) {
        res.status(500).json({
            status: e.response?.status,
            data: e.response?.data,
            message: e.message,
        });
    }
});

export default router;
