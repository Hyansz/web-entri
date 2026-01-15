import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../StatCard";

export default function BounceRate() {
    const [value, setValue] = useState(null);

    useEffect(() => {
        axios
            .get("/api/analytics/bounce-rate")
            .then((res) => {
                setValue(res.data.bounceRate.toFixed(2));
            })
            .catch(() => setValue("0.00"));
    }, []);

    if (value === null) return null;

    return (
        <StatCard
            title="Bounce Rate"
            value={`${value}%`}
            sub="Session 1 halaman saja"
        />
    );
}
