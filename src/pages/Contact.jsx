import { FaWhatsapp } from "react-icons/fa";

export default function Contact() {
    return (
        <div>
            {/* Hero */}
            <section
                className="h-[80vh] relative flex flex-col text-white bg-cover bg-no-repeat bg-center xl:bg-top"
                style={{
                    backgroundImage: "url('/img/contact.png')",
                }}
            >
                {/* Overlay */}
                <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-cyan-800/80 via-black/50 to-black/70"></div>
                <div className="block md:hidden absolute inset-0 bg-black/60"></div>

                <div>
                    <div className="relative w-11/12 z-10 mx-auto flex flex-col items-start h-[80vh] justify-center text-center">
                        <h3 className="text-3xl w-full md:text-5xl font-bold mb-4">
                            Contact{" "}
                            <span className="bg-gradient-to-l from-cyan-500 via-cyan-400 to-cyan-200 bg-clip-text text-transparent">
                                Us
                            </span>{" "}
                        </h3>
                    </div>
                </div>
            </section>

            {/* Contact Us */}
            <section className="w-11/12 md:w-10/12 py-12 md:py-20 mx-auto">
                <div
                    className="relative flex flex-col md:flex-row items-center justify-between gap-0 md:gap-20 backdrop-blur-md bg-cyan-200/70 px-6 md:px-10 rounded-3xl bg-center bg-no-repeat bg-cover overflow-hidden pt-10 md:pt-0"
                    style={{
                        backgroundImage: "url('./img/room.jpg')",
                    }}
                >
                    {/* Overlay */}
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-cyan-700/80 via-black/50 to-black/40 rounded-3xl"></div>
                    <div className="block md:hidden absolute inset-0 bg-gradient-to-t from-cyan-700/80 via-black/50 to-black/40 rounded-3xl"></div>

                    {/* Content */}
                    <div className="relative z-10 w-full md:w-2/3 text-center md:text-left">
                        <h1 className="text-2xl md:text-4xl leading-snug md:leading-tight font-semibold text-white mb-6 md:mb-8 max-w-2xl mx-auto md:mx-0 drop-shadow-lg">
                            Hubungi Kami Sekarang &amp; Dapatkan Solusi
                            Kesehatan Terbaik Untuk Anda!
                        </h1>

                        <div className="hidden md:block">
                            <a
                                href="https://wa.me/628123456789"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-fit items-center gap-3 bg-green-600 hover:bg-green-700 transition-all duration-300 text-white py-3 px-8 rounded-2xl font-semibold shadow-lg mx-auto md:mx-0"
                            >
                                <FaWhatsapp className="text-2xl" />
                                +62 812-3456-789
                            </a>
                        </div>
                    </div>
                    <div className="absolute md:hidden z-20 bottom-10">
                        <a
                            href="https://wa.me/628123456789"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-fit items-center gap-3 backdrop-blur-md bg-cyan-700/80 md:bg-green-600 hover:scale-110 hover:backdrop-blur-md hover:bg-cyan-700/60 md:hover:bg-green-700 transition-all text-white py-3 px-8 rounded-2xl font-semibold shadow-lg mx-auto md:mx-0 duration-500 hover:shadow-xl hover:shadow-cyan-500/30"
                        >
                            <FaWhatsapp className="text-2xl" />
                            +62 812-3456-789
                        </a>
                    </div>

                    {/* Image */}
                    <div className="relative z-10 w-full md:w-1/2">
                        <img
                            src="./img/person.png"
                            alt="Person"
                            className="w-full md:max-h-[400px] object-contain"
                        />
                    </div>
                </div>
            </section>

            {/* Form */}
            <section className="w-10/12 mx-auto">
                <div className="flex items-center gap-10 flex-col md:flex-row">
                    <div className="xl:w-1/2">
                        <img src="/img/conper.png" className="rounded-2xl" alt="" />
                    </div>
                    <div className="xl:w-1/2 px-4 pb-20 xl:p-20 mx-auto text-center">
                        <h3 className="text-2xl md:text-3xl font-semibold mb-6">
                            Kritik dan Saran
                        </h3>
                        <form className="max-w-lg mx-auto space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="number"
                                placeholder="Your Phone Number"
                                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Your Subject"
                                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <textarea
                                placeholder="Your Message"
                                className="w-full p-3 border rounded h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                            <button className="w-full md:w-auto px-6 py-3 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition font-semibold">
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
