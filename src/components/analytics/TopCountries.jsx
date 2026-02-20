import { useEffect, useState } from "react";
import { getCountries } from "../../api/analytics";

// 🔥 Auto convert ISO → Full Name (GLOBAL SUPPORT)
const regionNames = new Intl.DisplayNames(["en"], {
    type: "region",
});

export default function TopCountries({ range }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getCountries(range)
            .then((data) => {
                setRows(Array.isArray(data) ? data : []);
            })
            .catch(() => setRows([]))
            .finally(() => setLoading(false));
    }, [range]);

    return (
        <div className="relative h-full rounded-2xl bg-white p-5 border border-cyan-500/30 shadow-md shadow-cyan-600/20">
            <h3 className="mb-4 text-sm font-semibold text-slate-700">
                Top Countries
            </h3>

            {loading ? (
                <p className="text-sm text-gray-500">Loading…</p>
            ) : rows.length === 0 ? (
                <p className="text-sm text-gray-500">No data</p>
            ) : (
                <ul className="space-y-2 text-sm">
                    {rows.slice(0, 6).map((r, i) => {
                        const code = r.x?.toUpperCase();
                        const fullName =
                            regionNames.of(code) || code;

                        return (
                            <div key={i}>
                                <li className="group relative flex justify-between items-center rounded-lg px-3 py-2 hover:bg-cyan-50 transition cursor-pointer">
                                    
                                    <span className="flex items-center gap-3 text-slate-700 font-medium">
                                        <img
                                            src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
                                            alt={code}
                                            className="w-6 h-4 object-cover rounded-sm shadow-sm"
                                        />
                                        {code}
                                    </span>

                                    <span className="font-semibold text-slate-900">
                                        {r.y}
                                    </span>

                                    {/* 🔥 Tooltip Auto */}
                                    <div className="
                                        absolute left-3 -top-8
                                        opacity-0 group-hover:opacity-100
                                        transition duration-200
                                        bg-slate-800 text-white text-xs
                                        px-2 py-1 rounded-md shadow-md
                                        whitespace-nowrap
                                        pointer-events-none
                                    ">
                                        {fullName}
                                    </div>
                                </li>

                                <hr className="text-cyan-800/20 w-[98%] mx-auto" />
                            </div>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}