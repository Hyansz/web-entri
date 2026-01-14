import axios from "axios";

const UMAMI_URL = process.env.UMAMI_URL;
const WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;
const API_KEY = process.env.UMAMI_API_KEY;

const headers = {
    Authorization: `Bearer ${API_KEY}`,
};

export const getSummary = async (req, res) => {
    try {
        const { data } = await axios.get(
            `${UMAMI_URL}/api/websites/${WEBSITE_ID}/stats`,
            { headers }
        );
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Gagal ambil summary Umami" });
    }
};

export const getDaily = async (req, res) => {
    try {
        const { data } = await axios.get(
            `${UMAMI_URL}/api/websites/${WEBSITE_ID}/pageviews`,
            { headers }
        );
        res.json(data);
    } catch {
        res.status(500).json({ message: "Gagal ambil data harian" });
    }
};

export const getCountries = async (req, res) => {
    try {
        const { data } = await axios.get(
            `${UMAMI_URL}/api/websites/${WEBSITE_ID}/countries`,
            { headers }
        );
        res.json(data);
    } catch {
        res.status(500).json({ message: "Gagal ambil data negara" });
    }
};

export const getPages = async (req, res) => {
    try {
        const { data } = await axios.get(
            `${UMAMI_URL}/api/websites/${WEBSITE_ID}/pages`,
            { headers }
        );
        res.json(data);
    } catch {
        res.status(500).json({ message: "Gagal ambil data halaman" });
    }
};
