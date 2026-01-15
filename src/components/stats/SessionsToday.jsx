import { useEffect, useState } from "react";
import { getSummary } from "../../api/analytics";
import StatCard from "../StatCard";

export default function SessionsToday() {
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSummary()
            .then((res) => setValue(res.data.visits ?? 0))
            .catch(() => setValue(0))
            .finally(() => setLoading(false));
    }, []);

    return (
        <StatCard
            title="Sessions"
            value={value}
            sub="Jumlah sesi kunjungan"
            loading={loading}
        />
    );
}
