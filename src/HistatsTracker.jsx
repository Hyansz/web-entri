import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function HistatsTracker() {
    const location = useLocation();

    useEffect(() => {
        if (window._Hasync) {
            window._Hasync.push(["Histats.track_hits", ""]);
        }
    }, [location]);

    return null;
}
