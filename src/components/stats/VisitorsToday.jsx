import { useEffect, useState } from "react";
import { getSummaryCompare } from "../../api/analytics";

export default function VisitorsToday() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getSummaryCompare();
                setData(res);
            } catch (err) {
                console.error("Summary compare error:", err);
            }
        };

        fetchData();
    }, []);

    if (!data) return <p>Loading...</p>;

    return (
        <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">Visitors Today</p>
            <h2 className="text-2xl font-bold">{data.today}</h2>
            <p
                className={`text-sm ${
                    data.percentage >= 0
                        ? "text-green-600"
                        : "text-red-600"
                }`}
            >
                {data.percentage}% vs yesterday
            </p>
        </div>
    );
}
