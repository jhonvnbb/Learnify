import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verifikasi Email" />

            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-3xl bg-white/5 backdrop-blur-lg border border-white/10 text-white rounded-2xl p-6 md:p-10 shadow-2xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Ilustrasi - tampil di atas pada mobile */}
                        <div className="block order-1 md:order-2">
                            <img
                                src="/images/email-verification.svg"
                                alt="Email Verification Illustration"
                                className="w-full max-w-sm mx-auto"
                            />
                        </div>

                        {/* Teks dan Formulir - tampil di bawah pada mobile */}
                        <div className="space-y-5 order-2 md:order-1">
                            <h1 className="text-3xl md:text-4xl font-bold text-blue-300">
                                Verifikasi Email Anda
                            </h1>

                            <p className="text-base md:text-lg text-slate-300">
                                Terima kasih telah mendaftar! Sebelum mulai, harap verifikasi alamat email Anda dengan mengklik tautan yang telah kami kirimkan. Jika belum menerima emailnya, kami dapat mengirim ulang untuk Anda.
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="text-sm text-green-400 font-semibold">
                                    Link verifikasi baru telah dikirim ke alamat email Anda.
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-4">
                                <PrimaryButton
                                    className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition w-full sm:w-auto"
                                    disabled={processing}
                                >
                                    Kirim Ulang Email Verifikasi
                                </PrimaryButton>

                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="block text-sm mt-2 underline text-slate-300 hover:text-white transition"
                                >
                                    Keluar
                                </Link>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </GuestLayout>
    );
}
