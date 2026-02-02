import axios from "axios";

const UMAMI_URL = process.env.UMAMI_URL;
const WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;
const API_KEY = process.env.UMAMI_API_KEY;

const headers = {
    Authorization: `Bearer ${API_KEY}`,
};

const getRange = () => {
    const now = new Date();

    const endAt = now.getTime();

    const start = new Date(now);
    start.setDate(start.getDate() - 7);
    start.setHours(0, 0, 0, 0);

    return {
        startAt: start.getTime(),
        endAt,
    };
};

// ✅ SUMMARY
export const getSummaryCompare = async (req, res) => {
    try {
        const today = getTodayRange();
        const yesterday = getYesterdayRange();

        const [todayRes, yesterdayRes] = await Promise.all([
            axios.get(
                `${UMAMI_URL}/websites/${WEBSITE_ID}/stats`,
                { headers, params: today }
            ),
            axios.get(
                `${UMAMI_URL}/websites/${WEBSITE_ID}/stats`,
                { headers, params: yesterday }
            ),
        ]);

        res.json({
            visitors: {
                current: todayRes.data.visitors ?? 0,
                previous: yesterdayRes.data.visitors ?? 0,
            },
            pageviews: {
                current: todayRes.data.pageviews ?? 0,
                previous: yesterdayRes.data.pageviews ?? 0,
            },
            sessions: {
                current: todayRes.data.sessions ?? 0,
                previous: yesterdayRes.data.sessions ?? 0,
            },
        });
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ message: "Gagal bandingkan analytics" });
    }
};

// ✅ DAILY PAGEVIEWS
export const getDaily = async (req, res) => {
    try {
        const { startAt, endAt } = getRange();

        const { data } = await axios.get(
            `${UMAMI_URL}/websites/${WEBSITE_ID}/pageviews`,
            {
                headers,
                params: {
                    startAt,
                    endAt,
                    unit: "day",
                },
            }
        );

        res.json(data);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ message: "Gagal ambil data harian" });
    }
};

// ✅ COUNTRIES
export const getCountries = async (req, res) => {
    try {
        const { startAt, endAt } = getRange();

        const { data } = await axios.get(
            `${UMAMI_URL}/websites/${WEBSITE_ID}/metrics`,
            {
                headers,
                params: {
                    startAt,
                    endAt,
                    type: "country",
                },
            }
        );

        res.json(data);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ message: "Gagal ambil data negara" });
    }
};

// ✅ PAGES
export const getPages = async (req, res) => {
    try {
        const { startAt, endAt } = getRange();

        const { data } = await axios.get(
            `${UMAMI_URL}/websites/${WEBSITE_ID}/metrics`,
            {
                headers,
                params: {
                    startAt,
                    endAt,
                    type: "page",
                },
            }
        );

        res.json(data);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ message: "Gagal ambil data halaman" });
    }
};

export const getBounceRate = async (req, res) => {
    try {
        const endAt = Date.now();
        const startAt = endAt - 7 * 24 * 60 * 60 * 1000; // 7 hari

        const { data } = await axios.get(
            `${UMAMI_URL}/websites/${WEBSITE_ID}/stats`,
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                },
                params: { startAt, endAt },
            }
        );

        const visits = data.visits ?? 0;
        const bounces = data.bounces ?? 0;

        const bounceRate = visits > 0 ? (bounces / visits) * 100 : 0;

        res.json({
            bounceRate: Number(bounceRate.toFixed(2)),
            visits,
            bounces,
        });
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ message: "Gagal hitung bounce rate" });
    }
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

    const end = new Date(now);
    end.setDate(end.getDate() - 1);

    const start = new Date(end);
    start.setHours(0, 0, 0, 0);

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
