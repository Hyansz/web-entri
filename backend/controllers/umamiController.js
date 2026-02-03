import axios from "axios";

const UMAMI_URL = process.env.UMAMI_URL;
const WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;
const API_KEY = process.env.UMAMI_API_KEY;

const headers = {
    Authorization: `Bearer ${API_KEY}`,
};

// =====================
// RANGE HELPERS
// =====================
const getRange7Days = () => {
    const now = new Date();

    const start = new Date(now);
    start.setDate(start.getDate() - 7);
    start.setHours(0, 0, 0, 0);

    return {
        startAt: start.getTime(),
        endAt: now.getTime(),
    };
};

const getTodayRange = () => {
    const now = new Date();
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);

    return {
        startAt: start.getTime(),
        endAt: now.getTime(),
    };
};

const getYesterdayRange = () => {
    const now = new Date();

    const start = new Date(now);
    start.setDate(start.getDate() - 1);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setHours(
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        0
    );

    return {
        startAt: start.getTime(),
        endAt: end.getTime(),
    };
};

// =====================
// SUMMARY
// =====================
export const getSummary = async (req, res) => {
    try {
        const { startAt, endAt } = getRange7Days();

        const { data } = await axios.get(
            `${UMAMI_URL}/websites/${WEBSITE_ID}/stats`,
            {
                headers,
                params: { startAt, endAt },
            }
        );

        res.json(data);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ message: "Gagal ambil summary Umami" });
    }
};

// =====================
// SUMMARY COMPARE (TODAY vs YESTERDAY)
// =====================
export const getSummaryCompare = async (req, res) => {
    try {
        const todayRange = getTodayRange();
        const yesterdayRange = getYesterdayRange();

        const [today, yesterday] = await Promise.all([
            axios.get(
                `${UMAMI_URL}/websites/${WEBSITE_ID}/stats`,
                { headers, params: todayRange }
            ),
            axios.get(
                `${UMAMI_URL}/websites/${WEBSITE_ID}/stats`,
                { headers, params: yesterdayRange }
            ),
        ]);

        res.json({
            today: today.data,
            yesterday: yesterday.data,
        });
    } catch (err) {
        console.error("SUMMARY COMPARE ERROR:");
        console.error(err.response?.data || err.message);

        res.status(500).json({
            message: "Umami summary-compare error",
        });
    }
};

// =====================
// DAILY
// =====================
export const getDaily = async (req, res) => {
    try {
        const { startAt, endAt } = getRange7Days();

        const { data } = await axios.get(
            `${UMAMI_URL}/websites/${WEBSITE_ID}/pageviews`,
            {
                headers,
                params: { startAt, endAt, unit: "day" },
            }
        );

        res.json(data);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ message: "Gagal ambil data harian" });
    }
};

// =====================
// COUNTRIES
// =====================
export const getCountries = async (req, res) => {
    try {
        const { startAt, endAt } = getRange7Days();

        const { data } = await axios.get(
            `${UMAMI_URL}/websites/${WEBSITE_ID}/metrics`,
            {
                headers,
                params: { startAt, endAt, type: "country" },
            }
        );

        res.json(data);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ message: "Gagal ambil data negara" });
    }
};

// =====================
// PAGES
// =====================
export const getPages = async (req, res) => {
    try {
        const { startAt, endAt } = getRange7Days();

        const { data } = await axios.get(
            `${UMAMI_URL}/websites/${WEBSITE_ID}/metrics`,
            {
                headers,
                params: { startAt, endAt, type: "page" },
            }
        );

        res.json(data);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ message: "Gagal ambil data halaman" });
    }
};

// =====================
// BOUNCE RATE
// =====================
export const getBounceRate = async (req, res) => {
    try {
        const todayRange = getTodayRange();
        const yesterdayRange = getYesterdayRange();

        const [todayRes, yesterdayRes] = await Promise.all([
            axios.get(
                `${UMAMI_URL}/websites/${WEBSITE_ID}/stats`,
                { headers, params: todayRange }
            ),
            axios.get(
                `${UMAMI_URL}/websites/${WEBSITE_ID}/stats`,
                { headers, params: yesterdayRange }
            ),
        ]);

        const calc = (data) => {
            const visits = data.visits ?? 0;
            const bounces = data.bounces ?? 0;
            return visits > 0
                ? Number(((bounces / visits) * 100).toFixed(2))
                : 0;
        };

        res.json({
            today: calc(todayRes.data),
            yesterday: calc(yesterdayRes.data),
        });
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ message: "Gagal hitung bounce rate" });
    }
};
