import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import ToTop from "../components/ToTop";
import WaPhone from "../components/WaPhone";
import Footer2 from "../components/Footer2";

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                <Outlet />

                {/* Floating components (boleh tetap) */}
                <ToTop />
                <WaPhone />
            </main>
            <Footer2 />
        </>
    );
}
