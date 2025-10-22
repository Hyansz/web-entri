import { FaWhatsapp } from "react-icons/fa";

export default function WaPhone() {
    return (
        <a
            href="https://wa.me/6285174394123?text=✦%20Halo,%20Saya%20dari%20website%20entri."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg md:flex items-center justify-center z-50"
        >
            <FaWhatsapp className="h-6 w-6" />
        </a>
    );
}
