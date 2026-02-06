import { useEffect, useState } from "react";
import { getEngagement } from "../../api/analytics";
import StatCard from "./StatCard";

export default function EngagementRate({ range }) {
    const [current, setCurrent] = useState(0);
    const [previous, setPrevious] = useState(null);

    useEffect(() => {
        setLoading(true);
        getEngagement(range)
            .then((res) => {
                setValue(res.engagementRate ?? 0);
            })
            .finally(() => setLoading(false));
    }, [range]);

    return (
        <StatCard
            title="Engagement"
            value={current}
            previous={previous}
            suffix="%"
        />
    );
}
