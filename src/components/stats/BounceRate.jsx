import { useEffect, useState } from "react";
import { getEngagement } from "../../api/analytics";
import StatCard from "../StatCard";

export default function BounceRate() {
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getEngagement("24h")
            .then((res) => {
                setValue(res.data.bounceRate ?? 0);
            })
            .catch(() => setValue(0))
            .finally(() => setLoading(false));
    }, []);

    return (
        <StatCard
            title="Bounce Rate"
            value={value}
            suffix="%"
            loading={loading}
        />
    );
}
