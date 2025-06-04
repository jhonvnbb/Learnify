import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FiPlus, FiTrash2, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmModal from '@/Components/ConfirmModal';

export default function QuizQuestions({ quiz }) {
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState(null);

    const { data, setData, post, put, reset, processing, errors } = useForm({
        question_text: '',
        options: ['', '', '', ''],
        correct_answer: 'A',
    });

    const handleOptionChange = (index, value) => {
        const newOptions = [...data.options];
        newOptions[index] = value;
        setData('options', newOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.options.some(opt => opt.trim() === '')) {
            alert('Semua pilihan jawaban harus diisi.');
            return;
        }

        setData('options', data.options);

        if (editingId) {
            put(route('questions.update', editingId), {
                preserveScroll: true,
                onSuccess: resetForm,
            });
        } else {
            post(route('questions.store', quiz.id), {
                preserveScroll: true,
                onSuccess: resetForm,
            });
        }
    };

    const resetForm = () => {
        reset();
        setEditingId(null);
        setShowForm(false);
        setData({
            question_text: '',
            options: ['', '', '', ''],
            correct_answer: 'A',
        });
    };

    const handleEdit = (question) => {
        setData({
            question_text: question.question_text,
            options: question.options,
            correct_answer: question.correct_answer,
        });
        setEditingId(question.id);
        setShowForm(true);
    };

    const handleDelete = (question) => {
        setQuestionToDelete(question);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        router.delete(route('questions.destroy', questionToDelete.id), {
            preserveScroll: true,
            onSuccess: () => setShowDeleteModal(false),
        });
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-5xl mx-auto text-white">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold">Soal untuk Quiz: {quiz.title}</h1>
                        <p className="text-slate-400">Kelola soal untuk quiz ini</p>
                    </div>
                    <button
                        onClick={() => {
                            resetForm();
                            setShowForm(true);
                        }}
                        className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg"
                    >
                        <FiPlus /> Tambah Soal
                    </button>
                </div>

                {/* Form */}
                <AnimatePresence>
                    {showForm && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">
                                    {editingId ? 'Edit Soal' : 'Tambah Soal Baru'}
                                </h2>
                                <button
                                    onClick={resetForm}
                                    className="text-slate-400 hover:text-white"
                                >
                                    <FiX />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm text-slate-300 mb-1">Pertanyaan</label>
                                    <textarea
                                        value={data.question_text}
                                        onChange={(e) => setData('question_text', e.target.value)}
                                        className="w-full bg-slate-700 rounded-lg border border-slate-600 px-4 py-2 min-h-[100px]"
                                        placeholder="Masukkan pertanyaan"
                                    />
                                    {errors.question_text && (
                                        <p className="text-sm text-rose-400 mt-1">{errors.question_text}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-300 mb-2">Pilihan Jawaban</label>
                                    <div className="space-y-2">
                                        {data.options.map((opt, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="correct_answer"
                                                    checked={data.correct_answer === String.fromCharCode(65 + i)}
                                                    onChange={() => setData('correct_answer', String.fromCharCode(65 + i))}
                                                    className="text-cyan-500"
                                                />
                                                <span className="w-6 text-slate-300">{String.fromCharCode(65 + i)}.</span>
                                                <input
                                                    type="text"
                                                    value={opt}
                                                    onChange={(e) => handleOptionChange(i, e.target.value)}
                                                    className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2"
                                                    placeholder={`Opsi ${String.fromCharCode(65 + i)}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    {errors.options && (
                                        <p className="text-sm text-rose-400 mt-1">{errors.options}</p>
                                    )}
                                    {errors.correct_answer && (
                                        <p className="text-sm text-rose-400 mt-1">{errors.correct_answer}</p>
                                    )}
                                </div>

                                <div className="flex justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="px-4 py-2 border border-slate-600 rounded-lg hover:bg-slate-700"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg flex items-center gap-2"
                                    >
                                        {processing ? 'Menyimpan...' : (
                                            editingId ? (
                                                <>
                                                    <FiSave /> Simpan Perubahan
                                                </>
                                            ) : (
                                                <>
                                                    <FiPlus /> Tambah Soal
                                                </>
                                            )
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* List Soal */}
                <div className="space-y-4">
                    {quiz.questions.length === 0 ? (
                        <p className="text-slate-400">Belum ada soal untuk quiz ini.</p>
                    ) : (
                        quiz.questions.map((q, i) => (
                            <motion.div
                                key={q.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-slate-800 border border-slate-700 rounded-lg p-5"
                            >
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-semibold mb-3">{i + 1}. {q.question_text}</h3>
                                        <div className="space-y-2 text-sm">
                                            {q.options.map((opt, j) => {
                                                const label = String.fromCharCode(65 + j);
                                                const isCorrect = q.correct_answer === label;
                                                return (
                                                    <div
                                                        key={j}
                                                        className={`flex items-center gap-2 px-3 py-2 rounded ${isCorrect ? 'bg-emerald-700/30 border border-emerald-500' : 'bg-slate-700/40'}`}
                                                    >
                                                        <span className="w-6 font-semibold">{label}.</span>
                                                        <span className={isCorrect ? 'text-emerald-300' : 'text-slate-300'}>
                                                            {opt}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 items-end">
                                        <button
                                            onClick={() => handleEdit(q)}
                                            className="text-slate-300 hover:text-white p-2 rounded hover:bg-slate-700"
                                            title="Edit"
                                        >
                                            <FiEdit2 />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(q)}
                                            className="text-rose-400 hover:text-rose-300 p-2 rounded hover:bg-slate-700"
                                            title="Hapus"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Modal Konfirmasi Hapus */}
                <ConfirmModal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={confirmDelete}
                    title="Hapus Soal"
                    confirmText="Hapus"
                    confirmColor="danger"
                >
                    <p className="text-slate-300">
                        Apakah kamu yakin ingin menghapus soal ini? Aksi ini tidak dapat dibatalkan.
                    </p>
                </ConfirmModal>
            </div>
        </AdminLayout>
    );
}
