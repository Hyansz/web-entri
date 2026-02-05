import { useEffect, useState } from "react";
import { getPages } from "../../api/analytics";

export default function TopPages({ range }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        getPages(range)
            .then((data) => {
                console.log("🔥 TOP PAGES RAW:", data);

                const normalized = Array.isArray(data)
                    ? data.map((r) => ({
                          page: r.page || r.url || r.path || r.x || "-",
                          views: r.views ?? r.y ?? r.count ?? 0,
                      }))
                    : [];

                setRows(normalized);
            })
            .catch((err) => {
                console.error("❌ TOP PAGES ERROR:", err);
                setRows([]);
            })
            .finally(() => setLoading(false));
    }, [range]);

    return (
        <div className="relative h-full rounded-2xl bg-white p-5 border border-cyan-500/30 shadow-md shadow-cyan-600/20">
            <h3 className="mb-4 text-sm font-semibold text-slate-700">
                Top Pages
            </h3>

            {loading ? (
                <p className="text-sm text-gray-500">Loading…</p>
            ) : rows.length === 0 ? (
                <p className="text-sm text-gray-500">No data</p>
            ) : (
                <ul className="space-y-2 text-sm">
                    {rows.slice(0, 6).map((r, i) => (
                        <div>
                            <li
                                key={i}
                                className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-cyan-50 transition"
                            >
                                <span
                                    title={r.page}
                                    className="max-w-[70%] truncate text-slate-600"
                                >
                                    {r.page}
                                </span>
                                <span className="font-semibold text-slate-900">
                                    {r.views}
                                </span>
                            </li>
                            <hr className="text-cyan-800/20 w-[98%] mx-auto" />
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
}
