import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold tracking-tight text-white">
                    Selamat Datang, {user.name}
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-[#0f172a] min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-10">

                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-cyan-700 via-indigo-800 to-purple-800 rounded-xl shadow-lg p-8 text-white relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 opacity-20 text-[12rem] font-bold pointer-events-none">🎓</div>
                        <h3 className="text-3xl font-bold mb-2">Hai, {user.name} 👋</h3>
                        <p className="text-sm mb-4">
                            Kamu saat ini menggunakan paket <strong className="uppercase">{user.package_type}</strong>.
                            {user.package_type === 'basic' && ' Upgrade sekarang untuk menikmati fitur premium!'}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            {user.package_type === 'basic' && (
                                <a
                                    href="/upgrade"
                                    className="inline-block bg-white text-indigo-700 px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-100 transition"
                                >
                                    Upgrade ke Premium
                                </a>
                            )}

                            <Link
                                href="/courses"
                                className="inline-block bg-cyan-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-cyan-600 transition"
                            >
                                Lihat Kursus 📚
                            </Link>
                        </div>
                    </div>

                    {/* Statistik Ringkas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl shadow text-white hover:scale-105 transition transform duration-200">
                            <h4 className="text-lg font-semibold mb-1">Materi Dipelajari</h4>
                            <p className="text-4xl font-bold text-cyan-400">12</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl shadow text-white hover:scale-105 transition transform duration-200">
                            <h4 className="text-lg font-semibold mb-1">Kuis Dikerjakan</h4>
                            <p className="text-4xl font-bold text-indigo-400">5</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl shadow text-white hover:scale-105 transition transform duration-200">
                            <h4 className="text-lg font-semibold mb-1">Poin Kamu</h4>
                            <p className="text-4xl font-bold text-purple-400">280</p>
                        </div>
                    </div>

                    {/* Tips / Info */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl shadow text-sm text-slate-300 leading-relaxed border-l-4 border-cyan-500">
                        💡 <strong>Tips:</strong> Selesaikan materi dan kuis setiap minggu agar progres belajar kamu optimal. Jangan lupa upgrade ke paket Premium agar bisa mengikuti kelas lanjutan dan dapat sertifikat! 🚀
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
