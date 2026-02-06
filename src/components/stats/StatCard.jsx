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
    const isStable = diff === 0 && previous !== null;

    return (
        <div
            className="
                relative
                h-full
                rounded-2xl
                bg-white
                p-5
                border
                border-cyan-600/20
                shadow-sm
                shadow-cyan-500/20
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
                hover:shadow-cyan-500/30
            "
        >
            {/* accent line */}
            <div className="absolute top-0 inset-x-0 h-1 rounded-t-2xl bg-cyan-500" />

            <p className="text-sm text-slate-500">{title}</p>

            <div className="mt-2 h-[44px] flex items-center">
                {loading ? (
                    <div className="h-8 w-28 rounded bg-slate-200 animate-pulse" />
                ) : (
                    <p className="text-3xl font-bold text-slate-900 tracking-tight">
                        {value}
                        <span className="ml-1 text-lg font-medium text-slate-500">
                            {suffix}
                        </span>
                    </p>
                )}
            </div>

            {/* comparison */}
            <div className="mt-3 text-sm h-[20px]">
                {previous !== null && !loading && (
                    <span
                        className={`inline-flex items-center gap-1 font-medium ${
                            isUp
                                ? "text-cyan-600"
                                : isDown
                                ? "text-red-500"
                                : "text-slate-400"
                        }`}
                    >
                        {isUp && "▲"}
                        {isDown && "▼"}
                        {isStable && "—"}

                        {isStable
                            ? "Stabil dibanding periode lalu"
                            : `${Math.abs(percent)}% dari periode lalu`}
                    </span>
                )}
            </div>
        </div>
    );
}
