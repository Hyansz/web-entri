import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getDaily } from "../api/analytics";

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend
);

export default function DailyVisitorsChart({ range = "7d" }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        getDaily(range)
            .then((res) => {
                setRows(Array.isArray(res.data?.data) ? res.data.data : []);
            })
            .finally(() => setLoading(false));
    }, [range]);

    if (loading) {
        return (
            <div className="h-[300px] flex items-center justify-center text-sm text-gray-400">
                Memuat grafik…
            </div>
        );
    }

    const labels = rows.map((r) => {
        const d = new Date(r.x);
        return range === "24h"
            ? d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
            : d.toLocaleDateString("id-ID", { day: "2-digit", month: "short" });
    });

    const chartData = {
        labels,
        datasets: [
            {
                label: "Page Views",
                data: rows.map((r) => r.y),
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 0,
            },
        ],
    };

    return (
        <div className="h-[320px] rounded-2xl bg-gradient-to-b from-[#111] to-[#0b0b0b] p-5 border border-white/5">
            <h3 className="mb-4 text-sm font-medium text-gray-300">
                Page Views ({range})
            </h3>
            <Line data={chartData} />
        </div>
    );
}
