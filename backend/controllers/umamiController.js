import axios from "axios";

const ONE_DAY = 24 * 60 * 60 * 1000;

const getRange = () => {
    const endAt = Date.now();
    const startAt = endAt - ONE_DAY; // 24 jam terakhir
    return { startAt, endAt };
};

const UMAMI_URL = process.env.UMAMI_URL;
const WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;
const API_KEY = process.env.UMAMI_API_KEY;

const headers = {
    Authorization: `Bearer ${API_KEY}`,
};

export const getSummary = async (req, res) => {
    try {
        const { startAt, endAt } = getRange();

        const { data } = await axios.get(
            `${UMAMI_URL}/api/websites/${WEBSITE_ID}/stats`,
            {
                headers,
                params: { startAt, endAt },
            }
        );

        res.json(data);
    } catch (err) {
        res.status(500).json({
            message: "Gagal ambil summary Umami",
            error: err?.response?.data,
        });
    }
};

export const getDaily = async (req, res) => {
    try {
        const { startAt, endAt } = getRange();

        console.log({
            UMAMI_URL,
            WEBSITE_ID,
            headers,
            startAt,
            endAt,
        });

        const { data } = await axios.get(
            `${UMAMI_URL}/api/websites/${WEBSITE_ID}/pageviews`,
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
        res.status(500).json({
            message: "Gagal ambil data harian",
            error: err?.response?.data,
        });
    }
};

export const getCountries = async (req, res) => {
    try {
        const { startAt, endAt } = getRange();

        console.log({
            UMAMI_URL,
            WEBSITE_ID,
            headers,
            startAt,
            endAt,
        });

        const { data } = await axios.get(
            `${UMAMI_URL}/api/websites/${WEBSITE_ID}/countries`,
            {
                headers,
                params: { startAt, endAt },
            }
        );

        res.json(data);
    } catch (err) {
        res.status(500).json({
            message: "Gagal ambil data negara",
            error: err?.response?.data,
        });
    }
};

export const getPages = async (req, res) => {
    try {
        const { startAt, endAt } = getRange();

        const { data } = await axios.get(
            `${UMAMI_URL}/api/websites/${WEBSITE_ID}/pages`,
            {
                headers,
                params: { startAt, endAt },
            }
        );

        res.json(data);
    } catch (err) {
        res.status(500).json({
            message: "Gagal ambil data halaman",
            error: err?.response?.data,
        });
    }
};
