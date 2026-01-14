import { useEffect, useState } from "react";
import { getCountries } from "../../api/analytics";

export default function TopCountries() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCountries()
            .then((res) => {
                // 🔒 AMAN DARI OBJECT / NULL
                const rows = Array.isArray(res.data?.data) ? res.data.data : [];

                setCountries(rows);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="h-32 flex items-center justify-center text-sm text-gray-400">
                Memuat negara…
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-4 shadow">
            <h3 className="font-semibold mb-3 text-gray-700">Top Negara</h3>

            <ul className="space-y-2 text-sm">
                {countries.slice(0, 5).map((item, i) => (
                    <li key={i} className="flex justify-between">
                        <span>{item.x}</span>
                        <span className="font-medium">{item.y}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
