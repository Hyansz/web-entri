import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function HistatsTracker() {
    const location = useLocation();
    const initialized = useRef(false);

    useEffect(() => {
        window._Hasync = window._Hasync || [];

        // INIT HANYA SEKALI
        if (!initialized.current) {
            window._Hasync.push([
                "Histats.start",
                "1,5000269,4,22,130,30,00011111",
            ]);
            window._Hasync.push(["Histats.fasi", "1"]);

            if (!document.getElementById("histats-script")) {
                const script = document.createElement("script");
                script.id = "histats-script";
                script.src = "https://s10.histats.com/js15_as.js"; // HTTPS WAJIB
                script.async = true;
                document.body.appendChild(script);
            }

            initialized.current = true;
        }

        // TRACK SETIAP PINDAH HALAMAN (SETELAH INIT)
        window._Hasync.push([
            "Histats.track_hits",
            location.pathname + location.search,
        ]);
    }, [location.pathname, location.search]);

    return null;
}
