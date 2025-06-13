import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { FiBook, FiAward, FiBarChart2, FiZap, FiChevronRight } from 'react-icons/fi';

export default function Dashboard() {
    const { auth } = usePage().props;
    const user = auth.user;

    // Sample data - replace with your actual data
    const stats = {
        materialsCompleted: 12,
        quizzesTaken: 5,
        pointsEarned: 280,
        learningStreak: 3,
        recommendedCourses: [
            { id: 1, title: "Advanced JavaScript", progress: 65 },
            { id: 2, title: "UI/UX Design Fundamentals", progress: 30 },
        ]
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">
                        Welcome back, <span className="text-cyan-400">{user.name}</span>
                    </h2>
                    <div className="flex items-center space-x-2 bg-slate-800/50 px-3 py-1 rounded-full text-sm">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span>Active</span>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8 bg-gradient-to-br from-[#0f172a] via-[#1a233a] to-[#0f172a] min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">

                    {/* Welcome Banner */}
                    <div className="relative bg-gradient-to-r from-cyan-900/40 via-indigo-900/40 to-purple-900/40 rounded-2xl shadow-2xl p-8 text-white overflow-hidden backdrop-blur-sm border border-slate-700/50">
                        <div className="absolute -top-20 -right-20 opacity-10 text-[20rem] font-bold pointer-events-none">🎓</div>
                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h3 className="text-3xl font-bold mb-2">Hello, {user.name} 👋</h3>
                                    <p className="text-slate-300 mb-6 max-w-2xl">
                                        You're currently on the <span className="font-semibold uppercase text-cyan-300">{user.package_type}</span> plan. 
                                        {user.package_type === 'basic' && ' Unlock premium features today!'}
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    {user.package_type === 'basic' && (
                                        <Link
                                            href={route('upgrade')}
                                            className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-cyan-500/20 transition-all hover:scale-[1.02]"
                                        >
                                            Upgrade to Premium <FiZap className="ml-2" />
                                        </Link>
                                    )}
                                    <Link
                                        href={route('courses.index')}
                                        className="inline-flex items-center justify-center bg-slate-800/70 hover:bg-slate-700/70 text-white px-6 py-3 rounded-xl font-semibold shadow-lg border border-slate-700 transition-all hover:scale-[1.02]"
                                    >
                                        Browse Courses <FiBook className="ml-2" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div className="bg-slate-800/40 backdrop-blur-md p-5 rounded-xl shadow-lg border border-slate-700/50 hover:border-cyan-500/30 transition-all group">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="text-sm font-medium text-slate-400">Materials Completed</h4>
                                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                                    <FiBook size={18} />
                                </div>
                            </div>
                            <div className="flex items-end justify-between">
                                <p className="text-3xl font-bold text-white">{stats.materialsCompleted}</p>
                                <span className="text-sm text-green-400 flex items-center">
                                    +2 this week <FiBarChart2 className="ml-1" />
                                </span>
                            </div>
                        </div>
                        
                        <div className="bg-slate-800/40 backdrop-blur-md p-5 rounded-xl shadow-lg border border-slate-700/50 hover:border-indigo-500/30 transition-all group">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="text-sm font-medium text-slate-400">Quizzes Taken</h4>
                                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                                    <FiAward size={18} />
                                </div>
                            </div>
                            <div className="flex items-end justify-between">
                                <p className="text-3xl font-bold text-white">{stats.quizzesTaken}</p>
                                <span className="text-sm text-green-400 flex items-center">
                                    +1 today <FiBarChart2 className="ml-1" />
                                </span>
                            </div>
                        </div>
                        
                        <div className="bg-slate-800/40 backdrop-blur-md p-5 rounded-xl shadow-lg border border-slate-700/50 hover:border-purple-500/30 transition-all group">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="text-sm font-medium text-slate-400">Points Earned</h4>
                                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                                    <FiAward size={18} />
                                </div>
                            </div>
                            <div className="flex items-end justify-between">
                                <p className="text-3xl font-bold text-white">{stats.pointsEarned}</p>
                                <span className="text-sm text-green-400 flex items-center">
                                    +30 today <FiBarChart2 className="ml-1" />
                                </span>
                            </div>
                        </div>
                        
                        <div className="bg-slate-800/40 backdrop-blur-md p-5 rounded-xl shadow-lg border border-slate-700/50 hover:border-green-500/30 transition-all group">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="text-sm font-medium text-slate-400">Learning Streak</h4>
                                <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                                    <FiZap size={18} />
                                </div>
                            </div>
                            <div className="flex items-end justify-between">
                                <p className="text-3xl font-bold text-white">{stats.learningStreak} days</p>
                                <span className="text-sm text-green-400 flex items-center">
                                    Keep going! <FiBarChart2 className="ml-1" />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recommended Courses */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-white">Continue Learning</h3>
                                <Link href={route('courses.index')} className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center">
                                    View all <FiChevronRight className="ml-1" />
                                </Link>
                            </div>
                            
                            <div className="space-y-4">
                                {stats.recommendedCourses.map(course => (
                                    <div key={course.id} className="bg-slate-800/40 backdrop-blur-md p-5 rounded-xl shadow-lg border border-slate-700/50 hover:border-cyan-500/30 transition-all">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-medium text-white">{course.title}</h4>
                                            <span className="text-xs bg-slate-700/50 px-2 py-1 rounded-full">{course.progress}%</span>
                                        </div>
                                        <div className="w-full bg-slate-700/50 rounded-full h-2">
                                            <div 
                                                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" 
                                                style={{ width: `${course.progress}%` }}
                                            ></div>
                                        </div>
                                        <div className="mt-3 flex justify-end">
                                            <Link 
                                                href={`/courses/${course.id}`} 
                                                className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center"
                                            >
                                                Continue <FiChevronRight className="ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Quick Tips & Activity */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">Quick Tips</h3>
                                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-5 rounded-xl shadow-lg border border-slate-700/50">
                                    <div className="flex items-start">
                                        <div className="bg-cyan-500/10 text-cyan-400 p-2 rounded-lg mr-3">
                                            <FiZap size={18} />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white mb-2">Consistency is Key</h4>
                                            <p className="text-sm text-slate-300">
                                                Complete at least one lesson daily to maintain your learning streak and maximize knowledge retention.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start p-3 rounded-lg bg-slate-800/30 hover:bg-slate-700/50 transition">
                                        <div className="bg-indigo-500/10 text-indigo-400 p-2 rounded-lg mr-3">
                                            <FiBook size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">Completed "JavaScript Basics"</p>
                                            <p className="text-xs text-slate-400">2 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start p-3 rounded-lg bg-slate-800/30 hover:bg-slate-700/50 transition">
                                        <div className="bg-purple-500/10 text-purple-400 p-2 rounded-lg mr-3">
                                            <FiAward size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">Scored 85% on Web Quiz</p>
                                            <p className="text-xs text-slate-400">Yesterday</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start p-3 rounded-lg bg-slate-800/30 hover:bg-slate-700/50 transition">
                                        <div className="bg-green-500/10 text-green-400 p-2 rounded-lg mr-3">
                                            <FiZap size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">3-day streak achieved!</p>
                                            <p className="text-xs text-slate-400">2 days ago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}