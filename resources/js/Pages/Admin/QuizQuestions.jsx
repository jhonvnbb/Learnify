import { useForm, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';

export default function QuizQuestions({ quiz }) {
  const { flash } = usePage().props;
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null); // new

  const { data, setData, post, put, processing, errors, reset } = useForm({
    question_text: '',
    options: ['', '', '', ''],
    correct_answer: 'A',
  });

  const handleAdd = () => {
    reset();
    setEditingQuestion(null);
    setShowForm(true);
  };

  const handleEdit = (question) => {
    setData({
      question_text: question.question_text,
      options: JSON.parse(question.options),
      correct_answer: question.correct_answer,
    });
    setEditingQuestion(question);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formRoute = editingQuestion
      ? route('questions.update', editingQuestion.id)
      : route('questions.store', quiz.id);

    const method = editingQuestion ? put : post;

    method(formRoute, {
      onSuccess: () => {
        reset();
        setShowForm(false);
        setEditingQuestion(null);
      },
    });
  };

  const handleCancel = () => {
    reset();
    setShowForm(false);
    setEditingQuestion(null);
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto text-white">
        <h1 className="text-2xl font-bold mb-4">Manage Questions - {quiz.title}</h1>

        {quiz.questions.length === 0 && !showForm ? (
          <div className="bg-slate-800 p-6 rounded-lg text-center border border-slate-700">
            <p className="text-slate-300 mb-4">Belum ada soal untuk kuis ini.</p>
            <button
              onClick={handleAdd}
              className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-md"
            >
              <FiPlus className="inline mr-1" /> Tambah Soal
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {quiz.questions.map((q, i) => (
              <div
                key={q.id}
                className="bg-slate-800 p-4 rounded-md border border-slate-700 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">
                      {i + 1}. {q.question_text}
                    </p>
                    <ul className="list-disc list-inside text-slate-400">
                      {JSON.parse(q.options).map((opt, idx) => (
                        <li key={idx}>
                          {String.fromCharCode(65 + idx)}. {opt}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-cyan-400 mt-1">
                      Jawaban benar: {q.correct_answer}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="text-yellow-400 hover:text-yellow-300"
                      onClick={() => handleEdit(q)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-rose-500 hover:text-rose-400"
                      onClick={() => {
                        if (confirm('Yakin ingin menghapus soal ini?')) {
                          router.delete(route('questions.destroy', q.id));
                        }
                      }}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {!showForm && (
              <button
                onClick={handleAdd}
                className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-md"
              >
                <FiPlus className="inline mr-1" /> Tambah Soal
              </button>
            )}
          </div>
        )}

        {/* Form Tambah / Edit Soal */}
        {showForm && (
          <div className="mt-6 bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h2 className="text-xl font-semibold mb-4">
              {editingQuestion ? 'Edit Soal' : 'Tambah Soal'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Pertanyaan</label>
                <input
                  type="text"
                  value={data.question_text}
                  onChange={(e) => setData('question_text', e.target.value)}
                  className="w-full bg-slate-700 rounded px-3 py-2"
                />
                {errors.question_text && (
                  <p className="text-sm text-rose-400">{errors.question_text}</p>
                )}
              </div>

              <div>
                <label className="block mb-1">Pilihan Jawaban</label>
                {data.options.map((opt, idx) => (
                  <input
                    key={idx}
                    type="text"
                    placeholder={`Pilihan ${String.fromCharCode(65 + idx)}`}
                    value={opt}
                    onChange={(e) => {
                      const newOptions = [...data.options];
                      newOptions[idx] = e.target.value;
                      setData('options', newOptions);
                    }}
                    className="w-full bg-slate-700 rounded px-3 py-2 mb-2"
                  />
                ))}
                {errors.options && (
                  <p className="text-sm text-rose-400">{errors.options}</p>
                )}
              </div>

              <div>
                <label className="block mb-1">Jawaban Benar</label>
                <select
                  value={data.correct_answer}
                  onChange={(e) => setData('correct_answer', e.target.value)}
                  className="w-full bg-slate-700 rounded px-3 py-2"
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
                {errors.correct_answer && (
                  <p className="text-sm text-rose-400">{errors.correct_answer}</p>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 rounded border border-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded text-white"
                >
                  {processing
                    ? editingQuestion
                      ? 'Menyimpan...'
                      : 'Menambahkan...'
                    : editingQuestion
                    ? 'Simpan Perubahan'
                    : 'Tambah Soal'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
