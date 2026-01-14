import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getDaily } from "../../api/analytics";

export default function DailyChart() {
    const [chart, setChart] = useState(null);

    useEffect(() => {
        getDaily().then((res) => {
            setChart({
                labels: res.data.map((i) => i.x),
                datasets: [
                    {
                        label: "Kunjungan Harian",
                        data: res.data.map((i) => i.y),
                        tension: 0.4,
                    },
                ],
            });
        });
    }, []);

    if (!chart) return null;

    return (
        <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="font-semibold mb-4">Grafik Kunjungan Harian</h2>
            <Line data={chart} />
        </div>
    );
}
