import { useEffect, useState } from "react";
import { getBounceRate } from "../../api/analytics";
import StatCard from "../StatCard";

export default function BounceRate() {
    const [value, setValue] = useState("0.00");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBounceRate()
            .then((res) => {
                setValue(res.data.bounceRate);
            })
            .catch(() => setValue("0.00"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <StatCard
            title="Bounce Rate"
            value={`${value}%`}
            sub="Session 1 halaman saja"
            loading={loading}
        />
    );
}
