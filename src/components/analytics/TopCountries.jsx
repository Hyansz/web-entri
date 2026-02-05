import { useEffect, useState } from "react";
import { getCountries } from "../../api/analytics";

export default function TopCountries({ range }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        getCountries(range)
            .then((data) => {
                console.log("✅ TOP COUNTRIES RAW:", data);
                setRows(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.error("❌ TOP COUNTRIES ERROR:", err);
                setRows([]);
            })
            .finally(() => setLoading(false));
    }, [range]);

    return (
        <div className="relative h-full rounded-2xl bg-white p-5 border border-gray-200 shadow-sm">
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-cyan-500" />

            <h3 className="mb-4 text-sm font-semibold text-slate-700">
                Top Countries
            </h3>

            {loading ? (
                <p className="text-sm text-gray-500">Loading…</p>
            ) : rows.length === 0 ? (
                <p className="text-sm text-gray-500">No data</p>
            ) : (
                <ul className="space-y-2 text-sm">
                    {rows.slice(0, 6).map((r, i) => (
                        <li
                            key={i}
                            className="flex justify-between rounded-lg px-3 py-2 hover:bg-cyan-50"
                        >
                            <span className="text-slate-600">{r.x}</span>
                            <span className="font-semibold text-slate-900">
                                {r.y}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
