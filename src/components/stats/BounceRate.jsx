import { useEffect, useState } from "react";
import { getSummary } from "../../api/analytics";
import StatCard from "../StatCard";

export default function BounceRate() {
    const [value, setValue] = useState(null);

    useEffect(() => {
        getSummary()
            .then((res) => {
                const bounces = Number(res.data?.bounces || 0);
                const visits = Number(res.data?.visits || 0);

                if (visits === 0) {
                    setValue("0.00");
                    return;
                }

                const rate = (bounces / visits) * 100;
                setValue(rate.toFixed(2));
            })
            .catch(() => setValue("0.00"));
    }, []);

    if (value === null) return null;

    return (
        <StatCard
            title="Bounce Rate"
            value={`${value}%`}
            sub="Pengunjung langsung pergi"
        />
    );
}
