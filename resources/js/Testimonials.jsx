import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

const testimonials = [
    {
        name: "Zainab Aqilah",
        text: "Learnify membuat belajar jadi menyenangkan dan tidak membosankan. Materinya lengkap dan interaktif!",
    },
    {
        name: "Rita Irma Yani",
        text: "Sangat membantu persiapan ujian saya. Kuis-kuisnya menantang tapi seru!",
    },
];

export default function Testimonials() {
    return (
        <section
            id="testimonials"
            className="relative pt-36 pb-28 px-6 md:px-10 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 overflow-hidden text-white"
        >
            <div className="max-w-6xl mx-auto text-center">
                <motion.h3
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-extrabold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-600"
                >
                    Apa Kata Mereka?
                </motion.h3>

                <div className="grid md:grid-cols-2 gap-10">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="relative p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:scale-[1.03] transition-all duration-300 text-left"
                        >
                            <FontAwesomeIcon
                                icon={faQuoteLeft}
                                className="text-cyan-400 text-4xl mb-6"
                            />
                            <p className="text-slate-200 text-lg mb-6 leading-relaxed italic">
                                “{testimonial.text}”
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                    {testimonial.name.split(" ")[0][0]}
                                </div>
                                <p className="font-semibold text-white text-base">
                                    {testimonial.name}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
