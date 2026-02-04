import { useEffect, useState } from "react";
import { getSummaryCompare } from "../../api/analytics";
import StatCard from "../StatCard";

export default function PageViewsToday() {
    const [current, setCurrent] = useState(0);
    const [previous, setPrevious] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSummaryCompare("24h")
            .then((res) => {
                setCurrent(res.data.current?.pageviews ?? 0);
                setPrevious(res.data.previous?.pageviews ?? 0);
            })
            .catch(() => {
                setCurrent(0);
                setPrevious(0);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <StatCard
            title="Page Views"
            value={current}
            previous={previous}
            loading={loading}
        />
    );
}
