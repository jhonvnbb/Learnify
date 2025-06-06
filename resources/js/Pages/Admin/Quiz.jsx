import { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FiX, FiBook, FiChevronRight, FiEdit2, FiTrash2, FiList, FiClock, FiBarChart2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { ConfirmModal } from '@/Components/ConfirmModal';

export default function Quiz({ quizzes, availableCourses}) {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);

  const { data, setData, post, put, reset, processing, errors } = useForm({
    course_id: '',
    title: '',
    description: '',
  });

  // Reset form state when form closed
  useEffect(() => {
    if (!showForm) {
      reset();
      setIsEditing(false);
      setEditingQuizId(null);
    }
  }, [showForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing && editingQuizId) {
      put(route('quizzes.update', editingQuizId), {
        onSuccess: () => {
          setShowForm(false);
        },
      });
    } else {
      post(route('quizzes.store'), {
        onSuccess: () => {
          setShowForm(false);
        },
      });
    }
  };

  const handleEdit = (quiz) => {
    setData({
      course_id: quiz.course_id,
      title: quiz.title,
      description: quiz.description || '',
    });
    setEditingQuizId(quiz.id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (quiz) => {
    setQuizToDelete(quiz);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    router.delete(route('quizzes.destroy', quizToDelete.id), {
      onSuccess: () => {
        setShowDeleteModal(false);
      },
    });
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto text-white">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Quiz Management
            </h1>
            <p className="text-gray-500 mt-1">Create and manage interactive quizzes for your courses</p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              reset();
              setIsEditing(false);
              setEditingQuizId(null);
            }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <span>{quizzes.length === 0 ? 'Create First Quiz' : 'New Quiz'}</span>
          </button>
        </div>

        {/* Quiz List */}
        {quizzes.length === 0 && !showForm ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-12 text-center backdrop-blur-sm"
          >
            <div className="max-w-md mx-auto">
              <div className="inline-flex items-center justify-center bg-slate-800 p-5 rounded-full mb-4 border border-slate-700">
                <FiBook className="text-4xl text-cyan-400" />
              </div>
              <h3 className="text-xl font-medium text-slate-300 mb-2">No Quizzes Found</h3>
              <p className="text-slate-500 mb-6">Start by creating your first interactive quiz</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-95"
              >
                Create First Quiz
              </button>
            </div>
          </motion.div>
        ) : (
        <div className="space-y-3">
          {quizzes.map((quiz) => (
            <motion.div
              key={quiz.id}
              className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 transition-all"
            >
              <div className="flex items-center justify-between">
                {/* Left side - Quiz info */}
                <div className="flex items-center space-x-4 min-w-0">
                  <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
                    <FiBook className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                      {quiz.title}
                    </h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-sm text-gray-500 dark:text-slate-400">
                        {quiz.course?.title || 'Unassigned'}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-slate-400">
                        ||
                      </span>
                      <span className="text-xs text-gray-400 dark:text-slate-500">
                        {new Date(quiz.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right side - Actions */}
                <div className="flex items-center space-x-2">
                  <a
                    href={route('questions.index', { quiz: quiz.id })}
                    className="px-3 py-1.5 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                  >
                    Manage
                  </a>
                  
                  <button
                    onClick={() => handleEdit(quiz)}
                    className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    title="Edit Quiz"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(quiz)}
                    className="p-1.5 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    title="Delete Quiz"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>

              {quiz.description && (
                <motion.div>
                  <p className="mt-2 pt-2 text-sm text-gray-500 dark:text-slate-400 border-t border-gray-100 dark:border-slate-700">
                    {quiz.description}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        )}

        {/* Create/Edit Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="relative bg-slate-800 rounded-2xl border border-slate-700/50 w-full max-w-md overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">
                      {isEditing ? 'Edit Quiz' : 'Create New Quiz'}
                    </h2>
                    <button
                      onClick={() => setShowForm(false)}
                      className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-700 transition-colors"
                    >
                      <FiX size={22} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Course</label>
                      <select
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                        value={data.course_id}
                        onChange={(e) => setData('course_id', e.target.value)}
                        disabled={isEditing}
                      >
                        <option value="">Select a course</option>
                        {(isEditing
                          ? quizzes.filter(q => q.id === editingQuizId).map(q => ({
                              id: q.course_id,
                              title: q.course.title
                            }))
                          : availableCourses
                        ).map(course => (
                          <option key={course.id} value={course.id}>
                            {course.title}
                          </option>
                        ))}
                      </select>
                      {errors.course_id && (
                        <p className="mt-1 text-sm text-rose-400">{errors.course_id}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Quiz Title</label>
                      <input
                        type="text"
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        placeholder="Enter quiz title"
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-rose-400">{errors.title}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Description (Optional)
                      </label>
                      <textarea
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all min-h-[100px]"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder="Enter quiz description"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-5 py-2.5 rounded-xl border border-slate-600 hover:bg-slate-700/50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={processing}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-cyan-500/20 disabled:opacity-70"
                      >
                        {processing
                          ? isEditing
                            ? 'Updating...'
                            : 'Creating...'
                          : isEditing
                          ? 'Update Quiz'
                          : 'Create Quiz'}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          title="Delete Quiz"
          confirmText="Delete"
          confirmColor="danger"
        >
          <p className="text-slate-300">
            Are you sure you want to delete the quiz <span className="font-semibold text-white">"{quizToDelete?.title}"</span>?
            This action cannot be undone.
          </p>
          {quizToDelete?.questions_count > 0 && (
            <p className="text-rose-400 mt-3 text-sm bg-rose-500/10 p-3 rounded-lg">
              ⚠️ Warning: This quiz contains {quizToDelete.questions_count} questions that will also be deleted.
            </p>
          )}
        </ConfirmModal>
      </div>
    </AdminLayout>
  );
}