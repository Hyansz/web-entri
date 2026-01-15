import { useEffect, useState } from "react";
import { getSummary } from "../../api/analytics";
import StatCard from "../StatCard";

export default function VisitorsToday() {
    const [value, setValue] = useState(null);

    useEffect(() => {
        getSummary()
            .then((res) => setValue(res.data.visitors ?? 0))
            .catch(() => setValue(0));
    }, []);

    if (value === null) return null;

    return <StatCard title="Visitors" value={value} sub="Pengunjung unik" />;
}
