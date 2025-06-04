import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faQuestionCircle,
  faClock,
  faCheck,
  faCrown
} from "@fortawesome/free-solid-svg-icons";

export default function Features() {
  const features = [
    {
      icon: faChalkboardTeacher,
      title: "Materi Interaktif",
      desc: "Teks, video, dan PDF terstruktur untuk pembelajaran yang menyenangkan dan mudah dipahami.",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: faQuestionCircle,
      title: "Kuis & Penilaian",
      desc: "Penilaian otomatis dengan kuis pilihan ganda dan umpan balik instan.",
      color: "from-purple-500 to-pink-400"
    },
    {
      icon: faClock,
      title: "Akses Fleksibel",
      desc: "Belajar kapan pun dan di mana pun tanpa batasan perangkat.",
      color: "from-amber-500 to-orange-400"
    }
  ];

  const packages = [
    {
      title: "Basic",
      desc: "Paket dasar dengan akses penuh ke fitur interaktif dan penilaian mingguan.",
      price: "Gratis",
      includedFeatures: [
        "Materi Interaktif",
        "Kuis & Penilaian",
        "Akses Fleksibel",
      ],
      isPopular: false,
      color: "bg-gradient-to-br from-slate-700 to-slate-800"
    },
    {
      title: "Premium",
      desc: "Lengkap dengan live class, konsultasi langsung, dan sertifikat resmi.",
      price: "Rp.250.000,00",
      includedFeatures: [
        "Materi Interaktif",
        "Kuis & Penilaian",
        "Akses Fleksibel",
        "Live Class",
        "Konsultasi Mentor",
        "Sertifikat Resmi"
      ],
      isPopular: true,
      color: "bg-gradient-to-br from-blue-600 to-purple-600"
    }
  ];

  const [selectedFeature, setSelectedFeature] = useState(features[0]);
  const [openedPackage, setOpenedPackage] = useState(null);

  return (
    <section className="relative py-28 px-6 md:px-10 bg-[#0f172a] overflow-hidden text-white" id="features">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-10"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Fitur Unggulan
          </span>{" "}
          Learnify
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Features Section */}
          <div className="space-y-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedFeature(feature)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-2xl backdrop-blur-sm border transition-all cursor-pointer ${
                  selectedFeature?.title === feature.title
                    ? "bg-gradient-to-br from-blue-900/30 to-blue-800/30 border-blue-500/50 shadow-lg shadow-blue-500/20"
                    : "bg-slate-800/30 border-slate-700/50 hover:border-blue-400/30"
                }`}
              >
                <div className="flex items-start gap-5">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color}`}>
                    <FontAwesomeIcon icon={feature.icon} className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Packages Section */}
          <div className="space-y-6">
            {packages.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className={`relative rounded-2xl overflow-hidden ${pkg.color} shadow-xl`}
              >
                {pkg.isPopular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-amber-500 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg shadow-md">
                    <FontAwesomeIcon icon={faCrown} className="mr-1" /> POPULAR
                  </div>
                )}
                
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => setOpenedPackage(openedPackage === pkg.title ? null : pkg.title)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{pkg.title}</h3>
                      <p className="text-slate-200 mt-1">{pkg.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">{pkg.price}</p>
                      {pkg.price !== "Gratis" && (
                        <p className="text-sm text-slate-300">/ Forever</p>
                      )}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {openedPackage === pkg.title && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <ul className="space-y-3 mb-6">
                          {pkg.includedFeatures.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <FontAwesomeIcon 
                                icon={faCheck} 
                                className="text-green-400 mr-3" 
                              />
                              <span className="text-slate-200">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}