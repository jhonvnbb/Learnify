import { useForm, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FiPlus, FiTrash2, FiEdit, FiX, FiCheck, FiChevronRight, FiMaximize2 } from 'react-icons/fi';
import { ConfirmModal } from '@/Components/ConfirmModal';

export default function QuizQuestions({ quiz }) {
  const { flash } = usePage().props;
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);


  const { data, setData, post, put, processing, errors, reset } = useForm({
    question_text: '',
    options: ['', '', '', ''],
    correct_answer: 'A',
  });

  const handleAdd = () => {
    reset();
    setEditingQuestion(null);
    setShowModal(true);
  };

  const handleEdit = (question) => {
    setData({
      question_text: question.question_text,
      options: JSON.parse(question.options),
      correct_answer: question.correct_answer,
    });
    setEditingQuestion(question);
    setShowModal(true);
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
        setShowModal(false);
        setEditingQuestion(null);
      },
    });
  };

  const handleCancel = () => {
    reset();
    setShowModal(false);
    setEditingQuestion(null);
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto text-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <a href={route('quizzes.index')} className="text-2xl md:text-3xl font-bold text-gray-900 hover:underline transition duration-200">
              Quiz Questions
            </a>
            <FiChevronRight className="mx-3 text-gray-400" />
            <span className="text-gray-500">{quiz.title}</span>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-5 py-3 rounded-xl font-medium shadow-lg transition-all hover:shadow-xl hover:scale-105"
          >
            <span>New Question</span>
          </button>
        </div>

        {quiz.questions.length === 0 ? (
          <div className="bg-slate-800 p-12 rounded-xl border border-slate-700 text-center">
            <div className="mx-auto w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6 border-2 border-dashed border-slate-600">
              <FiMaximize2 className="text-3xl text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-200 mb-3">No Questions Yet</h3>
            <p className="text-slate-400 max-w-md mx-auto mb-6">
              Start by adding your first question to this quiz. Create engaging multiple-choice questions to test your participants.
            </p>
            <button
              onClick={handleAdd}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3 rounded-xl font-medium shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              <FiPlus className="inline mr-2" /> Create First Question
            </button>
          </div>
        ) : (
        <div className="space-y-6">
          {quiz.questions.map((q, i) => (
            <div
              key={q.id}
              className="group relative bg-slate-900 border border-slate-700/60 rounded-2xl p-6 shadow-lg transition-all hover:border-teal-500/30 hover:shadow-xl hover:scale-[1.01]"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-sky-600 flex items-center justify-center text-white font-bold text-sm shadow">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100">{q.question_text}</h3>
                    {/* <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-teal-400 font-medium">
                        {q.correct_answer} is correct
                      </span>
                      <span>{JSON.parse(q.options).length} options</span>
                    </div> */}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleEdit(q)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-600/30 text-indigo-400 hover:text-indigo-300 transition-all"
                    title="Edit"
                  >
                    <FiEdit size={16} />
                  </button>
<button
  onClick={() => {
    setQuestionToDelete(q.id);
    setShowConfirmModal(true);
  }}
  className="p-2 rounded-lg bg-slate-800 hover:bg-rose-600/30 text-rose-400 hover:text-rose-300 transition-all"
  title="Delete"
>
  <FiTrash2 size={16} />
</button>

                </div>
              </div>

              {/* Option List */}
              <div className="space-y-2.5 ml-12">
                {JSON.parse(q.options).map((opt, idx) => {
                  const isCorrect = q.correct_answer === String.fromCharCode(65 + idx);
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-center px-4 py-3 rounded-xl border transition-all ${
                        isCorrect 
                          ? 'bg-emerald-900/30 border-emerald-600/20' 
                          : 'bg-slate-800 border-slate-700 hover:bg-slate-700/70'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center mr-3 text-xs font-bold ${
                        isCorrect 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-slate-700 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className={`text-sm ${
                        isCorrect ? 'text-emerald-100' : 'text-slate-300'
                      }`}>
                        {opt}
                      </span>
                      {isCorrect && (
                        <FiCheck className="ml-auto text-emerald-400" size={16} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Glow Hover Effect */}
              <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/10 rounded-2xl blur-md"></div>
              </div>
            </div>
          ))}
        </div>

        )}

        {/* Modal for Add/Edit Question */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40">
          <div className="relative w-full max-w-lg bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/60 shadow-xl overflow-hidden">
            {/* Subtle animated background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[url('https://tailwindcss.com/_next/static/media/hero-dark@90.5be95f4a.jpg')] bg-cover opacity-50 animate-pulse-slow"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-slate-900/30 to-transparent"></div>
            </div>
            
            <div className="relative z-10">
              {/* Header with glass effect */}
              <div className="p-5 border-b border-slate-700/60 flex justify-between items-center bg-slate-800/70 backdrop-blur-md">
                <h3 className="text-xl font-semibold text-gray-100 tracking-tight">
                  {editingQuestion ? 'Edit Question' : 'New Question'}
                </h3>
                <button
                  onClick={handleCancel}
                  className="p-1.5 rounded-lg hover:bg-slate-700/50 transition-all text-gray-400 hover:text-gray-200"
                >
                  <FiX size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-5 space-y-5">
                {/* Question Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Question</label>
                  <textarea
                    value={data.question_text}
                    onChange={(e) => setData('question_text', e.target.value)}
                    className="w-full bg-slate-800/40 border border-slate-700/40 rounded-lg px-4 py-2.5 text-gray-100 focus:ring-1.5 focus:ring-cyan-400 focus:border-transparent transition-all min-h-[100px] text-sm placeholder-slate-500"
                    placeholder="Enter your question here..."
                  />
                  {errors.question_text && (
                    <p className="mt-1.5 text-xs text-rose-400/90">{errors.question_text}</p>
                  )}
                </div>

                {/* Answer Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Options</label>
                  <div className="space-y-2">
                    {data.options.map((opt, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-md bg-slate-800/60 border border-slate-700/40 flex items-center justify-center text-gray-300 font-medium text-sm">
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const newOptions = [...data.options];
                            newOptions[idx] = e.target.value;
                            setData('options', newOptions);
                          }}
                          className="flex-1 bg-slate-800/40 border border-slate-700/40 rounded-lg px-3.5 py-2 text-sm text-gray-100 focus:ring-1.5 focus:ring-cyan-400 focus:border-transparent transition-all placeholder-slate-500"
                          placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                        />
                      </div>
                    ))}
                  </div>
                  {errors.options && (
                    <p className="mt-1.5 text-xs text-rose-400/90">{errors.options}</p>
                  )}
                </div>

                {/* Correct Answer */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Correct Answer</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['A', 'B', 'C', 'D'].map((option) => (
                      <label
                        key={option}
                        className={`flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all border
                          ${data.correct_answer === option
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-500 border-emerald-400 text-white shadow-md'
                            : 'bg-slate-800/40 border-slate-700/40 text-gray-300 hover:bg-slate-700/40 hover:border-slate-600'}`}
                      >
                        <input
                          type="radio"
                          name="correct_answer"
                          value={option}
                          checked={data.correct_answer === option}
                          onChange={() => setData('correct_answer', option)}
                          className="hidden"
                        />
                        <span className="font-medium text-sm">{option}</span>
                        {data.correct_answer === option && (
                          <FiCheck className="ml-1.5" size={14} />
                        )}
                      </label>
                    ))}
                  </div>
                  {errors.correct_answer && (
                    <p className="mt-1.5 text-xs text-rose-400/90">{errors.correct_answer}</p>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700/50">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-5 py-2 rounded-lg border border-slate-700/50 text-gray-300 hover:bg-slate-700/40 transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className={`px-6 py-2 rounded-lg font-medium text-white transition-all flex items-center text-sm
                      ${processing
                        ? 'bg-cyan-600/80 cursor-not-allowed'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow hover:shadow-md'}`}
                  >
                    {processing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : editingQuestion ? (
                      <>
                        <FiCheck className="mr-1.5" size={14} />
                        Save
                      </>
                    ) : (
                      <>
                        <FiPlus className="mr-1.5" size={14} />
                        Add
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      </div>

      <ConfirmModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          router.delete(route('questions.destroy', questionToDelete));
          setShowConfirmModal(false);
        }}
        title="Hapus Soal"
        confirmText="Hapus"
        confirmColor="danger"
      >
        <p className="text-slate-300">
          Apakah Anda yakin ingin menghapus soal ini? Tindakan ini tidak bisa dibatalkan.
        </p>
      </ConfirmModal>

    </AdminLayout>
  );
}