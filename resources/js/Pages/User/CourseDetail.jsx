import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { FiBook, FiClock, FiAward, FiDownload, FiPlay, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function CourseDetail({ course }) {
  const [activeSubTopicId, setActiveSubTopicId] = useState(course.sub_topics[0]?.id || null);
  const [transitionDirection, setTransitionDirection] = useState('right');

  const activeSubTopic = course.sub_topics.find(sub => sub.id === activeSubTopicId) || null;
  const currentIndex = course.sub_topics.findIndex(sub => sub.id === activeSubTopicId);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < course.sub_topics.length - 1;

  const navigateToSubTopic = (id, direction = 'right') => {
    setTransitionDirection(direction);
    setActiveSubTopicId(id);
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
            <div className="sticky top-24">
              <div className="bg-gradient-to-b from-cyan-900/30 to-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-cyan-400 flex items-center">
                  <FiBook className="mr-2" />
                  Course Modules
                </h3>

                <ul className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
                  {course.sub_topics.map((sub, idx) => (
                    <li key={sub.id}>
                      <button
                        onClick={() => navigateToSubTopic(sub.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                          activeSubTopicId === sub.id 
                            ? 'bg-cyan-600/30 text-cyan-400 border-l-4 border-cyan-400 shadow-md'
                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="flex items-center justify-center w-6 h-6 bg-slate-700 rounded-full text-xs mr-3">
                            {idx + 1}
                          </span>
                          <span>{sub.title}</span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Course Info */}
              <div className="mt-4 bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center text-sm text-slate-300 mb-2">
                  <FiClock className="mr-2" />
                  Duration: {course.duration || 'Self-paced'}
                </div>
                <div className="flex items-center text-sm text-slate-300">
                  <FiAward className="mr-2" />
                  Level: {course.difficulty || 'All Levels'}
                </div>
              </div>

                {/* Progress Indicator */}
                <div className="mt-6 bg-slate-800/50 rounded-full h-2">
                  <div 
                    className="bg-cyan-500 h-2 rounded-full" 
                    style={{ 
                      width: `${((currentIndex + 1) / course.sub_topics.length) * 100}%` 
                    }}
                  />
                </div>
            </div>
          </aside>

          {/* Main Content - Single Subtopic View */}
          <div className="lg:w-3/4">
            {activeSubTopic ? (
              <div className="relative">
                {/* Navigation Arrows */}
                <div className="flex justify-between mb-4">
                  <button
                    onClick={navigatePrevious}
                    disabled={!hasPrevious}
                    className={`flex items-center px-4 py-2 rounded-lg ${hasPrevious ? 'text-cyan-400 hover:bg-slate-800/50' : 'text-slate-600 cursor-not-allowed'}`}
                  >
                    <FiChevronLeft className="mr-1" />
                    Previous
                  </button>
                  <button
                    onClick={navigateNext}
                    disabled={!hasNext}
                    className={`flex items-center px-4 py-2 rounded-lg ${hasNext ? 'text-cyan-400 hover:bg-slate-800/50' : 'text-slate-600 cursor-not-allowed'}`}
                  >
                    Next
                    <FiChevronRight className="ml-1" />
                  </button>
                </div>

                {/* Current Subtopic */}
                <div 
                  key={activeSubTopic.id}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50 shadow-lg"
                >
                  <div className="flex items-start mb-6">
                    <div className="flex items-center justify-center bg-cyan-500/20 text-cyan-400 rounded-lg w-10 h-10 text-lg font-bold mr-4">
                      {currentIndex + 1}
                    </div>
                    <h4 className="text-2xl font-bold text-white mt-1">
                      {activeSubTopic.title}
                    </h4>
                  </div>

                  <div
                    className="prose prose-invert max-w-none mb-6"
                    dangerouslySetInnerHTML={{ __html: activeSubTopic.content }}
                  />

                  {/* Resources Section */}
                  {(activeSubTopic.pdf_path || activeSubTopic.video_path) && (
                    <div className="mt-8 pt-6 border-t border-slate-700/50">
                      <h5 className="text-lg font-semibold text-cyan-400 mb-4">
                        Learning Resources
                      </h5>
                      
                      <div className="grid gap-6">
                        {/* PDF Viewer */}
                        {activeSubTopic.pdf_path && (
                          <div className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700/50">
                            <div className="bg-slate-800/50 px-4 py-3 flex items-center">
                              <FiDownload className="text-red-400 mr-2" />
                              <span className="font-medium">PDF Document</span>
                              <a 
                                href={`/storage/${activeSubTopic.pdf_path}`} 
                                download
                                className="ml-auto text-sm text-cyan-400 hover:text-cyan-300 flex items-center"
                              >
                                Download
                              </a>
                            </div>
                            <iframe
                              src={`/storage/${activeSubTopic.pdf_path}#view=fitH`}
                              className="w-full h-96"
                              title={`PDF ${activeSubTopic.title}`}
                            />
                          </div>
                        )}

                        {/* Video Viewer */}
                        {activeSubTopic.video_path && (
                          <div className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700/50">
                            <div className="bg-slate-800/50 px-4 py-3 flex items-center">
                              <FiPlay className="text-purple-400 mr-2" />
                              <span className="font-medium">Video Lesson</span>
                            </div>
                            <video
                              controls
                              className="w-full bg-black"
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
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800/50 rounded-full mb-4">
                  <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-medium text-slate-400 mb-2">No Modules Available</h4>
                <p className="text-slate-500 max-w-md mx-auto">This course doesn't have any modules yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}