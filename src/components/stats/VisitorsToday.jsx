import { useEffect, useState } from "react";
import { getSummaryCompare } from "../../api/analytics";
import StatCard from "../StatCard";

export default function VisitorsToday() {
    const [current, setCurrent] = useState(0);
    const [previous, setPrevious] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSummaryCompare("24h")
            .then((res) => {
                setCurrent(res.data.current?.visits ?? 0);
                setPrevious(res.data.previous?.visits ?? 0);
            })
            .catch(() => {
                setCurrent(0);
                setPrevious(0);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <StatCard
            title="Visitors"
            value={current}
            previous={previous}
            loading={loading}
        />
    );
}
