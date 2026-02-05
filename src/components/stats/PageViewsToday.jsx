import { useEffect, useState } from "react";
import { getSummary } from "../../api/analytics";
import StatCard from "./StatCard";

export default function PageViewsToday({ range }) {
    const [current, setCurrent] = useState(0);
    const [previous, setPrevious] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getSummary(range)
            .then((res) => {
                setCurrent(res.pageviews ?? 0);
                setPrevious(res.comparison?.pageviews ?? null);
            })
            .finally(() => setLoading(false));
    }, [range]);

    return (
        <StatCard
            title="Page Views"
            value={current}
            previous={previous}
            loading={loading}
        />
    );
}
