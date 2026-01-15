import { useEffect, useState } from "react";
import { getSummary } from "../../api/analytics";
import StatCard from "../StatCard";

export default function TopCountries() {
    const [data, setData] = useState(null);

    useEffect(() => {
        getSummary().then((res) => setData(res.data));
    }, []);

    if (!data) return null;

    return (
        <StatCard
            title="Top Negara"
            value={data.visits}
            sub="Unique visitors"
        />
    );
}
