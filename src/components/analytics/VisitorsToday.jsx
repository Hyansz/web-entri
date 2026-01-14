import { useEffect, useState } from "react";
import { getSummary } from "../../api/analytics";

export default function VisitorsToday() {
    const [data, setData] = useState(null);

    useEffect(() => {
        getSummary().then((res) => setData(res.data));
    }, []);

    if (!data) return null;

    return (
        <div className="bg-white rounded-2xl p-6 shadow">
            <p className="text-sm text-gray-500">Pengunjung Hari Ini</p>
            <p className="text-3xl font-bold text-cyan-600">
                {data.visitors.value}
            </p>
        </div>
    );
}
