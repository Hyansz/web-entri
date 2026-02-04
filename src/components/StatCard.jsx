export default function StatCard({
    title,
    value = 0,
    previous = null,
    loading = false,
    suffix = "", // "%", "x", dll
}) {
    const isComparable =
        typeof previous === "number" && !Number.isNaN(previous);

    const diff = isComparable ? value - previous : 0;

    const percent =
        isComparable && previous !== 0
            ? ((diff / previous) * 100).toFixed(1)
            : null;

    const trend =
        !isComparable || diff === 0
            ? "neutral"
            : diff > 0
            ? "up"
            : "down";

    const trendColor =
        trend === "up"
            ? "text-emerald-400"
            : trend === "down"
            ? "text-red-400"
            : "text-gray-400";

    return (
        <div className="h-full rounded-2xl bg-gradient-to-b from-[#111] to-[#0b0b0b] p-5 border border-white/5 shadow-md flex flex-col justify-between">
            {/* TITLE */}
            <p className="text-sm text-gray-400">{title}</p>

            {/* VALUE */}
            <div className="mt-2 h-[42px] flex items-end">
                {loading ? (
                    <div className="h-7 w-24 rounded bg-gray-700/40 animate-pulse" />
                ) : (
                    <p className="text-3xl font-bold text-white leading-none">
                        {value}
                        {suffix && (
                            <span className="ml-1 text-xl text-gray-400">
                                {suffix}
                            </span>
                        )}
                    </p>
                )}
            </div>

            {/* CHANGE */}
            <div className="mt-3 h-[20px] flex items-center text-sm">
                {loading ? (
                    <div className="h-4 w-24 rounded bg-gray-700/40 animate-pulse" />
                ) : (
                    <span
                        className={`flex items-center gap-1 font-medium ${trendColor}`}
                    >
                        {trend === "up" && "↑"}
                        {trend === "down" && "↓"}
                        {trend === "neutral" && "—"}

                        {trend === "neutral"
                            ? "No change"
                            : `${Math.abs(percent)}% vs sebelumnya`}
                    </span>
                )}
            </div>
        </div>
    );
}
