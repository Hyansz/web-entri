import { useEffect, useState } from "react";
import { getEngagement } from "../../api/analytics";
import StatCard from "./StatCard";

export default function EngagementRate({ range }) {
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(true);

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
            value={value}
            suffix="%"
            loading={loading}
        />
    );
}
