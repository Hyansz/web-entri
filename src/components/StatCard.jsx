export default function StatCard({ title, value, sub }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">
                {Number(value).toLocaleString("id-ID")}
            </p>
            {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
        </div>
    );
}
