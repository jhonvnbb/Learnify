import { motion } from "framer-motion";
import { SparklesCore } from "./SparklesCore";
import { FaLightbulb, FaRocket, FaUserGraduate, FaArrowRight } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";

export default function Hero() {
    return (
        <motion.section
            id="hero"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white px-6 overflow-hidden pt-32 pb-32"
        >
            {/* Cosmic Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Animated Gradient Mesh */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-[100px] animate-float-slow"></div>
                    <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[90px] animate-float-medium"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-sky-500 rounded-full mix-blend-multiply filter blur-[80px] animate-float-fast"></div>
                </div>

                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
            </div>

            {/* Sparkle Effect */}
            <div className="absolute inset-0 overflow-hidden">
                <SparklesCore
                    id="hero-sparkles"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={50}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>

            {/* Content Container */}
            <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
                {/* Animated Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="mb-12"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tighter">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-300 to-cyan-200 animate-text-shimmer">
                            Transformasi Belajar
                        </span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-300 to-teal-300 animate-text-shimmer delay-200">
                            Masa Depan
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-slate-300 max-w-3xl mx-auto">
                        Bergabung dengan <span className="text-teal-300 font-medium">Learnify</span> dan rasakan pengalaman belajar premium dengan metode terkini dan mentor profesional.
                    </p>
                </motion.div>

                {/* CTA Button with Hover Effect */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                >
                    <a
                        href={route("register")}
                        className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white rounded-full shadow-2xl"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-sky-500 opacity-90 group-hover:from-teal-300 group-hover:to-sky-400 transition-all duration-300"></span>
                        <span className="absolute top-0 left-0 w-full h-full bg-white opacity-10 group-hover:opacity-0 transition-all duration-300"></span>
                        <span className="absolute top-0 left-0 w-0 h-full bg-white opacity-10 group-hover:w-full transition-all duration-500"></span>
                        <span className="relative flex items-center">
                            Mulai Sekarang <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </a>
                </motion.div>

            </div>

            {/* Feature Cards */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 px-4 max-w-6xl w-full"
            >
                {[
                    {
                        icon: <FaLightbulb className="text-4xl mb-4" />,
                        title: "Pembelajaran Inovatif",
                        description: "Metode interaktif berbasis teknologi terkini",
                        color: "text-teal-300"
                    },
                    {
                        icon: <FaRocket className="text-4xl mb-4" />,
                        title: "Akses Fleksibel",
                        description: "Belajar kapan saja, di mana saja",
                        color: "text-sky-300"
                    },
                    {
                        icon: <FaUserGraduate className="text-4xl mb-4" />,
                        title: "Mentor Profesional",
                        description: "Dibimbing langsung oleh ahli di bidangnya",
                        color: "text-cyan-300"
                    }
                ].map((feature, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -10 }}
                        className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-lg p-8 rounded-2xl border border-slate-700/50 shadow-lg hover:shadow-xl transition-all"
                    >
                        <div className={`${feature.color} mb-4`}>
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                        <p className="text-slate-400">{feature.description}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Floating Particles */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f172a] to-transparent z-20"></div>
        </motion.section>
    );
}