import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInstagram,
    faWhatsapp,
    faFacebook,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#4f46e5] text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                {/* Brand */}
                <div>
                    <h3 className="text-3xl font-bold mb-4 text-white">
                        Learnify
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                        Platform belajar yang modern, fleksibel, dan
                        menyenangkan. Bergabunglah dan mulai perjalanan
                        belajarmu bersama Learnify!
                    </p>
                </div>

                {/* Navigasi */}
                <div>
                    <h4 className="text-xl font-semibold mb-4 text-white">
                        Menu
                    </h4>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>
                            <a
                                href="#about"
                                className="hover:text-white transition duration-300"
                            >
                                Tentang
                            </a>
                        </li>
                        {/* <li>
                            <a
                                href="#packages"
                                className="hover:text-white transition duration-300"
                            >
                                Paket
                            </a>
                        </li> */}
                        <li>
                            <a
                                href="#testimonials"
                                className="hover:text-white transition duration-300"
                            >
                                Testimoni
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className="hover:text-white transition duration-300"
                            >
                                Kontak
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Sosial Media */}
                <div>
                    <h4 className="text-xl font-semibold mb-4 text-white">
                        Ikuti Kami
                    </h4>
                    <div className="flex justify-center md:justify-start gap-5">
                        <a
                            href="https://wa.me/62895346053848"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:scale-110 hover:bg-green-500 transition duration-300"
                        >
                            <FontAwesomeIcon
                                icon={faWhatsapp}
                                className="text-xl text-white"
                            />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:scale-110 hover:bg-pink-500 transition duration-300"
                        >
                            <FontAwesomeIcon
                                icon={faInstagram}
                                className="text-xl text-white"
                            />
                        </a>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:scale-110 hover:bg-blue-500 transition duration-300"
                        >
                            <FontAwesomeIcon
                                icon={faFacebook}
                                className="text-xl text-white"
                            />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-slate-400">
                &copy; {new Date().getFullYear()}{" "}
                <span className="font-semibold text-white">Learnify</span>. All
                rights reserved.
            </div>
        </footer>
    );
}
