import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { FiBook, FiClock, FiAward, FiDownload, FiPlay, FiChevronLeft, FiChevronRight, FiBarChart2, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import axios from 'axios';

export default function CourseDetail({ course }) {
  const [activeSubTopicId, setActiveSubTopicId] = useState(course.sub_topics[0]?.id || null);
  const [transitionDirection, setTransitionDirection] = useState('right');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [scoreResult, setScoreResult] = useState(null);
  const [alreadyAttempted, setAlreadyAttempted] = useState(false);
  const [storedUserAnswers, setStoredUserAnswers] = useState({});
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);

  const activeSubTopic = course.sub_topics.find(sub => sub.id === activeSubTopicId) || null;
  const currentIndex = course.sub_topics.findIndex(sub => sub.id === activeSubTopicId);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < course.sub_topics.length - 1;
  const progressPercentage = ((currentIndex + 1) / course.sub_topics.length) * 100;

  const navigateToSubTopic = (id, direction = 'right') => {
    setTransitionDirection(direction);
    setActiveSubTopicId(id);
    setShowQuiz(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigatePrevious = () => {
    if (hasPrevious) {
      const prevId = course.sub_topics[currentIndex - 1].id;
      navigateToSubTopic(prevId, 'left');
    }
  };

  const navigateNext = () => {
    if (hasNext) {
      const nextId = course.sub_topics[currentIndex + 1].id;
      navigateToSubTopic(nextId, 'right');
    }
  };

  const loadQuiz = async () => {
    setIsLoadingQuiz(true);
    try {
      const response = await axios.get(`/courses/${course.id}/quiz`);
      const { quiz, already_attempted, user_answers, score } = response.data;

      setQuizData(quiz);
      setAlreadyAttempted(already_attempted);
      setStoredUserAnswers(user_answers);
      setScoreResult(score ? { score, total: quiz.questions.length } : null);
      setShowQuiz(true);
    } catch (error) {
      console.error('Failed to load quiz:', error);
    } finally {
      setIsLoadingQuiz(false);
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmitQuiz = async () => {
    try {
      const payload = {
        answers: Object.entries(userAnswers).map(([question_id, user_answer]) => ({
          question_id,
          user_answer,
        })),
      };

      const response = await axios.post(`/quizzes/${quizData.id}/submit`, payload);
      setScoreResult(response.data);
      setAlreadyAttempted(true);
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-white">{course.title}</h2>
          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
            {course.sub_topics.length} {course.sub_topics.length === 1 ? 'Module' : 'Modules'}
          </span>
        </div>
      }
    >
      <Head title={course.title} />

      <div className="py-12 bg-gradient-to-br from-[#0f172a] to-[#1e293b] min-h-screen text-white">
        <div className="max-w-7xl mx-auto px-4 lg:flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-1/4 mb-8 lg:mb-0">
            <div className="sticky top-24 space-y-4">
              {/* Course Progress Card */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-slate-300">Course Progress</h3>
                  <span className="text-sm font-semibold text-cyan-400">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full" 
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                  <span>{currentIndex + 1} of {course.sub_topics.length} modules</span>
                  <span>{course.duration || 'Self-paced'}</span>
                </div>
              </div>

              {/* Modules List */}
              <div className="bg-gradient-to-b from-slate-800/30 to-slate-900/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-cyan-400 flex items-center">
                  <FiBook className="mr-2" />
                  Course Modules
                </h3>

                <ul className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-1 custom-scrollbar">
                  {course.sub_topics.map((sub, idx) => (
                    <li key={sub.id}>
                      <button
                        onClick={() => navigateToSubTopic(sub.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center group ${
                          activeSubTopicId === sub.id && !showQuiz
                            ? 'bg-gradient-to-r from-cyan-600/30 to-blue-600/30 text-cyan-400 shadow-lg'
                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                        }`}
                      >
                        <span className={`flex items-center justify-center w-7 h-7 rounded-lg mr-3 ${
                          activeSubTopicId === sub.id && !showQuiz
                            ? 'bg-cyan-500/20 text-cyan-400'
                            : 'bg-slate-700/70 text-slate-300 group-hover:bg-slate-600/50'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="text-left">{sub.title}</span>
                        {activeSubTopicId === sub.id && !showQuiz && (
                          <span className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quiz Button */}
              <button
                onClick={loadQuiz}
                disabled={isLoadingQuiz}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center ${
                  showQuiz 
                    ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/30 text-purple-400 shadow-lg' 
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                } ${isLoadingQuiz ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <FiBarChart2 className="mr-2" />
                {isLoadingQuiz ? 'Loading Quiz...' : 'Take Quiz'}
                {showQuiz && <span className="ml-auto w-2 h-2 bg-purple-400 rounded-full animate-pulse" />}
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {showQuiz ? (
              quizData ? (
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 shadow-lg">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{quizData.title}</h3>
                      <p className="text-slate-400">Test your knowledge from {course.title}</p>
                    </div>
                    {alreadyAttempted && scoreResult && (
                      <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 px-4 py-2 rounded-lg border border-emerald-500/30">
                        <span className="font-semibold text-emerald-400">
                          Score: {scoreResult.score}/{scoreResult.total}
                        </span>
                      </div>
                    )}
                  </div>

                  {quizData.questions.length > 0 ? (
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmitQuiz(); }}>
                      <ul className="space-y-6">
                        {quizData.questions.map((q, idx) => {
                          const options = JSON.parse(q.options);
                          const selectedAnswer = alreadyAttempted 
                            ? storedUserAnswers[q.id] 
                            : userAnswers[q.id];
                          const correctAnswer = q.correct_answer;

                          return (
                            <li key={q.id} className="bg-slate-900/70 p-6 rounded-xl border border-slate-700/50 shadow">
                              <div className="flex items-start mb-4">
                                <div className="flex items-center justify-center bg-slate-800 text-slate-300 rounded-lg w-8 h-8 text-sm font-bold mr-3">
                                  {idx + 1}
                                </div>
                                <p className="text-lg font-medium text-white mt-1">{q.question_text}</p>
                              </div>

                              <div className="space-y-3 ml-11">
                                {options.map((opt, i) => {
                                  const optionKey = String.fromCharCode(65 + i);
                                  const isSelected = selectedAnswer === optionKey;
                                  const isCorrect = alreadyAttempted && correctAnswer === optionKey;
                                  const isWrong = alreadyAttempted && isSelected && !isCorrect;

                                  return (
                                    <label
                                      key={i}
                                      className={`block px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                                        isCorrect
                                          ? 'bg-emerald-900/30 border-emerald-500/50 text-white'
                                          : isWrong
                                            ? 'bg-rose-900/30 border-rose-500/50 text-white'
                                            : isSelected
                                              ? 'bg-blue-900/30 border-blue-500/50 text-white'
                                              : 'border-slate-700/50 hover:border-slate-600 text-slate-300'
                                      }`}
                                    >
                                      <div className="flex items-center">
                                        <input
                                          type="radio"
                                          name={`question-${q.id}`}
                                          value={optionKey}
                                          disabled={alreadyAttempted}
                                          checked={isSelected}
                                          onChange={() => !alreadyAttempted && handleAnswerChange(q.id, optionKey)}
                                          className="mr-3 w-5 h-5"
                                        />
                                        <span className="font-medium">{optionKey}.</span>
                                        <span className="ml-2">{opt}</span>
                                        {alreadyAttempted && (
                                          <span className="ml-auto">
                                            {isCorrect ? (
                                              <FiCheckCircle className="text-emerald-400" />
                                            ) : isWrong ? (
                                              <FiXCircle className="text-rose-400" />
                                            ) : null}
                                          </span>
                                        )}
                                      </div>
                                    </label>
                                  );
                                })}
                              </div>
                            </li>
                          );
                        })}
                      </ul>

                      {alreadyAttempted ? (
                        <div className="mt-8 p-6 bg-gradient-to-r from-emerald-900/20 to-slate-800/50 rounded-xl border border-emerald-500/30 flex items-center">
                          <FiCheckCircle className="text-emerald-400 text-2xl mr-4" />
                          <div>
                            <h4 className="text-lg font-semibold text-white">Quiz Completed</h4>
                            <p className="text-slate-400 mt-1">
                              You scored {scoreResult.score} out of {scoreResult.total} ({Math.round((scoreResult.score / scoreResult.total) * 100)}%)
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-8 flex justify-end">
                          <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-6 py-3 rounded-xl text-white font-semibold shadow-lg transition-all duration-200"
                            disabled={Object.keys(userAnswers).length !== quizData.questions.length}
                          >
                            Submit Answers
                          </button>
                        </div>
                      )}
                    </form>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-slate-400 text-lg">No questions available for this quiz.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 shadow-lg text-center py-12">
                  <p className="text-slate-400 text-lg">Quiz not found for this course.</p>
                </div>
              )
            ) : (
              activeSubTopic && (
                <div className="relative">
                  {/* Navigation Arrows */}
                  <div className="flex justify-between mb-6">
                    <button
                      onClick={navigatePrevious}
                      disabled={!hasPrevious}
                      className={`flex items-center px-5 py-2.5 rounded-xl transition-all duration-200 ${
                        hasPrevious
                          ? 'text-cyan-400 hover:bg-slate-800/50 hover:text-white'
                          : 'text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      <FiChevronLeft className="mr-2" />
                      Previous
                    </button>
                    <button
                      onClick={navigateNext}
                      disabled={!hasNext}
                      className={`flex items-center px-5 py-2.5 rounded-xl transition-all duration-200 ${
                        hasNext
                          ? 'text-cyan-400 hover:bg-slate-800/50 hover:text-white'
                          : 'text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      Next
                      <FiChevronRight className="ml-2" />
                    </button>
                  </div>

                  {/* SubTopic Content */}
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 shadow-lg">
                    <div className="flex items-start mb-8">
                      <div className="flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl w-12 h-12 text-lg font-bold text-white mr-5">
                        {currentIndex + 1}
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-white">{activeSubTopic.title}</h4>
                        <p className="text-slate-400 mt-1">Module {currentIndex + 1} of {course.sub_topics.length}</p>
                      </div>
                    </div>
                    
                    <div 
                      className="prose prose-invert max-w-none mb-8 text-slate-300"
                      dangerouslySetInnerHTML={{ __html: activeSubTopic.content }} 
                    />
                    
                    {/* Resource viewer */}
                    {(activeSubTopic.pdf_path || activeSubTopic.video_path) && (
                      <div className="mt-10 pt-8 border-t border-slate-700/50">
                        <h5 className="text-xl font-semibold text-cyan-400 mb-6 flex items-center">
                          <span className="bg-cyan-500/20 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                            {activeSubTopic.pdf_path ? <FiDownload size={18} /> : <FiPlay size={18} />}
                          </span>
                          Learning Resources
                        </h5>
                        <div className="grid gap-6">
                          {activeSubTopic.pdf_path && (
                            <div className="bg-slate-900/70 rounded-xl overflow-hidden border border-slate-700/50 shadow-lg">
                              <div className="bg-slate-800/50 px-5 py-3.5 flex items-center">
                                <FiDownload className="text-red-400 mr-3" size={18} />
                                <span className="font-medium">PDF Document</span>
                                <a 
                                  href={`/storage/${activeSubTopic.pdf_path}`} 
                                  download 
                                  className="ml-auto text-sm bg-slate-700/50 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-cyan-400 hover:text-cyan-300 flex items-center transition-all duration-200"
                                >
                                  Download
                                </a>
                              </div>
                              <iframe 
                                src={`/storage/${activeSubTopic.pdf_path}#view=fitH`} 
                                className="w-full h-[500px]" 
                                title={`PDF ${activeSubTopic.title}`} 
                              />
                            </div>
                          )}
                          {activeSubTopic.video_path && (
                            <div className="bg-slate-900/70 rounded-xl overflow-hidden border border-slate-700/50 shadow-lg">
                              <div className="bg-slate-800/50 px-5 py-3.5 flex items-center">
                                <FiPlay className="text-purple-400 mr-3" size={18} />
                                <span className="font-medium">Video Lesson</span>
                              </div>
                              <video 
                                controls 
                                className="w-full bg-black aspect-video"
                                src={`/storage/${activeSubTopic.video_path}`} 
                                poster={activeSubTopic.video_thumbnail || '/default-video-thumbnail.jpg'}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(94, 234, 212, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(94, 234, 212, 0.6);
        }
        .prose-invert :where(iframe):not(:where([class~="not-prose"] *)) {
          margin-top: 0;
          margin-bottom: 0;
        }
      `}</style>
    </AuthenticatedLayout>
  );
}