import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar di Learnify" />

            <div className="min-h-screen flex flex-col md:flex-row bg-[#0f172a] text-white">
                {/* Kolom Kiri */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="hidden md:flex md:w-1/2 flex-col justify-center px-8 lg:px-12 bg-gradient-to-br from-blue-600/40 to-purple-800/40 backdrop-blur-lg"
                >
                    <div className="max-w-md mx-auto">
                        <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight drop-shadow-md">
                            Bergabung dengan{" "}
                            <span className="text-blue-300">Learnify</span>
                        </h1>
                        <p className="text-base lg:text-lg text-slate-200 mb-6">
                            Buat akun dan mulai belajar dengan cara yang lebih
                            mudah dan menyenangkan.
                        </p>
                        <img
                            src="/images/register.svg"
                            alt="Ilustrasi Register"
                            className="w-2/3 max-w-sm mx-auto mt-6"
                        />
                    </div>
                </motion.div>

                {/* Kolom Kanan (Form Register) */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 min-h-screen md:min-h-0">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-lg"
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 tracking-tight text-blue-400">
                            Daftar Akun Learnify
                        </h2>

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Nama Lengkap"
                                    className="text-white"
                                />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-2 block w-full bg-white/10 text-white border border-white/20 rounded-xl focus:ring-blue-400 focus:border-blue-400"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2 text-red-400"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Email"
                                    className="text-white"
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-2 block w-full bg-white/10 text-white border border-white/20 rounded-xl focus:ring-blue-400 focus:border-blue-400"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2 text-red-400"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="text-white"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-2 block w-full bg-white/10 text-white border border-white/20 rounded-xl focus:ring-blue-400 focus:border-blue-400"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2 text-red-400"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Konfirmasi Password"
                                    className="text-white"
                                />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-2 block w-full bg-white/10 text-white border border-white/20 rounded-xl focus:ring-blue-400 focus:border-blue-400"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2 text-red-400"
                                />
                            </div>

                            <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 text-center">
                                <Link
                                    href={route("login")}
                                    className="text-sm text-blue-300 hover:underline"
                                >
                                    Sudah punya akun? Masuk
                                </Link>

                                <PrimaryButton
                                    className="w-fit sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition"
                                    disabled={processing}
                                >
                                    Daftar
                                </PrimaryButton>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </GuestLayout>
    );
}
