import PageViewsToday from "../stats/PageViewsToday";
import SessionsToday from "../stats/SessionsToday";
import BounceRate from "../stats/BounceRate";
import EngagementRate from "../stats/EngagementRate";

export default function StatsGrid({ range }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <PageViewsToday range={range} />
            <SessionsToday range={range} />
            <EngagementRate range={range} />
            <BounceRate range={range} />
        </div>
    );
}
