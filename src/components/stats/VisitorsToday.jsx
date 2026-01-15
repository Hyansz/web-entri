import { useEffect, useState } from "react";
import { getSummaryCompare } from "../../api/analytics";
import StatCard from "../StatCard";

export default function VisitorsToday() {
    const [data, setData] = useState(0);

    useEffect(() => {
        getSummaryCompare()
            .then((res) => setData(res.data.visitors ?? 0))
            .catch(() => setData(0))
    }, []);

    return (
        <StatCard
            title="Visitors"
            value={data?.value ?? "—"}
            change={data?.change}
            sub="Pengunjung unik"
            loading={!data}
        />
    );
}
