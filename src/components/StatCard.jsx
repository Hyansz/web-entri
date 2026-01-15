export default function StatCard({
    title,
    value,
    change,
    direction = "up",
    loading = false,
}) {
    const isUp = direction === "up";

    return (
        <div className="h-full rounded-2xl bg-gradient-to-b from-[#111] to-[#0b0b0b] p-5 shadow-md border border-white/5 flex flex-col justify-between">
            {/* TITLE */}
            <p className="text-sm text-gray-400">{title}</p>

            {/* VALUE (FIX HEIGHT) */}
            <div className="mt-2 h-[40px] flex items-center">
                {loading ? (
                    <div className="h-7 w-24 rounded bg-gray-700/40 animate-pulse" />
                ) : (
                    <p className="text-3xl font-bold text-white leading-none">
                        {value}
                    </p>
                )}
            </div>

            {/* CHANGE (FIX HEIGHT) */}
            <div className="mt-3 h-[20px] flex items-center text-sm">
                {loading ? (
                    <div className="h-4 w-20 rounded bg-gray-700/40 animate-pulse" />
                ) : (
                    <span
                        className={`flex items-center gap-1 font-medium ${
                            isUp ? "text-emerald-400" : "text-red-400"
                        }`}
                    >
                        {isUp ? "↑" : "↓"} {change}%
                    </span>
                )}
            </div>
        </div>
    );
}
