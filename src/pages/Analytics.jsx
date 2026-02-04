import AdminLayout from "../components/AdminLayout";
import DailyVisitorsChart from "../components/DailyVisitorsChart";
import BounceRate from "../components/stats/BounceRate";
import PageViewsToday from "../components/stats/PageViewsToday";
import SessionsToday from "../components/stats/SessionsToday";
import VisitorsToday from "../components/stats/VisitorsToday";

export default function Analytics() {
    return (
        <AdminLayout>
            <h1>Analytics</h1>
            <div className="mt-8 grid grid-cols-1 xl:grid-cols-1 gap-6 items-stretch">
                {/* STAT CARDS */}
                <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <VisitorsToday />
                    <PageViewsToday />
                    <SessionsToday />
                    <BounceRate />
                </div>

                {/* CHART BESAR */}
                <div className="xl:col-span-2 bg-white dark:bg-[#0b0b0b] rounded-2xl shadow p-4">
                    <DailyVisitorsChart />
                </div>
            </div>
        </AdminLayout>
    );
}
