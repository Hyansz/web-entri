export default function StatCard({
    title,
    value = 0,
    previous = null,
    suffix = "",
    loading = false,
}) {
    let diff = 0;
    let percent = 0;

    if (previous !== null) {
        diff = value - previous;
        percent =
            previous > 0
                ? ((diff / previous) * 100).toFixed(1)
                : 0;
    }

    const isUp = diff > 0;
    const isDown = diff < 0;

    return (
        <div className="
            relative
            h-full
            rounded-2xl
            bg-white
            p-5
            border border-gray-200
            shadow-sm
            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-lg
        ">
            {/* Accent bar */}
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-cyan-500" />

            <p className="text-sm text-gray-500">{title}</p>

            <div className="mt-2 h-[44px] flex items-center">
                {loading ? (
                    <div className="h-8 w-28 rounded bg-gray-200 animate-pulse" />
                ) : (
                    <p className="text-3xl font-bold text-slate-900 tracking-tight">
                        {value}
                        <span className="text-lg font-medium text-slate-500">
                            {suffix}
                        </span>
                    </p>
                )}
            </div>

            <div className="mt-3 text-sm">
                {previous !== null && !loading && (
                    <span
                        className={`inline-flex items-center gap-1 font-medium ${
                            isUp
                                ? "text-cyan-600"
                                : isDown
                                ? "text-red-500"
                                : "text-gray-400"
                        }`}
                    >
                        {isUp && "▲"}
                        {isDown && "▼"}
                        {!diff && "—"}
                        {!diff
                            ? "Tidak ada perubahan"
                            : `${Math.abs(percent)}% dari periode lalu`}
                    </span>
                )}
            </div>
        </div>
    );
}
