import { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa6";

export default function ToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-10 md:bottom-20 right-5 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full shadow-lg items-center justify-center cursor-pointer z-50 transition-all duration-500 ${
                isVisible
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-0 pointer-events-none"
            }`}
            aria-label="Scroll to top"
        >
            <FaAngleUp className="h-6 w-6" />
        </button>
    );
}
