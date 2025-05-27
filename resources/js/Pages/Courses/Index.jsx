import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Courses({ courses }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold text-white">Topik Pembelajaran</h2>}
        >
            <Head title="Courses" />

            <div className="py-12 bg-[#0f172a] min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course, index) => (
                            <div key={index} className="bg-white/5 backdrop-blur rounded-xl p-6 shadow text-white hover:scale-105 transition duration-200 border border-white/10">
                                <h3 className="text-xl font-bold text-cyan-400 mb-2">{course.title}</h3>
                                <p className="text-sm text-slate-300">{course.description}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
