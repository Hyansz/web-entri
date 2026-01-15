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

    // current 7 days
    const currentStart = new Date(now);
    currentStart.setDate(currentStart.getDate() - 7);
    currentStart.setHours(0, 0, 0, 0);

    // previous 7 days
    const prevEnd = new Date(currentStart);
    const prevStart = new Date(prevEnd);
    prevStart.setDate(prevStart.getDate() - 7);

    return {
        current: {
            startAt: currentStart.getTime(),
            endAt,
        },
        previous: {
            startAt: prevStart.getTime(),
            endAt: prevEnd.getTime(),
        },
    };
};

const calcChange = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return Number((((current - previous) / previous) * 100).toFixed(2));
};

// ✅ SUMMARY
export const getSummary = async (req, res) => {
    try {
        const { startAt, endAt } = getRange();

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

export const getSummaryCompare = async (req, res) => {
    try {
        const { current, previous } = getRange();

        const [currentRes, previousRes] = await Promise.all([
            axios.get(`${UMAMI_URL}/websites/${WEBSITE_ID}/stats`, {
                headers,
                params: current,
            }),
            axios.get(`${UMAMI_URL}/websites/${WEBSITE_ID}/stats`, {
                headers,
                params: previous,
            }),
        ]);

        const cur = currentRes.data;
        const prev = previousRes.data;

        const bounceRateCur =
            cur.visits > 0 ? (cur.bounces / cur.visits) * 100 : 0;
        const bounceRatePrev =
            prev.visits > 0 ? (prev.bounces / prev.visits) * 100 : 0;

        res.json({
            visitors: {
                value: cur.visitors,
                change: calcChange(cur.visitors, prev.visitors),
            },
            pageviews: {
                value: cur.pageviews,
                change: calcChange(cur.pageviews, prev.pageviews),
            },
            sessions: {
                value: cur.visits,
                change: calcChange(cur.visits, prev.visits),
            },
            bounceRate: {
                value: Number(bounceRateCur.toFixed(2)),
                change: calcChange(bounceRateCur, bounceRatePrev),
            },
        });
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ message: "Gagal ambil perbandingan statistik" });
    }
};
