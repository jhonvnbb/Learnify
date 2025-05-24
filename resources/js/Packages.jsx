import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChalkboardTeacher,
    faQuestionCircle,
    faClock,
} from "@fortawesome/free-solid-svg-icons";

export default function InteractivePackages() {
    const features = [
        {
            icon: faChalkboardTeacher,
            title: "Materi Interaktif",
            desc: "Teks, video, dan PDF terstruktur untuk pembelajaran yang menyenangkan dan mudah dipahami.",
        },
        {
            icon: faQuestionCircle,
            title: "Kuis & Penilaian",
            desc: "Penilaian otomatis dengan kuis pilihan ganda dan umpan balik instan.",
        },
        {
            icon: faClock,
            title: "Akses Fleksibel",
            desc: "Belajar kapan pun dan di mana pun tanpa batasan perangkat.",
        },
    ];

    const packages = [
        {
            title: "Basic",
            desc: "Paket dasar dengan akses penuh ke fitur interaktif dan penilaian mingguan.",
            price: "Rp50.000 / bulan",
            includedFeatures: [
                "Materi Interaktif",
                "Kuis & Penilaian",
                "Akses Fleksibel",
            ],
            isPopular: false,
        },
        {
            title: "Premium",
            desc: "Lengkap dengan live class, konsultasi langsung, dan sertifikat resmi.",
            price: "Rp100.000 / bulan",
            includedFeatures: [
                "Materi Interaktif",
                "Kuis & Penilaian",
                "Akses Fleksibel",
            ],
            isPopular: true,
        },
    ];

    const [selectedFeature, setSelectedFeature] = useState(null);
    const [openedPackage, setOpenedPackage] = useState(null);

    return (
        <main
            className="min-h-screen relative pt-36 pb-28 px-6 md:px-10 bg-[#0f172a] overflow-hidden text-white"
            id="packages"
        >
            {/* Decorative gradients */}
            <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] bg-blue-600 opacity-20 blur-[140px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-purple-600 opacity-20 blur-[140px] rounded-full pointer-events-none"></div>

            <motion.h2
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-extrabold text-center mb-14 tracking-tight"
            >
                Pilih Paket <span className="text-blue-400">Learnify</span>mu
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
                {/* Fitur */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="space-y-6"
                >
                    {features.map((feature, idx) => {
                        const isSelected =
                            selectedFeature?.title === feature.title;
                        return (
                            <motion.div
                                key={idx}
                                onClick={() => setSelectedFeature(feature)}
                                whileHover={{ scale: 1.03, x: 5 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20,
                                }}
                                className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer shadow-md backdrop-blur-md bg-white/10 border-white/20 transition-all duration-300 ${
                                    isSelected
                                        ? "ring-4 ring-blue-500 bg-blue-900/30"
                                        : ""
                                }`}
                            >
                                <div className="text-blue-400 text-3xl md:text-4xl">
                                    <FontAwesomeIcon icon={feature.icon} />
                                </div>
                                <div>
                                    <h4 className="text-xl md:text-2xl font-semibold mb-1">
                                        {feature.title}
                                    </h4>
                                    <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                                        {feature.desc}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Paket */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="space-y-6"
                >
                    {packages.map((pkg) => (
                        <motion.div
                            key={pkg.title}
                            onClick={() =>
                                setOpenedPackage(
                                    openedPackage === pkg.title
                                        ? null
                                        : pkg.title
                                )
                            }
                            whileHover={{ scale: 1.02 }}
                            className={`relative rounded-2xl p-6 cursor-pointer border transition-all duration-300 shadow-md backdrop-blur-md ${
                                pkg.isPopular
                                    ? "bg-gradient-to-br from-blue-600/30 to-purple-600/30 border-blue-400 ring-1 ring-blue-500"
                                    : "bg-white/5 border-white/10"
                            }`}
                        >
                            {pkg.isPopular && (
                                <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-xs font-semibold shadow-lg">
                                    Paling Populer
                                </div>
                            )}
                            <h3 className="text-2xl font-bold text-blue-400 mb-2">
                                {pkg.title}
                            </h3>
                            <AnimatePresence>
                                {openedPackage === pkg.title && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-slate-300 mb-4 text-sm md:text-base">
                                            {pkg.desc}
                                        </p>
                                        <ul className="mb-5 space-y-2">
                                            {features.map((feature, idx) => {
                                                const included =
                                                    pkg.includedFeatures.includes(
                                                        feature.title
                                                    );
                                                return (
                                                    <li
                                                        key={idx}
                                                        className={`flex items-center gap-3 text-sm md:text-base ${
                                                            included
                                                                ? "text-white"
                                                                : "text-slate-500 line-through"
                                                        }`}
                                                    >
                                                        <span
                                                            className={`block w-2.5 h-2.5 rounded-full ${
                                                                included
                                                                    ? "bg-blue-400"
                                                                    : "bg-slate-600"
                                                            }`}
                                                        />
                                                        {feature.title}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                        <p className="text-2xl font-bold mb-3">
                                            {pkg.price}
                                        </p>
                                        <button className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 font-semibold text-sm md:text-base hover:opacity-90 transition-shadow shadow-md">
                                            Pilih Paket
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </main>
    );
}
