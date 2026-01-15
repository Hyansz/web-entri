import axios from "axios";

const UMAMI_URL = process.env.UMAMI_URL;
const WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;
const API_KEY = process.env.UMAMI_API_KEY;

const headers = {
    Authorization: `Bearer ${API_KEY}`,
};

const getRange = () => {
    const endAt = Date.now();
    const startAt = endAt - 7 * 24 * 60 * 60 * 1000; // 7 hari
    return { startAt, endAt };
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
