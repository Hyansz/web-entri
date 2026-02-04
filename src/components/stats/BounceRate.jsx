import { useEffect, useState } from "react";
import { getBounceRate } from "../../api/analytics";
import StatCard from "../StatCard";

export default function BounceRate() {
    const [today, setToday] = useState(0);
    const [yesterday, setYesterday] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBounceRate()
            .then((res) => {
                setToday(res.data.today?.bounce ?? 0);
                setYesterday(res.data.yesterday?.bounce ?? 0);
            })
            .catch(() => {
                setToday(0);
                setYesterday(0);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <StatCard
            title="Bounce Rate"
            today={`${today}%`}
            yesterday={`${yesterday}%`}
            loading={loading}
        />
    );
}
