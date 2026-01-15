import axios from "axios";

const UMAMI_URL = process.env.UMAMI_URL;
const WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;
const API_KEY = process.env.UMAMI_API_KEY;

const headers = {
    Authorization: `Bearer ${API_KEY}`,
};

const now = Date.now();
const startAt = now - 7 * 24 * 60 * 60 * 1000; // 7 hari

export const getSummary = async (req, res) => {
    try {
        const { data } = await axios.get(
            `${UMAMI_URL}/api/websites/${WEBSITE_ID}/stats`,
            {
                headers,
                params: {
                    startAt,
                    endAt: now,
                },
            }
        );
        res.json(data);
    } catch (err) {
        res.status(500).json({
            message: "Gagal ambil summary Umami",
            error: err.response?.data,
        });
    }
};

export const getDaily = async (req, res) => {
    try {
        const { data } = await axios.get(
            `${UMAMI_URL}/api/websites/${WEBSITE_ID}/pageviews`,
            {
                headers,
                params: {
                    startAt,
                    endAt: now,
                    unit: "day",
                },
            }
        );
        res.json(data);
    } catch (err) {
        res.status(500).json({
            message: "Gagal ambil data harian",
            error: err.response?.data,
        });
    }
};

export const getCountries = async (req, res) => {
    try {
        const { data } = await axios.get(
            `${UMAMI_URL}/api/websites/${WEBSITE_ID}/countries`,
            {
                headers,
                params: {
                    startAt,
                    endAt: now,
                },
            }
        );
        res.json(data);
    } catch (err) {
        res.status(500).json({
            message: "Gagal ambil data negara",
            error: err.response?.data,
        });
    }
};

export const getPages = async (req, res) => {
    try {
        const { data } = await axios.get(
            `${UMAMI_URL}/api/websites/${WEBSITE_ID}/pages`,
            {
                headers,
                params: {
                    startAt,
                    endAt: now,
                },
            }
        );
        res.json(data);
    } catch (err) {
        res.status(500).json({
            message: "Gagal ambil data halaman",
            error: err.response?.data,
        });
    }
};
