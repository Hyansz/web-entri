import { useEffect, useState } from "react";
import { getSummary } from "../../api/analytics";
import StatCard from "../StatCard";

export default function VisitorsToday() {
    const [data, setData] = useState(null);

    useEffect(() => {
        getSummary().then((res) => setData(res.data));
    }, []);

    if (!data) return null;

    return (
        <StatCard
            title="Pengunjung Hari Ini"
            value={data.visitors}
            sub="Unique visitors"
        />
    );
}
