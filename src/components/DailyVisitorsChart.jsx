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

export default function DailyVisitorsChart() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDaily()
            .then((res) => {
                /**
                 * 🔒 RESPONSE UMAMI:
                 * {
                 *   pageviews: [{ x, y }],
                 *   sessions: [{ x, y }]
                 * }
                 */
                const safeRows = Array.isArray(res.data?.sessions)
                    ? res.data.sessions
                    : [];

                setRows(safeRows);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="h-40 flex items-center justify-center text-sm text-gray-400">
                Memuat grafik…
            </div>
        );
    }

    const chartData = {
        labels: rows.map((r) =>
            new Date(r.x).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
            })
        ),
        datasets: [
            {
                label: "Sessions",
                data: rows.map((r) => r.y),
                tension: 0.4,
            },
        ],
    };

    return (
        <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="font-semibold mb-3 text-gray-700">
                Sessions Harian
            </h3>

            <Line data={chartData} />
        </div>
    );
}
