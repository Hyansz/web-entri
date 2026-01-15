import { useEffect, useState } from "react";
import { getSummary } from "../../api/analytics";
import StatCard from "../StatCard";

export default function SessionsToday() {
    const [value, setValue] = useState(null);

    useEffect(() => {
        getSummary()
            .then((res) => setValue(res.data.visits ?? 0))
            .catch(() => setValue(0));
    }, []);

    if (value === null) return null;

    return (
        <StatCard title="Sessions" value={value} sub="Jumlah sesi kunjungan" />
    );
}
