import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FiLock, FiUnlock, FiStar, FiArrowRight } from 'react-icons/fi';

export default function Courses({ courses, userPackageType }) {
  const isLocked = (accessType) =>
    accessType === 'premium' && userPackageType !== 'premium';

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">Learning Topics</h2>
          <div className="flex items-center space-x-2 bg-slate-800/50 px-3 py-1 rounded-full text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Available Courses: {courses.length}</span>
          </div>
        </div>
      }
    >
      <Head title="Courses" />

      <div className="py-8 bg-gradient-to-br from-[#0f172a] via-[#1a233a] to-[#0f172a] min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Filter/Search Bar (optional) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-white rounded-xl border border-slate-700/50 text-sm font-medium transition">
                All Categories
              </button>
              <button className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-xl border border-cyan-500/20 text-sm font-medium transition">
                Popular
              </button>
              <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-white rounded-xl border border-slate-700/50 text-sm font-medium transition">
                Newest
              </button>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const locked = isLocked(course.access_type);

              return (
                <div
                  key={course.id}
                  className={`relative group rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                    locked
                      ? 'cursor-not-allowed'
                      : 'hover:-translate-y-2 hover:shadow-xl'
                  }`}
                >
                  {/* Course Image/Thumbnail */}
                  <div className="h-40 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                    <div className="text-5xl opacity-30">{course.emoji || '📚'}</div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6 bg-gradient-to-b from-slate-800/70 to-slate-900/70 backdrop-blur-sm border-t border-slate-700/50">
                    {/* Access Badge */}
                    <div className="flex justify-between items-start mb-3">
                      <span
                        className={`text-xs uppercase font-semibold px-3 py-1 rounded-full ${
                          course.access_type === 'premium'
                            ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white'
                            : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                        }`}
                      >
                        {course.access_type}
                      </span>
                      <div className="flex items-center text-amber-400 text-sm">
                        <FiStar className="fill-current" />
                        <span className="ml-1">{course.rating || '4.8'}</span>
                      </div>
                    </div>

                    {/* Course Title & Description */}
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                      {course.title}
                    </h3>
                    <div
                      className="text-sm text-slate-300 prose prose-invert max-w-none line-clamp-2 mb-4"
                      dangerouslySetInnerHTML={{ __html: course.description }}
                    ></div>

                    {/* Progress Bar (optional) */}
                    {course.progress && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-700/50 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Lock Overlay */}
                    {locked ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm p-6 text-center">
                        <div className="p-4 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full mb-3">
                          <FiLock className="h-8 w-8 text-yellow-400" />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-1">
                          Premium Course
                        </h4>
                        <p className="text-sm text-slate-300 mb-4">
                          Upgrade your plan to access this content
                        </p>
                        <Link
                          href="/upgrade"
                          className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-4 py-2 rounded-lg font-medium text-sm shadow-lg hover:shadow-yellow-500/20 transition"
                        >
                          Upgrade Now
                        </Link>
                      </div>
                    ) : (
                      <Link
                        href={route('courses.show', course.id)}
                        className="absolute inset-0"
                        aria-label={`View ${course.title}`}
                      />
                    )}

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-4 border-t border-slate-700/50">
                      <div className="flex items-center text-sm text-slate-400">
                        <svg
                          className="h-4 w-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {course.duration || '4h 20m'}
                      </div>
                      {!locked && (
                        <div className="flex items-center text-cyan-400 text-sm font-medium group-hover:text-cyan-300 transition">
                          View course
                          <FiArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination (optional) */}
          <div className="flex justify-center mt-8">
            <nav className="flex items-center space-x-2">
              <button className="px-4 py-2 bg-slate-800/50 text-white rounded-lg border border-slate-700/50 disabled:opacity-50">
                Previous
              </button>
              <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg shadow">
                1
              </button>
              <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-white rounded-lg border border-slate-700/50">
                2
              </button>
              <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-white rounded-lg border border-slate-700/50">
                3
              </button>
              <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-white rounded-lg border border-slate-700/50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}