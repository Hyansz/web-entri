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
    Legend,
);

export default function DailyVisitorsChart({ range = "7d" }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getDaily(range)
            .then((rows) => setRows(rows))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [range]);

    if (loading) {
        return (
            <div className="h-[320px] flex items-center justify-center text-gray-400 animate-pulse">
                Memuat grafik…
            </div>
        );
    }

    if (!rows.length) {
        return (
            <div className="h-[320px] flex items-center justify-center text-gray-500">
                Tidak ada data
            </div>
        );
    }

    const chartData = {
        labels: rows.map((r) =>
            new Date(r.x).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
            }),
        ),
        datasets: [
            {
                label: "Page Views",
                data: rows.map((r) => r.y),
                tension: 0.45,
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 6,

                borderColor: "#06b6d4", // cyan-500
                backgroundColor: "rgba(6,182,212,0.15)",
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 900,
            easing: "easeOutQuart",
        },
        plugins: {
            legend: {
                labels: {
                    color: "#334155", // slate-700
                    font: { weight: 600 },
                },
            },
            tooltip: {
                backgroundColor: "#ffffff",
                borderColor: "#06b6d4",
                borderWidth: 1,
                titleColor: "#0f172a",
                bodyColor: "#334155",
                padding: 12,
            },
        },
        scales: {
            x: {
                ticks: { color: "#64748b" },
                grid: { color: "rgba(0,0,0,0.05)" },
            },
            y: {
                ticks: { color: "#64748b" },
                grid: { color: "rgba(0,0,0,0.05)" },
            },
        },
    };

    return (
        <div className="
            h-[40vh]
            rounded-2xl
            bg-white
            p-6
            border border-gray-200
            shadow-sm
            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-xl
            pb-14
        ">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-700">
                    Page Views
                </h3>
                <span className="text-xs text-cyan-600 font-medium">
                    {range.toUpperCase()}
                </span>
            </div>

            <Line data={chartData} options={options} />
        </div>
    );
}
