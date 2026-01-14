import { useEffect, useState } from "react";
import { getDaily } from "../api/analytics";

export default function DailyChart() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDaily()
            .then((res) => {
                // 🔒 UMAMI RESPONSE AMAN
                const rows = Array.isArray(res.data?.data) ? res.data.data : [];

                setData(
                    rows.map((item) => ({
                        date: item.x, // tanggal
                        views: item.y, // jumlah
                    }))
                );
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="h-32 flex items-center justify-center text-sm text-gray-400">
                Memuat grafik…
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-4 shadow">
            <h3 className="font-semibold mb-3 text-gray-700">
                Kunjungan Harian
            </h3>

            <ul className="space-y-1 text-sm">
                {data.map((item, i) => (
                    <li key={i} className="flex justify-between border-b pb-1">
                        <span>{item.date}</span>
                        <span className="font-medium">{item.views}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
