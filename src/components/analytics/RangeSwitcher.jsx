const ranges = [
    { label: "24 Jam", value: "24h" },
    { label: "7 Hari", value: "7d" },
    { label: "30 Hari", value: "30d" },
];

export default function RangeSwitcher({ value, onChange }) {
    return (
        <div className="flex gap-1 rounded-xl bg-[#111] p-1 border border-white/10">
            {ranges.map((r) => (
                <button
                    key={r.value}
                    onClick={() => onChange(r.value)}
                    className={`px-3 py-1 text-sm rounded-lg transition ${
                        value === r.value
                            ? "bg-white text-black"
                            : "text-gray-400 hover:text-white"
                    }`}
                >
                    {r.label}
                </button>
            ))}
        </div>
    );
}
