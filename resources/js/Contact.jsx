import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const contactItems = [
    {
        icon: faEnvelope,
        color: "from-teal-400 to-cyan-500",
        text: "tinonababan3@gmailcom",
    },
    {
        icon: faPhone,  
        color: "from-blue-400 to-indigo-500",
        text: "0896-3345-1402",
    },
    {
        icon: faWhatsapp,
        color: "from-green-400 to-emerald-500",
        text: "0895-3460-53848",
    },
];

export default function Contact() {
    return (
        <section
            id="contact"
            className="relative pt-36 pb-28 px-6 md:px-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden text-white"
        >
            <motion.div
                className="max-w-4xl mx-auto text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h3 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-500">
                    Hubungi Kami
                </h3>
                <p className="mb-12 text-slate-300 text-lg">
                    Punya pertanyaan? Tim kami siap membantu Anda kapan saja.
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-10 text-left">
                    {contactItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 bg-white/5 px-6 py-4 rounded-2xl shadow-lg backdrop-blur-xl hover:scale-105 transition-all duration-300 border border-white/10"
                        >
                            <div
                                className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md`}
                            >
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    className="text-xl"
                                />
                            </div>
                            <span className="text-white text-base">
                                {item.text}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <motion.a
                href="https://wa.me/62895346053848"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0, -5, 0] }}
                transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                }}
                className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition duration-300"
            >
                <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
            </motion.a>
        </section>
    );
}
