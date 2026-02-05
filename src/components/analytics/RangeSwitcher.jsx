const ranges = [
    { label: "24 Jam", value: "24h" },
    { label: "7 Hari", value: "7d" },
    { label: "30 Hari", value: "30d" },
];

export default function RangeSwitcher({ value, onChange }) {
    return (
        <div
            className="
                inline-flex
                items-center
                gap-1
                rounded-xl
                bg-white
                p-1.5
                border border-slate-200
                shadow-sm
            "
        >
            {ranges.map((r) => {
                const active = value === r.value;

                return (
                    <button
                        key={r.value}
                        onClick={() => onChange(r.value)}
                        className={`
                            px-4 py-1.5
                            text-sm font-medium
                            rounded-lg
                            transition-all duration-200 ease-out cursor-pointer
                            ${
                                active
                                    ? "bg-cyan-500 text-white shadow-sm"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                            }
                        `}
                    >
                        {r.label}
                    </button>
                );
            })}
        </div>
    );
}
