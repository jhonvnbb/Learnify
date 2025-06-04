  import { useState, useEffect } from 'react';
  import { useForm, router } from '@inertiajs/react';
  import AdminLayout from '@/Layouts/AdminLayout';
  import { FiPlus, FiX, FiBook, FiChevronRight, FiEdit2, FiTrash2, FiList } from 'react-icons/fi';
  import { motion, AnimatePresence } from 'framer-motion';
  import { ConfirmModal } from '@/Components/ConfirmModal';

  export default function Quiz({ quizzes, availableCourses }) {
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
        <div className="p-6 max-w-6xl mx-auto text-white">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Quiz Management
              </h1>
              <p className="text-slate-400">Create and manage your course quizzes</p>
            </div>
            <button
              onClick={() => {
                setShowForm(true);
                reset();
                setIsEditing(false);
                setEditingQuizId(null);
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 px-4 py-2.5 rounded-lg transition-all shadow-lg hover:shadow-cyan-500/20"
            >
              <FiPlus /> {quizzes.length === 0 ? 'Create Quiz' : 'New Quiz'}
            </button>
          </div>

          {/* Create/Edit Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-8 shadow-lg backdrop-blur-sm"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    {isEditing ? 'Edit Quiz' : 'Create New Quiz'}
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-700 transition-colors"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Course</label>
                    <select
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
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
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
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
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all min-h-[100px]"
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      placeholder="Enter quiz description"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2.5 rounded-lg border border-slate-600 hover:bg-slate-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={processing}
                      className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-cyan-500/20 disabled:opacity-70"
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
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quiz List */}
          {quizzes.length === 0 && !showForm ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-slate-800 rounded-xl border border-slate-700 p-12 text-center"
            >
              <div className="max-w-md mx-auto">
                <FiBook className="mx-auto text-5xl text-slate-500 mb-4" />
                <h3 className="text-xl font-medium text-slate-300 mb-2">No Quizzes Found</h3>
                <p className="text-slate-500 mb-6">Get started by creating your first quiz</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 px-6 py-2.5 rounded-lg transition-all shadow-lg hover:shadow-cyan-500/20"
                >
                  Create First Quiz
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {quizzes.map((quiz) => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-slate-800 rounded-xl border border-slate-700 p-5 hover:border-cyan-500/50 transition-all group hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white mb-1 truncate">{quiz.title}</h3>
                      <p className="text-sm text-slate-400 mb-2">
                        Course:{' '}
                        <span className="text-slate-300">{quiz.course?.title || 'Unassigned'}</span>
                      </p>
                      {quiz.description && (
                        <p className="text-sm text-slate-500 line-clamp-2">{quiz.description}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <a
                        href={route('questions.index', { quiz: quiz.id })}
                        className="flex items-center gap-1 text-sm bg-cyan-600/10 hover:bg-cyan-600/20 text-cyan-400 px-3 py-1.5 rounded-lg transition-colors"
                        title="Manage Questions"
                      >
                        <FiList size={16} />
                      </a>
                      <button
                        onClick={() => handleEdit(quiz)}
                        className="flex items-center gap-1 text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1.5 rounded-lg transition-colors"
                        title="Edit Quiz"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(quiz)}
                        className="flex items-center gap-1 text-sm bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 px-3 py-1.5 rounded-lg transition-colors"
                        title="Delete Quiz"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-700/50">
                    <span className="text-xs text-slate-500">
                      Created: {new Date(quiz.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500">
                        {quiz.questions_count || 0} questions
                      </span>
                      <a
                        href={route('questions.index', { quiz: quiz.id })}
                        className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                      >
                        Manage <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

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
              Are you sure you want to delete the quiz <span className="font-semibold">"{quizToDelete?.title}"</span>?
              This action cannot be undone.
            </p>
            {quizToDelete?.questions_count > 0 && (
              <p className="text-rose-400 mt-2 text-sm">
                Warning: This quiz contains {quizToDelete.questions_count} questions that will also be deleted.
              </p>
            )}
          </ConfirmModal>
        </div>
      </AdminLayout>
    );
  }