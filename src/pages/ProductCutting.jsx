import { Helmet } from "react-helmet";

export default function ProductCutting() {
    return (
        <>
            <Helmet>
                <title>
                    Motif Cutting Laser - Desain Presisi untuk Industri | PT
                    Entri Jaya Makmur
                </title>
                <meta
                    name="description"
                    content="Layanan motif cutting laser dengan hasil presisi tinggi untuk kebutuhan industri dan dekorasi. Solusi desain berkualitas dari PT Entri Jaya Makmur."
                />
                <link
                    rel="canonical"
                    href="https://entrijayamakmur.co.id/products/cutting"
                />
            </Helmet>

            <div>
                {/* Hero */}
                <section
                    className="h-[80vh] relative flex flex-col text-white bg-cover bg-no-repeat bg-center md:bg-right"
                    style={{
                        backgroundImage: "url('/img/mofcut.jpg')",
                    }}
                >
                    {/* Overlay */}
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-cyan-800/80 via-black/50 to-black/80"></div>
                    <div className="block md:hidden absolute inset-0 bg-black/60"></div>

                    <div>
                        <div className="relative w-11/12 z-10 mx-auto flex flex-col items-start h-[80vh] justify-center text-center">
                            <h3 className="text-3xl w-full md:text-5xl font-bold mb-4">
                                Motif{" "}
                                <span className="bg-gradient-to-l from-cyan-200 via-cyan-400 to-cyan-200 bg-clip-text text-transparent">
                                    Cutting
                                </span>{" "}
                                Laser
                            </h3>
                        </div>
                    </div>
                </section>

                {/* Produk */}
                <section className="w-10/12 mx-auto text-center py-16 px-6">
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-white mx-auto rounded-xl shadow-md shadow-cyan-800/40 p-4 hover:scale-105 duration-500 text-cyan-800 border border-cyan-500/20">
                            <img
                                src="/img/motif1.png"
                                alt="Motif Cutting 1"
                                className="rounded mb-3"
                            />
                            <h3 className="text-lg font-semibold">
                                Motif Cutting 1
                            </h3>
                        </div>
                        <div className="bg-white mx-auto rounded-xl shadow-md shadow-cyan-800/40 p-4 hover:scale-105 duration-500 text-cyan-800 border border-cyan-500/20">
                            <img
                                src="/img/motif2.png"
                                alt="Motif Cutting 2"
                                className="rounded mb-3"
                            />
                            <h3 className="text-lg font-semibold">
                                Motif Cutting 2
                            </h3>
                        </div>
                        <div className="bg-white mx-auto rounded-xl shadow-md shadow-cyan-800/40 p-4 hover:scale-105 duration-500 text-cyan-800 border border-cyan-500/20">
                            <img
                                src="/img/motif3.png"
                                alt="Motif Cutting 3"
                                className="rounded mb-3"
                            />
                            <h3 className="text-lg font-semibold">
                                Motif Cutting 3
                            </h3>
                        </div>
                        <div className="bg-white mx-auto rounded-xl shadow-md shadow-cyan-800/40 p-4 hover:scale-105 duration-500 text-cyan-800 border border-cyan-500/20">
                            <img
                                src="/img/motif4.png"
                                alt="Motif Cutting 4"
                                className="rounded mb-3"
                            />
                            <h3 className="text-lg font-semibold">
                                Motif Cutting 4
                            </h3>
                        </div>
                        <div className="bg-white mx-auto rounded-xl shadow-md shadow-cyan-800/40 p-4 hover:scale-105 duration-500 text-cyan-800 border border-cyan-500/20">
                            <img
                                src="/img/motif5.png"
                                alt="Motif Cutting 5"
                                className="rounded mb-3"
                            />
                            <h3 className="text-lg font-semibold">
                                Motif Cutting 5
                            </h3>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
