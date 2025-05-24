import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk ke Learnify" />

            <div className="min-h-screen flex flex-col md:flex-row bg-[#0f172a] text-white">
                {/* Kolom Kiri */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="hidden md:flex md:w-1/2 flex-col justify-center px-8 lg:px-12 bg-gradient-to-br from-blue-600/40 to-purple-800/40 backdrop-blur-lg"
                >
                    <div className="max-w-md mx-auto text-center md:text-left">
                        <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight drop-shadow-md">
                            Selamat Datang di{" "}
                            <span className="text-blue-300">Learnify</span>
                        </h1>
                        <p className="text-base lg:text-lg text-slate-200 mb-6">
                            Platform pembelajaran interaktif dan modern untuk
                            membantu siswa memahami materi dengan lebih mudah.
                        </p>
                        <img
                            src="/images/login.svg"
                            alt="Ilustrasi Learnify"
                            className="w-full max-w-sm mx-auto mt-6"
                        />
                    </div>
                </motion.div>

                {/* Kolom Kanan */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 min-h-screen md:min-h-0">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-lg"
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 tracking-tight text-blue-400">
                            Masuk ke Learnify
                        </h2>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-400 text-center">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
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
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
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
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2 text-red-400"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                                <label className="flex items-center text-sm text-slate-300">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData("remember", e.target.checked)
                                        }
                                    />
                                    <span className="ms-2">Ingat saya</span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-sm text-blue-400 hover:underline"
                                    >
                                        Lupa password?
                                    </Link>
                                )}
                            </div>

                            <div className="space-y-3 pt-1">
                                <PrimaryButton
                                    className="flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white font-semibold py-3 rounded-full shadow-lg transition"
                                    disabled={processing}
                                >
                                    Masuk
                                </PrimaryButton>

                                <Link
                                    href={route("register")}
                                    className="block text-center w-full border border-blue-400 text-blue-300 font-semibold py-2 rounded-full hover:bg-blue-500/10 transition"
                                >
                                    Belum punya akun? Daftar
                                </Link>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </GuestLayout>
    );
}