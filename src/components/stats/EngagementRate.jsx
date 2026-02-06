import { useEffect, useState } from "react";
import { getEngagementCompare } from "../../api/analytics";
import StatCard from "./StatCard";

export default function EngagementRate({ range }) {
    const [current, setCurrent] = useState(0);
    const [previous, setPrevious] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        getEngagementCompare(range)
            .then((res) => {
                setCurrent(res.current ?? 0);
                setPrevious(res.previous ?? null);
            })
            .catch(() => {
                setCurrent(0);
                setPrevious(null);
            })
            .finally(() => setLoading(false));
    }, [range]);

    return (
        <StatCard
            title="Engagement"
            value={current}
            previous={previous}
            suffix="%"
            loading={loading}
        />
    );
}
