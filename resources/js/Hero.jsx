import { motion } from "framer-motion";
import { SparklesCore } from "./SparklesCore";
import { FaLightbulb, FaRocket, FaUserGraduate } from "react-icons/fa";

export default function Hero() {
    return (
        <motion.section
            id="hero"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white px-6 overflow-hidden pt-32"
        >
            {/* Overlay Blur */}
            <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-0"></div>

            {/* Floating Gradient Circles */}
            <div className="absolute -top-32 left-10 w-72 h-72 bg-emerald-400 opacity-20 blur-[120px] rounded-full animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500 opacity-30 blur-[150px] rounded-full animate-pulse-slow"></div>

            {/* Decorative SVG Background Pattern */}
            <svg
                className="absolute top-0 left-0 w-full h-full opacity-5"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
            >
                <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Sparkle Effect */}
            <SparklesCore className="absolute inset-0 z-0" />

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                <h2 className="text-5xl md:text-6xl font-extrabold mb-12 leading-tight tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-300 to-cyan-200">
                        Belajar Lebih Cerdas dan Menyenangkan
                    </span>
                </h2>
                <p className="text-lg md:text-2xl font-light mb-8 text-slate-300">
                    Bersama{" "}
                    <span className="text-teal-300 font-semibold underline decoration">
                        Learnify
                    </span>
                    , kamu bisa mengakses{" "}
                    <strong className="text-white">materi premium</strong>,
                    <strong className="text-white"> kuis interaktif</strong>,
                    dan
                    <strong className="text-white"> mentor terbaik</strong>.
                </p>
                <a
                    href="#packages"
                    className="inline-block bg-gradient-to-r from-teal-400 to-sky-500 hover:from-teal-300 hover:to-sky-400 text-white mt-4 px-8 py-3 rounded-full font-semibold text-lg shadow-xl transition-all duration-300 hover:scale-105 ring-2 ring-white/20 backdrop-blur-md"
                >
                    Jelajahi Paket Belajar
                </a>
            </div>

            {/* Feature Highlights */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 px-4 text-center max-w-5xl">
                <div className="flex flex-col items-center text-slate-200">
                    <FaLightbulb className="text-teal-300 text-3xl mb-2" />
                    <h4 className="font-semibold text-lg">Pembelajaran Inovatif</h4>
                    <p className="text-sm text-slate-400">Metode interaktif dan modern.</p>
                </div>
                <div className="flex flex-col items-center text-slate-200">
                    <FaRocket className="text-teal-300 text-3xl mb-2" />
                    <h4 className="font-semibold text-lg">Akses Cepat</h4>
                    <p className="text-sm text-slate-400">Tanpa batasan waktu dan tempat.</p>
                </div>
                <div className="flex flex-col items-center text-slate-200">
                    <FaUserGraduate className="text-teal-300 text-3xl mb-2" />
                    <h4 className="font-semibold text-lg">Mentor Profesional</h4>
                    <p className="text-sm text-slate-400">Langsung dari ahlinya.</p>
                </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-[450px] h-[450px] bg-cyan-300 opacity-20 rounded-full blur-[120px] animate-pulse-slow z-0"></div>
        </motion.section>
    );
}
