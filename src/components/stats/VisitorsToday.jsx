import { useEffect, useState } from "react";
import { getSummaryCompare } from "../../api/analytics";
import StatCard from "../StatCard";

export default function VisitorsToday() {
    const [today, setToday] = useState(0);
    const [yesterday, setYesterday] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSummaryCompare()
            .then((res) => {
                setToday(res.data.today.visitors ?? 0);
                setYesterday(res.data.yesterday.visitors ?? 0);
            })
            .catch(() => {
                setToday(0);
                setYesterday(0);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <StatCard
            title="Visitors"
            today={today}
            yesterday={yesterday}
            loading={loading}
        />
    );
}
