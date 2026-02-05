import { useEffect, useState } from "react";
import { getSummary } from "../../api/analytics";
import StatCard from "./StatCard";

export default function SessionsToday({ range }) {
    const [current, setCurrent] = useState(0);
    const [previous, setPrevious] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getSummary(range)
            .then((res) => {
                setCurrent(res.visits ?? 0);
                setPrevious(res.comparison?.visits ?? null);
            })
            .finally(() => setLoading(false));
    }, [range]);

    return (
        <StatCard
            title="Sessions"
            value={current}
            previous={previous}
            loading={loading}
        />
    );
}
