export default function RangeSelector({ value, onChange }) {
    const ranges = [
        { label: "24 Jam", value: "24h" },
        { label: "7 Hari", value: "7d" },
        { label: "30 Hari", value: "30d" },
    ];

    return (
        <div className="flex gap-2">
            {ranges.map((r) => (
                <button
                    key={r.value}
                    onClick={() => onChange(r.value)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition
                        ${
                            value === r.value
                                ? "bg-white text-black"
                                : "bg-white/5 text-gray-400 hover:bg-white/10"
                        }`}
                >
                    {r.label}
                </button>
            ))}
        </div>
    );
}
