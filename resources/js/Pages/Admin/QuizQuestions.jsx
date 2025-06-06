import { useForm, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FiPlus, FiTrash2, FiEdit, FiX, FiCheck, FiChevronRight, FiMaximize2 } from 'react-icons/fi';

export default function QuizQuestions({ quiz }) {
  const { flash } = usePage().props;
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

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
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Quiz Questions
            </h1>
            <FiChevronRight className="mx-3 text-gray-400" />
            <span className="text-xl font-semibold text-cyan-400">{quiz.title}</span>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-5 py-3 rounded-xl font-medium shadow-lg transition-all hover:shadow-xl hover:scale-105"
          >
            <FiPlus className="text-lg" />
            <span>New Question</span>
          </button>
        </div>

        {quiz.questions.length === 0 ? (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/80 p-12 rounded-2xl border border-slate-700/50 text-center backdrop-blur-sm">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quiz.questions.map((q, i) => (
              <div
                key={q.id}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/80 p-6 rounded-2xl border border-slate-700/50 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm hover:border-cyan-500/30"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold mr-3">
                      {i + 1}
                    </div>
                    <h3 className="font-semibold text-lg text-gray-100 line-clamp-2">{q.question_text}</h3>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(q)}
                      className="p-2 rounded-lg bg-slate-700/50 hover:bg-blue-600/20 text-blue-400 hover:text-blue-300 transition-colors"
                      title="Edit"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this question?')) {
                          router.delete(route('questions.destroy', q.id));
                        }
                      }}
                      className="p-2 rounded-lg bg-slate-700/50 hover:bg-rose-600/20 text-rose-400 hover:text-rose-300 transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3 ml-13">
                  {JSON.parse(q.options).map((opt, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-center p-3 rounded-lg transition-all ${q.correct_answer === String.fromCharCode(65 + idx) ? 
                        'bg-emerald-900/30 border border-emerald-500/30' : 
                        'bg-slate-800/30 hover:bg-slate-700/50'}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${q.correct_answer === String.fromCharCode(65 + idx) ? 
                        'bg-emerald-500 text-white' : 
                        'bg-slate-700 text-gray-400'}`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className={`${q.correct_answer === String.fromCharCode(65 + idx) ? 'text-emerald-200' : 'text-gray-300'}`}>
                        {opt}
                      </span>
                      {q.correct_answer === String.fromCharCode(65 + idx) && (
                        <FiCheck className="ml-auto text-emerald-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Add/Edit Question */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60">
            <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/70 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://tailwindcss.com/_next/static/media/hero-dark@90.5be95f4a.jpg')] bg-cover opacity-10"></div>
              <div className="relative z-10">
                <div className="p-6 border-b border-slate-700/70 flex justify-between items-center bg-gradient-to-r from-slate-800/80 to-slate-900/80">
                  <h3 className="text-2xl font-bold text-gray-100">
                    {editingQuestion ? 'Edit Question' : 'Create New Question'}
                  </h3>
                  <button
                    onClick={handleCancel}
                    className="p-2 rounded-full hover:bg-slate-700/50 transition-colors text-gray-400 hover:text-gray-200"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Question Text</label>
                    <textarea
                      value={data.question_text}
                      onChange={(e) => setData('question_text', e.target.value)}
                      className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-gray-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all min-h-[120px] backdrop-blur-sm"
                      placeholder="Enter your question here..."
                    />
                    {errors.question_text && (
                      <p className="mt-2 text-sm text-rose-400">{errors.question_text}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Answer Options</label>
                    <div className="space-y-3">
                      {data.options.map((opt, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-800/70 border border-slate-700/50 flex items-center justify-center text-gray-300 font-medium">
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
                            className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-gray-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all backdrop-blur-sm"
                            placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                          />
                        </div>
                      ))}
                    </div>
                    {errors.options && (
                      <p className="mt-2 text-sm text-rose-400">{errors.options}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Correct Answer</label>
                    <div className="grid grid-cols-4 gap-3">
                      {['A', 'B', 'C', 'D'].map((option) => (
                        <label
                          key={option}
                          className={`flex items-center justify-center p-4 rounded-xl cursor-pointer transition-all border-2
                            ${data.correct_answer === option
                              ? 'bg-gradient-to-br from-emerald-600 to-teal-600 border-emerald-500 text-white shadow-lg'
                              : 'bg-slate-800/50 border-slate-700/50 text-gray-300 hover:bg-slate-700/50 hover:border-slate-600'}`}
                        >
                          <input
                            type="radio"
                            name="correct_answer"
                            value={option}
                            checked={data.correct_answer === option}
                            onChange={() => setData('correct_answer', option)}
                            className="hidden"
                          />
                          <span className="font-medium">{option}</span>
                          {data.correct_answer === option && (
                            <FiCheck className="ml-2" />
                          )}
                        </label>
                      ))}
                    </div>
                    {errors.correct_answer && (
                      <p className="mt-2 text-sm text-rose-400">{errors.correct_answer}</p>
                    )}
                  </div>

                  <div className="flex justify-end space-x-4 pt-4 border-t border-slate-700/50">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 rounded-xl border border-slate-700/70 text-gray-300 hover:bg-slate-700/50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={processing}
                      className={`px-8 py-3 rounded-xl font-medium text-white transition-all flex items-center space-x-2
                        ${processing
                          ? 'bg-cyan-700 cursor-not-allowed'
                          : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg hover:shadow-xl'}`}
                    >
                      {processing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : editingQuestion ? (
                        <>
                          <FiCheck className="mr-1" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <FiPlus className="mr-1" />
                          Add Question
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
    </AdminLayout>
  );
}