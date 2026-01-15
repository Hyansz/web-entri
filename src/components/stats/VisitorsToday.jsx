import { useEffect, useState } from "react";
import { getSummary } from "../../api/analytics";
import StatCard from "../StatCard";

export default function VisitorsToday() {
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSummary()
            .then((res) => setValue(res.data.visitors ?? 0))
            .catch(() => setValue(0))
            .finally(() => setLoading(false));
    }, []);

    return (
        <StatCard
            title="Visitors"
            value={value}
            sub="Pengunjung unik"
            loading={loading}
        />
    );
}
