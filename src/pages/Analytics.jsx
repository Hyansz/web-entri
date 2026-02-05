import { useState } from "react";
import RangeSwitcher from "../components/analytics/RangeSwitcher";
import StatsGrid from "../components/analytics/StatsGrid";
import DailyVisitorsChart from "../components/DailyVisitorsChart";
import TopPages from "../components/analytics/TopPages";
import TopCountries from "../components/analytics/TopCountries";
import AdminLayout from "../components/AdminLayout";

export default function Analytics() {
    const [range, setRange] = useState("7d");

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-white">
                        Analytics Overview
                    </h1>
                    <RangeSwitcher value={range} onChange={setRange} />
                </div>

                {/* STATS */}
                <StatsGrid range={range} />

                {/* CHART */}
                <DailyVisitorsChart range={range} />

                {/* TABLES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TopPages range={range} />
                    <TopCountries range={range} />
                </div>
            </div>
        </AdminLayout>
    );
}
