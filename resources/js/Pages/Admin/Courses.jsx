import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { BookOpen, FileText, PlusCircle, FileQuestion } from 'lucide-react';
import { Head } from '@inertiajs/react';

const courses = [
  'Matematika',
  'Bahasa Indonesia',
  'Bahasa Inggris',
  'Fisika',
  'Kimia',
  'Biologi',
  'Sejarah',
  'Geografi',
  'Ekonomi',
  'Sosiologi',
];

export default function Courses() {
  return (
    <AdminLayout>
      <Head title="Kelola Pelajaran" />
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-slate-800">Kelola Pelajaran</h1>
          <p className="text-slate-500">Total {courses.length} pelajaran tersedia</p>
        </div>

        {/* Grid Pelajaran */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="group relative border border-slate-200 rounded-2xl bg-white p-6 shadow hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-teal-600" />
                <h2 className="text-lg font-semibold text-slate-800">{course}</h2>
              </div>

              <div className="space-y-3">
                <button className="flex items-center w-full gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-teal-500 text-white text-sm font-medium shadow hover:opacity-90 transition">
                  <FileText className="w-4 h-4" />
                  Tambah Modul PDF
                </button>

                <button className="flex items-center w-full gap-2 px-4 py-2 rounded-lg bg-indigo-500 text-white text-sm font-medium shadow hover:bg-indigo-600 transition">
                  <FileQuestion className="w-4 h-4" />
                  Tambah Kuis
                </button>

                <button className="flex items-center w-full gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 transition">
                  <PlusCircle className="w-4 h-4" />
                  Tambah Materi Lainnya
                </button>
              </div>

              {/* Tooltip Hover - Interaktif */}
              <div className="absolute top-4 right-4 text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition duration-200">
                Pelajaran #{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
