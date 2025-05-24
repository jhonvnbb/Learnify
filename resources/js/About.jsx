import { motion } from "framer-motion";
import { Lightbulb, Clock, Users } from "lucide-react";

export default function About() {
    return (
        <section
            id="about"
            className="relative pt-36 pb-28 px-6 md:px-10 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#4f46e5] overflow-hidden text-white"
        >
            {/* Decorative blurred shapes */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600 opacity-30 rounded-full blur-[150px] z-0"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 opacity-30 rounded-full blur-[150px] z-0"></div>

            <div className="max-w-6xl mx-auto text-center mb-20 relative z-10">
                <motion.h3
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
                >
                    Tentang Learnify
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
                >
                    Learnify adalah platform pembelajaran digital yang dirancang
                    untuk memberikan pengalaman belajar yang
                    <span className="text-cyan-400 font-semibold">
                        {" "}
                        menyenangkan
                    </span>
                    ,
                    <span className="text-cyan-400 font-semibold">
                        {" "}
                        fleksibel
                    </span>
                    , dan
                    <span className="text-cyan-400 font-semibold">
                        {" "}
                        interaktif
                    </span>
                    . Kami percaya setiap siswa memiliki gaya belajar unik — dan
                    Learnify hadir untuk mendukung perjalanan mereka.
                </motion.p>
            </div>

            {/* Fitur Cards */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 relative z-10">
                {[
                    {
                        icon: <Lightbulb size={40} className="text-cyan-400" />,
                        title: "Belajar Jadi Mudah",
                        desc: "Materi interaktif, animasi, dan video menjadikan proses belajar lebih menyenangkan.",
                    },
                    {
                        icon: <Clock size={40} className="text-cyan-400" />,
                        title: "Fleksibel & Efisien",
                        desc: "Belajar kapan pun, di mana pun, tanpa batasan ruang dan waktu.",
                    },
                    {
                        icon: <Users size={40} className="text-cyan-400" />,
                        title: "Dukungan Komunitas",
                        desc: "Terhubung dengan mentor dan sesama siswa untuk saling berbagi & belajar bersama.",
                    },
                ].map((feature, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.2 }}
                        viewport={{ once: true }}
                        className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-3xl shadow-xl text-center hover:shadow-2xl transition-all duration-300"
                    >
                        <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-cyan-500/10">
                            {feature.icon}
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                            {feature.title}
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {feature.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
