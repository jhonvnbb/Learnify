import { motion } from "framer-motion";
import { SparklesCore } from "./SparklesCore";

export default function Hero() {
    return (
        <motion.section
            id="hero"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#4f46e5] text-white px-6 overflow-hidden"
        >
            {/* Overlay Blur */}
            <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>

            {/* Floating Gradient Circles */}
            <div className="absolute -top-32 left-10 w-72 h-72 bg-pink-500 opacity-20 blur-[120px] rounded-full animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 opacity-30 blur-[150px] rounded-full animate-pulse-slow"></div>

            {/* Decorative SVG Background Pattern */}
            <svg
                className="absolute top-0 left-0 w-full h-full opacity-5"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
            >
                <defs>
                    <pattern
                        id="grid"
                        width="10"
                        height="10"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 10 0 L 0 0 0 10"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.5"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Sparkle Effect */}
            <SparklesCore className="absolute inset-0 z-0" />

            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                <h2 className="text-5xl md:text-6xl font-extrabold mb-12 leading-tight tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300">
                        Belajar Lebih Cerdas dan Menyenangkan
                    </span>
                </h2>
                <p className="text-lg md:text-2xl font-light mb-8 text-gray-200">
                    Bersama{" "}
                    <span className="text-blue-300 font-semibold underline decoration">
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
                    className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-white mt-4 px-8 py-3 rounded-full font-semibold text-lg shadow-2xl transition-all duration-300 hover:scale-105 ring-2 ring-white/20 backdrop-blur-md"
                >
                    🎓 Jelajahi Paket Belajar
                </a>
            </div>

            {/* Extra Glow Effect */}
            <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-[450px] h-[450px] bg-indigo-500 opacity-30 rounded-full blur-[120px] animate-pulse-slow"></div>
        </motion.section>
    );
}
