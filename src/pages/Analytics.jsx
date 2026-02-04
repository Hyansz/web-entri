import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DailyVisitorsChart from "../components/DailyVisitorsChart";
import BounceRate from "../components/stats/BounceRate";
import PageViewsToday from "../components/stats/PageViewsToday";
import SessionsToday from "../components/stats/SessionsToday";
import VisitorsToday from "../components/stats/VisitorsToday";
import RangeSelector from "../components/RangeSelector";

export default function Analytics() {
    const [range, setRange] = useState("7d");

    return (
        <AdminLayout>
            <h1>Analytics</h1>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                    Analytics Overview
                </h2>

                <RangeSelector value={range} onChange={setRange} />
            </div>

            {/* CHART */}
            <DailyVisitorsChart range={range} />
        </AdminLayout>
    );
}
