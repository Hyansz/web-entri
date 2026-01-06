import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function HistatsTracker() {
    const location = useLocation();

    useEffect(() => {
        // Init Histats (sekali saja)
        window._Hasync = window._Hasync || [];

        // TRACK PAGE VIEW SETIAP ROUTE BERUBAH
        window._Hasync.push([
            "Histats.track_hits",
            location.pathname + location.search,
        ]);

        // Load script sekali
        if (!document.getElementById("histats-script")) {
            window._Hasync.push([
                "Histats.start",
                "1,5000269,4,22,130,30,00011111",
            ]);
            window._Hasync.push(["Histats.fasi", "1"]);

            const script = document.createElement("script");
            script.id = "histats-script";
            script.src = "//s10.histats.com/js15_as.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, [location.pathname, location.search]);

    return null;
}
