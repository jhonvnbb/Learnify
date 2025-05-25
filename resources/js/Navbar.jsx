import { useState, useEffect } from "react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleToggle = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "auto";
    }, [menuOpen]);

    return (
        <>
            {/* Overlay blur saat menu mobile aktif */}
            {menuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
                    onClick={handleToggle}
                />
            )}

            <nav className="fixed w-full z-50 backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-5">
                        {/* Logo */}
                        <h1 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-sm">
                            Learnify
                        </h1>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8 items-center text-white text-sm font-medium">
                            <a
                                href="#about"
                                className="hover:text-cyan-300 transition"
                            >
                                Tentang
                            </a>
                            {/* <a
                                href="#packages"
                                className="hover:text-cyan-300 transition"
                            >
                                Paket
                            </a> */}
                            <a
                                href="#testimonials"
                                className="hover:text-cyan-300 transition"
                            >
                                Testimoni
                            </a>
                            <a
                                href="#contact"
                                className="hover:text-cyan-300 transition"
                            >
                                Kontak
                            </a>
                            <a
                                href={route('login')}
                                className="ml-4 inline-block bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-white px-5 py-2 rounded-full font-semibold text-sm shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                Masuk
                            </a>
                        </div>

                        {/* Mobile Button */}
                        <div className="md:hidden">
                            <button
                                onClick={handleToggle}
                                className="focus:outline-none z-50 relative"
                            >
                                <svg
                                    className="w-7 h-7 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {menuOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden absolute top-[72px] left-0 w-full z-50 bg-white/10 backdrop-blur-md border-t border-white/20 shadow-md transition-all duration-300 ease-in-out ${
                        menuOpen
                            ? "max-h-screen opacity-100"
                            : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                >
                    <div className="flex flex-col px-6 py-4 space-y-4 text-white font-medium text-base">
                        <a
                            href="#about"
                            className="hover:text-cyan-300 transition"
                        >
                            Tentang
                        </a>
                        <a
                            href="#features"
                            className="hover:text-cyan-300 transition"
                        >
                            Fitur
                        </a>
                        {/* <a
                            href="#packages"
                            className="hover:text-cyan-300 transition"
                        >
                            Paket
                        </a> */}
                        <a
                            href="#testimonials"
                            className="hover:text-cyan-300 transition"
                        >
                            Testimoni
                        </a>
                        <a
                            href="#contact"
                            className="hover:text-cyan-300 transition"
                        >
                            Kontak
                        </a>
                        <a
                            href={route('login')}
                            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-2 rounded-full text-center font-semibold hover:from-cyan-300 hover:to-blue-400 transition"
                        >
                            Masuk
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
}
