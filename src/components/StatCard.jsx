export default function StatCard({
    title,
    today = 0,
    yesterday = 0,
    loading = false,
}) {
    const diff = today - yesterday;

    const percent =
        yesterday > 0 ? ((diff / yesterday) * 100).toFixed(1) : 0;

    const isUp = diff > 0;
    const isDown = diff < 0;

    return (
        <div className="h-full rounded-2xl bg-gradient-to-b from-[#111] to-[#0b0b0b] p-5 shadow-md border border-white/5 flex flex-col justify-between">
            {/* TITLE */}
            <p className="text-sm text-gray-400">{title}</p>

            {/* VALUE */}
            <div className="mt-2 h-[40px] flex items-center">
                {loading ? (
                    <div className="h-7 w-24 rounded bg-gray-700/40 animate-pulse" />
                ) : (
                    <p className="text-3xl font-bold text-white leading-none">
                        {today}
                    </p>
                )}
            </div>

            {/* CHANGE */}
            <div className="mt-3 h-[20px] flex items-center text-sm">
                {loading ? (
                    <div className="h-4 w-24 rounded bg-gray-700/40 animate-pulse" />
                ) : (
                    <span
                        className={`flex items-center gap-1 font-medium ${
                            isUp
                                ? "text-emerald-400"
                                : isDown
                                ? "text-red-400"
                                : "text-gray-400"
                        }`}
                    >
                        {isUp && "↑"}
                        {isDown && "↓"}
                        {!diff && "—"}

                        {!diff
                            ? "No change"
                            : `${Math.abs(percent)}% vs kemarin`}
                    </span>
                )}
            </div>
        </div>
    );
}
