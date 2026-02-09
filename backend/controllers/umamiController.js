import axios from "axios";

const UMAMI_URL = process.env.UMAMI_URL;
const WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;
const API_KEY = process.env.UMAMI_API_KEY;

const headers = {
    Authorization: `Bearer ${API_KEY}`,
};

/* =====================
   RANGE UTILITIES
===================== */
const getRangeFromQuery = (range = "7d") => {
    const now = Date.now();

    switch (range) {
        case "24h":
            return {
                startAt: now - 24 * 60 * 60 * 1000,
                endAt: now,
            };
        case "30d":
            return {
                startAt: now - 30 * 24 * 60 * 60 * 1000,
                endAt: now,
            };
        case "7d":
        default:
            return {
                startAt: now - 7 * 24 * 60 * 60 * 1000,
                endAt: now,
            };
    }
};

/* =====================
   SUMMARY
===================== */
export const getSummary = async (req, res) => {
    try {
        const range = getRangeFromQuery(req.query.range);

        const { data } = await axios.get(
            `${UMAMI_URL}/websites/${WEBSITE_ID}/stats`,
            { headers, params: range },
        );

        res.json({
            range: req.query.range ?? "7d",
            ...data,
        });
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ message: "Gagal ambil summary Umami" });
    }
};

/* =====================
   SUMMARY COMPARE
===================== */
export const getSummaryCompare = async (req, res) => {
    try {
        const currentRange = getRangeFromQuery(req.query.range);
        const previousRange = (() => {
            const diff = currentRange.endAt - currentRange.startAt;
            return {
                startAt: currentRange.startAt - diff,
                endAt: currentRange.startAt,
            };
        })();

        const [current, previous] = await Promise.all([
            axios.get(`${UMAMI_URL}/websites/${WEBSITE_ID}/stats`, {
                headers,
                params: currentRange,
            }),
            axios.get(`${UMAMI_URL}/websites/${WEBSITE_ID}/stats`, {
                headers,
                params: previousRange,
            }),
        ]);

        res.json({
            range: req.query.range ?? "7d",
            current: current.data,
            previous: previous.data,
        });
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ message: "Gagal compare summary" });
    }
};

/* =====================
   DAILY PAGEVIEWS
===================== */
export const getDaily = async (req, res) => {
    try {
        const rangeKey = req.query.range ?? "7d";
        const range = getRangeFromQuery(rangeKey);
        const unit = rangeKey === "24h" ? "hour" : "day";

        const { data } = await axios.get(
            `${UMAMI_URL}/websites/${WEBSITE_ID}/pageviews`,
            {
                headers,
                params: { ...range, unit },
            },
        );

        console.log("UMAMI PAGEVIEWS RESPONSE:", data);

        res.json({
            range: rangeKey,
            unit,
            data,
        });
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ message: "Gagal ambil data harian" });
    }
};

/* =====================
   COUNTRIES
===================== */
export const getCountries = async (req, res) => {
    try {
        const range = getRangeFromQuery(req.query.range);

        const { data } = await axios.get(
            `${UMAMI_URL}/websites/${WEBSITE_ID}/metrics`,
            {
                headers,
                params: { ...range, type: "country" },
            },
        );

        res.json(data);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ message: "Gagal ambil data negara" });
    }
};

/* =====================
   PAGES
===================== */
export const getPages = async (req, res) => {
    try {
        const range = getRangeFromQuery(req.query.range);

        const { data } = await axios.get(
            `${UMAMI_URL}/websites/${WEBSITE_ID}/metrics`,
            {
                headers,
                params: { ...range, type: "url" },
            },
        );

        res.json(data);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ message: "Gagal ambil data halaman" });
    }
};

/* =====================
   ENGAGEMENT & BOUNCE
===================== */
export const getEngagement = async (req, res) => {
    try {
        const range = getRangeFromQuery(req.query.range);

        const { data } = await axios.get(
            `${UMAMI_URL}/websites/${WEBSITE_ID}/stats`,
            { headers, params: range },
        );

        const visits = data.visits ?? 0;
        const bounces = data.bounces ?? 0;

        let engagementRate = 0;
        let bounceRate = 0;

        if (visits > 0) {
            bounceRate = Number(((bounces / visits) * 100).toFixed(2));
            engagementRate = Number((100 - bounceRate).toFixed(2));
        }

        res.json({
            range: req.query.range ?? "7d",
            visits,
            bounces,
            engagementRate,
            bounceRate,
        });
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ message: "Gagal hitung engagement" });
    }
};

export const getEngagementCompare = async (req, res) => {
    try {
        const current = getRangeFromQuery(req.query.range);
        const diff = current.endAt - current.startAt;

        const previous = {
            startAt: current.startAt - diff,
            endAt: current.startAt,
        };

        const [currRes, prevRes] = await Promise.all([
            axios.get(`${UMAMI_URL}/websites/${WEBSITE_ID}/stats`, {
                headers,
                params: current,
            }),
            axios.get(`${UMAMI_URL}/websites/${WEBSITE_ID}/stats`, {
                headers,
                params: previous,
            }),
        ]);

        const calcEngagement = (data) => {
            const visits = data.visits ?? 0;
            const bounces = data.bounces ?? 0;
            if (!visits) return 0;

            return Number((100 - (bounces / visits) * 100).toFixed(2));
        };

        res.json({
            current: Number(calcEngagement(currRes.data).toFixed(2)),
            previous: Number(calcEngagement(prevRes.data).toFixed(2)),
        });
    } catch (err) {
        res.status(500).json({ message: "Gagal hitung engagement compare" });
    }
};
