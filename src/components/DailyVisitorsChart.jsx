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
    const [showPageViews, setShowPageViews] = useState(true);
    const [showSessions, setShowSessions] = useState(true);

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

    const labels = rows.map((r) =>
        new Date(r.x).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
        })
    );

    const pageViews = rows.map((r) => r.pageviews ?? r.y);
    const sessions = rows.map((r) => r.sessions ?? Math.round(r.y * 0.4));

    const chartData = {
        labels,
        datasets: [
            showPageViews && {
                label: "Page Views",
                data: pageViews,
                borderColor: "#06b6d4",
                backgroundColor: "rgba(6,182,212,0.15)",
                tension: 0.45,
                borderWidth: 3,
                pointRadius: 3,
                pointHoverRadius: 6,
                pointBorderWidth: 0, // 🔥 tidak ada lubang
                pointBackgroundColor: "#06b6d4",
                fill: true,
            },
            showSessions && {
                label: "Sessions",
                data: sessions,
                borderColor: "#f45b2b",
                backgroundColor: "rgba(244,91,43,0.15)",
                tension: 0.45,
                borderWidth: 2,
                pointRadius: 3,
                pointHoverRadius: 6,
                pointBorderWidth: 0, // 🔥 tidak ada lubang
                pointBackgroundColor: "#f45b2b",
                fill: false,
            },
        ].filter(Boolean),
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 800,
            easing: "easeOutQuart",
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "#ffffff",
                borderColor: "#06b6d4",
                borderWidth: 1,
                titleColor: "#0f172a",
                bodyColor: "#334155",
                padding: 12,
            },
            datalabels: {
                display: false, // 🔥 pastikan tidak ada angka di titik
            },
        },
        scales: {
            x: {
                ticks: { color: "#64748b" },
                grid: { display: false },
            },
            y: {
                ticks: { color: "#64748b" },
                grid: { color: "rgba(0,0,0,0.05)" },
            },
        },
    };

    return (
        <div
            className="
                h-[40vh]
                rounded-2xl
                bg-white
                p-6
                border border-cyan-600/20
                shadow-sm
                shadow-cyan-500/30
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-xl
                hover:shadow-cyan-500/10
                pb-14
            "
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-700">
                    Traffic Overview
                </h3>
                <span className="text-xs text-cyan-600 font-medium">
                    {range.toUpperCase()}
                </span>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowPageViews((v) => !v)}
                        className={`
                            flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
                            transition cursor-pointer
                            ${
                                showPageViews
                                    ? "bg-cyan-100 text-cyan-700"
                                    : "bg-gray-100 text-gray-400"
                            }
                        `}
                    >
                        <span
                            className={`h-2 w-2 rounded-full ${
                                showPageViews ? "bg-cyan-500" : "bg-gray-300"
                            }`}
                        />
                        Page Views
                    </button>

                    <button
                        onClick={() => setShowSessions((v) => !v)}
                        className={`
                            flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
                            transition cursor-pointer
                            ${
                                showSessions
                                    ? "bg-orange-100 text-orange-700"
                                    : "bg-gray-100 text-gray-400"
                            }
                        `}
                    >
                        <span
                            className={`h-2 w-2 rounded-full ${
                                showSessions ? "bg-orange-500" : "bg-gray-300"
                            }`}
                        />
                        Sessions
                    </button>
                </div>
            </div>

            <Line data={chartData} options={options} />
        </div>
    );
}