import { useEffect, useState } from "react";
import { getSummary } from "../../api/analytics";
import StatCard from "../StatCard";

export default function PageViewsToday() {
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSummary()
            .then((res) => setValue(res.data.pageviews ?? 0))
            .catch(() => setValue(0))
            .finally(() => setLoading(false));
    }, []);

    return (
        <StatCard
            title="Page Views"
            value={value}
            sub="Total halaman dibuka"
            loading={loading}
        />
    );
}
