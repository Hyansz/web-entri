import { useEffect, useState } from "react";
import { getSummary } from "../../api/analytics";
import StatCard from "../StatCard";

export default function PageViewsToday() {
    const [value, setValue] = useState(null);

    useEffect(() => {
        getSummary()
            .then((res) => setValue(res.data.pageviews ?? 0))
            .catch(() => setValue(0));
    }, []);

    if (value === null) return null;

    return (
        <StatCard title="Page Views" value={value} sub="Total halaman dibuka" />
    );
}
