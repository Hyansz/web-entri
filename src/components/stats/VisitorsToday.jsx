import { useEffect, useState } from "react";
import { getSummaryCompare } from "../../api/analytics";
import StatCard from "../StatCard";

function calcChange(current, previous) {
    if (previous === 0 && current === 0) return { change: 0, direction: "up" };

    if (previous === 0) return { change: 100, direction: "up" };

    const diff = ((current - previous) / previous) * 100;

    return {
        change: Math.abs(diff).toFixed(0),
        direction: diff >= 0 ? "up" : "down",
    };
}

export default function VisitorsToday() {
    const [value, setValue] = useState(0);
    const [change, setChange] = useState(0);
    const [direction, setDirection] = useState("up");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSummaryCompare()
            .then((res) => {
                const current = res.data.visitors.current;
                const previous = res.data.visitors.previous;

                const result = calcChange(current, previous);

                setValue(current);
                setChange(result.change);
                setDirection(result.direction);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <StatCard
            title="Visitors"
            value={value}
            change={change}
            direction={direction}
            loading={loading}
        />
    );
}
