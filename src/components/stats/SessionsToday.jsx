import { useEffect, useState } from "react";
import { getSummaryCompare } from "../../api/analytics";
import StatCard from "../StatCard";

export default function SessionsToday() {
    const [current, setCurrent] = useState(0);
    const [previous, setPrevious] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSummaryCompare("24h")
            .then((res) => {
                setCurrent(res.data.current?.sessions ?? 0);
                setPrevious(res.data.previous?.sessions ?? 0);
            })
            .catch(() => {
                setCurrent(0);
                setPrevious(0);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <StatCard
            title="Sessions"
            value={current}
            previous={previous}
            loading={loading}
        />
    );
}
