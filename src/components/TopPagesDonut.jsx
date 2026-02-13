import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getPages } from "../api/analytics";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// 🎨 WARNA: gelap → terang
const CYAN_SCALE = [
    "#0e7490", // paling gelap
    "#0891b2",
    "#06b6d4",
    "#22d3ee",
    "#67e8f9",
];

export default function TopPagesDonut({ range = "7d" }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getPages(range)
            .then((data) => {
                const normalized = Array.isArray(data)
                    ? data.map((r) => ({
                          value: r.views ?? r.y ?? r.count ?? 0,
                      }))
                    : [];
                setRows(normalized);
            })
            .catch(() => setRows([]))
            .finally(() => setLoading(false));
    }, [range]);

    if (loading) {
        return (
            <div className="h-[320px] flex items-center justify-center text-gray-400 animate-pulse">
                Memuat diagram…
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

    // 🔑 SORT DESC
    const sorted = [...rows].sort((a, b) => b.value - a.value);
    const top = sorted.slice(0, 5);
    const others = sorted.slice(5).reduce((s, r) => s + r.value, 0);

    const values = [...top.map((r) => r.value), ...(others ? [others] : [])];
    const total = values.reduce((a, b) => a + b, 0);

    const colors = [
        ...CYAN_SCALE.slice(0, top.length),
        ...(others ? ["#e5e7eb"] : []), // Others abu-abu
    ];

    const chartData = {
        labels: values.map((_, i) =>
            i < 5 ? `Top ${i + 1}` : "Others"
        ),
        datasets: [
            {
                data: values,
                backgroundColor: colors,
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "72%",
        plugins: {
            legend: {
                display: false, // ❌ legend bawah dihilangkan
            },
            tooltip: {
                backgroundColor: "#ffffff",
                borderColor: "#06b6d4",
                borderWidth: 1,
                titleColor: "#0f172a",
                bodyColor: "#334155",
                padding: 10,
                callbacks: {
                    label: (ctx) => {
                        const val = ctx.raw;
                        const pct = ((val / total) * 100).toFixed(1);
                        return `${pct}% (${val} views)`;
                    },
                },
            },
            datalabels: {
                color: "#0f172a",
                font: {
                    weight: "600",
                    size: 12,
                },
                formatter: (value) => {
                    const pct = (value / total) * 100;
                    return pct >= 6 ? `${pct.toFixed(0)}%` : "";
                },
            },
        },
    };

    return (
        <div
            className="
                h-[50vh]
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
                flex flex-col
            "
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-700">
                    Traffic Distribution
                </h3>
                <span className="text-xs text-cyan-600 font-medium">
                    {range.toUpperCase()}
                </span>
            </div>

            {/* 🔥 CENTER DONUT */}
            <div className="flex-1 flex items-center justify-center">
                <div className="relative w-[260px] h-[260px]">
                    <Doughnut data={chartData} options={options} />
                </div>
            </div>
        </div>
    );
}
