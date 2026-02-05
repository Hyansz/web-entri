import { useEffect, useState } from "react";
import { getSummary } from "../../api/analytics";
import StatCard from "./StatCard";

export default function BounceRate({ range }) {
    const [value, setValue] = useState(0);
    const [previous, setPrevious] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getSummary(range)
            .then((res) => {
                const rate =
                    res.visits > 0
                        ? (res.bounces / res.visits) * 100
                        : 0;

                const prevRate =
                    res.comparison?.visits > 0
                        ? (res.comparison.bounces / res.comparison.visits) * 100
                        : null;

                setValue(Number(rate.toFixed(1)));
                setPrevious(prevRate ? Number(prevRate.toFixed(1)) : null);
            })
            .finally(() => setLoading(false));
    }, [range]);

    return (
        <StatCard
            title="Bounce Rate"
            value={value}
            previous={previous}
            suffix="%"
            loading={loading}
        />
    );
}
