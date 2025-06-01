import React, { useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import ReactQuill from "react-quill";
import { Inertia } from "@inertiajs/inertia";
import "react-quill/dist/quill.snow.css";

export default function Courses({ courses }) {
    const [showCourseForm, setShowCourseForm] = useState(false);
    const [showSubTopicForm, setShowSubTopicForm] = useState(null);
    const [expandedCourse, setExpandedCourse] = useState(null);
    const [editingCourse, setEditingCourse] = useState(null);
    const [editingSubTopic, setEditingSubTopic] = useState(null);

    const courseForm = useForm({
        title: "",
        description: "",
        access_type: "basic",
    });

    const subTopicForm = useForm({
        course_id: "",
        title: "",
        content: "",
        pdf: null,
        video: null,
    });

    const handleCourseSubmit = (e) => {
        e.preventDefault();
        courseForm.post(route("admin.courses.store"), {
            onSuccess: () => {
                courseForm.reset();
                setShowCourseForm(false);
            },
        });
    };

    const handleSubTopicSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("course_id", showSubTopicForm);
        formData.append("title", subTopicForm.data.title);
        formData.append("content", subTopicForm.data.content || "");

        if (subTopicForm.data.pdf) {
            formData.append("pdf", subTopicForm.data.pdf);
        }

        if (subTopicForm.data.video) {
            formData.append("video", subTopicForm.data.video);
        }

        Inertia.post(route("subtopics.store"), formData, {
            forceFormData: true,
            onSuccess: () => {
                subTopicForm.reset();
                setShowSubTopicForm(null);
            },
        });
    };

    const toggleCourseExpand = (courseId) => {
        setExpandedCourse(expandedCourse === courseId ? null : courseId);
    };

    const handleDeleteCourse = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus course ini?")) {
            Inertia.delete(route("admin.courses.destroy", id));
        }
    };

    const handleDeleteSubTopic = (id) => {
        if (confirm("Hapus subtopik ini?")) {
            Inertia.delete(route("subtopics.destroy", id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Kelola Courses" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Course Management
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Create and organize your learning materials
                        </p>
                    </div>
                    <button
                        onClick={() => setShowCourseForm(!showCourseForm)}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                    >
                        {showCourseForm ? "Close Form" : "New Course"}
                    </button>
                </div>

                {showCourseForm && (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10 border border-gray-100">
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Create New Course
                            </h2>
                        </div>
                        <form
                            onSubmit={handleCourseSubmit}
                            className="p-6 space-y-6"
                        >
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Course Title
                                </label>
                                <input
                                    type="text"
                                    value={courseForm.data.title}
                                    onChange={(e) =>
                                        courseForm.setData(
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="Enter course title"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <div className="rounded-lg border border-gray-300 overflow-hidden">
                                    <ReactQuill
                                        theme="snow"
                                        value={courseForm.data.description}
                                        onChange={(value) =>
                                            courseForm.setData(
                                                "description",
                                                value
                                            )
                                        }
                                        className="h-48"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Access Level
                                </label>
                                <div className="flex gap-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            className="form-radio h-4 w-4 text-indigo-600"
                                            value="basic"
                                            checked={
                                                courseForm.data.access_type ===
                                                "basic"
                                            }
                                            onChange={() =>
                                                courseForm.setData(
                                                    "access_type",
                                                    "basic"
                                                )
                                            }
                                        />
                                        <span className="ml-2 text-gray-700">
                                            Basic
                                        </span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            className="form-radio h-4 w-4 text-indigo-600"
                                            value="premium"
                                            checked={
                                                courseForm.data.access_type ===
                                                "premium"
                                            }
                                            onChange={() =>
                                                courseForm.setData(
                                                    "access_type",
                                                    "premium"
                                                )
                                            }
                                        />
                                        <span className="ml-2 text-gray-700">
                                            Premium
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCourseForm(false)}
                                    className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-colors flex items-center gap-2"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Save Course
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {courses.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 mx-auto text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">
                            No courses available
                        </h3>
                        <p className="mt-1 text-gray-500">
                            Get started by creating your first course.
                        </p>
                        <button
                            onClick={() => setShowCourseForm(true)}
                            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                        >
                            Create Course
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {courses.map((course, courseIndex) => (
                            <div
                                key={course.id}
                                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-start">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-indigo-100 p-3 rounded-lg">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-indigo-600"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                                {course.title}
                                                <span
                                                    className={`text-xs px-2 py-1 rounded-full ${
                                                        course.access_type ===
                                                        "premium"
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : "bg-blue-100 text-blue-800"
                                                    }`}
                                                >
                                                    {course.access_type}
                                                </span>
                                            </h2>
                                            <div
                                                className="prose prose-sm text-gray-500 mt-1 line-clamp-2"
                                                dangerouslySetInnerHTML={{
                                                    __html: course.description,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingCourse(course);
                                                courseForm.setData({
                                                    title: course.title,
                                                    description:
                                                        course.description,
                                                    access_type:
                                                        course.access_type,
                                                });
                                            }}
                                            className="p-2 text-yellow-500 hover:text-yellow-700 hover:bg-yellow-100 rounded-full"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-9.793 9.793H4v-2.621l9.586-9.586z" />
                                            </svg>
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDeleteCourse(course.id)
                                            }
                                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>

                                        <button
                                            onClick={() =>
                                                toggleCourseExpand(course.id)
                                            }
                                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d={
                                                        expandedCourse ===
                                                        course.id
                                                            ? "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                                            : "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                    }
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() =>
                                                setShowSubTopicForm(
                                                    showSubTopicForm ===
                                                        course.id
                                                        ? null
                                                        : course.id
                                                )
                                            }
                                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg shadow-sm transition-colors flex items-center gap-1"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Subtopic
                                        </button>
                                    </div>
                                </div>

                                {editingCourse && (
                                    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10 border border-gray-100">
                                        <div className="bg-yellow-50 px-6 py-4 border-b border-gray-200">
                                            <h2 className="text-xl font-semibold text-gray-800">
                                                Edit Course
                                            </h2>
                                        </div>
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                Inertia.put(
                                                    route(
                                                        "admin.courses.update",
                                                        editingCourse.id
                                                    ),
                                                    {
                                                        title: courseForm.data
                                                            .title,
                                                        description:
                                                            courseForm.data
                                                                .description,
                                                        access_type:
                                                            courseForm.data
                                                                .access_type,
                                                    },
                                                    {
                                                        onSuccess: () => {
                                                            courseForm.reset();
                                                            setEditingCourse(
                                                                null
                                                            );
                                                        },
                                                    }
                                                );
                                            }}
                                            className="p-6 space-y-6"
                                        >
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Course Title
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        courseForm.data.title
                                                    }
                                                    onChange={(e) =>
                                                        courseForm.setData(
                                                            "title",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                                    placeholder="Enter course title"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Description
                                                </label>
                                                <div className="rounded-lg border border-gray-300 overflow-hidden">
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={
                                                            courseForm.data
                                                                .description
                                                        }
                                                        onChange={(value) =>
                                                            courseForm.setData(
                                                                "description",
                                                                value
                                                            )
                                                        }
                                                        className="h-48"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Access Level
                                                </label>
                                                <div className="flex gap-4">
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            className="form-radio h-4 w-4 text-indigo-600"
                                                            value="basic"
                                                            checked={
                                                                courseForm.data
                                                                    .access_type ===
                                                                "basic"
                                                            }
                                                            onChange={() =>
                                                                courseForm.setData(
                                                                    "access_type",
                                                                    "basic"
                                                                )
                                                            }
                                                        />
                                                        <span className="ml-2 text-gray-700">
                                                            Basic
                                                        </span>
                                                    </label>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            className="form-radio h-4 w-4 text-indigo-600"
                                                            value="premium"
                                                            checked={
                                                                courseForm.data
                                                                    .access_type ===
                                                                "premium"
                                                            }
                                                            onChange={() =>
                                                                courseForm.setData(
                                                                    "access_type",
                                                                    "premium"
                                                                )
                                                            }
                                                        />
                                                        <span className="ml-2 text-gray-700">
                                                            Premium
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="flex justify-end gap-3 pt-4">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setEditingCourse(null)
                                                    }
                                                    className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                                >
                                                    Batal
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-sm"
                                                >
                                                    Update Course
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {(expandedCourse === course.id ||
                                    showSubTopicForm === course.id) && (
                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                        {showSubTopicForm === course.id && (
                                            <form
                                                onSubmit={handleSubTopicSubmit}
                                                className="space-y-4 mb-6"
                                            >
                                                <h3 className="text-lg font-medium text-gray-800">
                                                    Add New Subtopic
                                                </h3>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Subtopic Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={
                                                            subTopicForm.data
                                                                .title
                                                        }
                                                        onChange={(e) =>
                                                            subTopicForm.setData(
                                                                "title",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="Enter subtopic title"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Content
                                                    </label>
                                                    <div className="rounded-lg border border-gray-300 overflow-hidden">
                                                        <ReactQuill
                                                            value={
                                                                subTopicForm
                                                                    .data
                                                                    .content
                                                            }
                                                            onChange={(value) =>
                                                                subTopicForm.setData(
                                                                    "content",
                                                                    value
                                                                )
                                                            }
                                                            className="h-48"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            PDF File
                                                        </label>
                                                        <div className="flex items-center gap-3">
                                                            <label className="flex-1">
                                                                <div className="relative">
                                                                    <input
                                                                        type="file"
                                                                        accept="application/pdf"
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            subTopicForm.setData(
                                                                                "pdf",
                                                                                e
                                                                                    .target
                                                                                    .files[0]
                                                                            )
                                                                        }
                                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                                    />
                                                                    <div className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 flex items-center justify-between">
                                                                        <span>
                                                                            {subTopicForm
                                                                                .data
                                                                                .pdf
                                                                                ?.name ||
                                                                                "Choose file"}
                                                                        </span>
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="h-5 w-5 text-gray-400"
                                                                            viewBox="0 0 20 20"
                                                                            fill="currentColor"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                                                                clipRule="evenodd"
                                                                            />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                            {subTopicForm.data
                                                                .pdf && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        subTopicForm.setData(
                                                                            "pdf",
                                                                            null
                                                                        )
                                                                    }
                                                                    className="p-2 text-red-500 hover:text-red-700"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-5 w-5"
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Video File
                                                        </label>
                                                        <div className="flex items-center gap-3">
                                                            <label className="flex-1">
                                                                <div className="relative">
                                                                    <input
                                                                        type="file"
                                                                        accept="video/*"
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            subTopicForm.setData(
                                                                                "video",
                                                                                e
                                                                                    .target
                                                                                    .files[0]
                                                                            )
                                                                        }
                                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                                    />
                                                                    <div className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 flex items-center justify-between">
                                                                        <span>
                                                                            {subTopicForm
                                                                                .data
                                                                                .video
                                                                                ?.name ||
                                                                                "Choose file"}
                                                                        </span>
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="h-5 w-5 text-gray-400"
                                                                            viewBox="0 0 20 20"
                                                                            fill="currentColor"
                                                                        >
                                                                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                            {subTopicForm.data
                                                                .video && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        subTopicForm.setData(
                                                                            "video",
                                                                            null
                                                                        )
                                                                    }
                                                                    className="p-2 text-red-500 hover:text-red-700"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-5 w-5"
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-end gap-3 pt-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowSubTopicForm(
                                                                null
                                                            )
                                                        }
                                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-colors flex items-center gap-2"
                                                    >
                                                        Save Subtopic
                                                    </button>
                                                </div>
                                            </form>
                                        )}

                                        {editingSubTopic && (
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    const formData =
                                                        new FormData();
                                                    formData.append(
                                                        "title",
                                                        subTopicForm.data.title
                                                    );
                                                    formData.append(
                                                        "content",
                                                        subTopicForm.data
                                                            .content
                                                    );
                                                    if (subTopicForm.data.pdf)
                                                        formData.append(
                                                            "pdf",
                                                            subTopicForm.data
                                                                .pdf
                                                        );
                                                    if (subTopicForm.data.video)
                                                        formData.append(
                                                            "video",
                                                            subTopicForm.data
                                                                .video
                                                        );

                                                    formData.append(
                                                        "_method",
                                                        "put"
                                                    );

                                                    Inertia.post(
                                                        route(
                                                            "subtopics.update",
                                                            editingSubTopic.id
                                                        ),
                                                        formData,
                                                        {
                                                            forceFormData: true,
                                                            onSuccess: () => {
                                                                subTopicForm.reset();
                                                                setEditingSubTopic(
                                                                    null
                                                                );
                                                            },
                                                        }
                                                    );
                                                }}
                                                className="space-y-4 mb-6 bg-yellow-50 p-4 rounded-lg border"
                                            >
                                                <h3 className="text-lg font-medium text-gray-800">
                                                    Edit Subtopic
                                                </h3>

                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Subtopic Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={
                                                            subTopicForm.data
                                                                .title
                                                        }
                                                        onChange={(e) =>
                                                            subTopicForm.setData(
                                                                "title",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="Enter subtopic title"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Content
                                                    </label>
                                                    <div className="rounded-lg border border-gray-300 overflow-hidden">
                                                        <ReactQuill
                                                            value={
                                                                subTopicForm
                                                                    .data
                                                                    .content
                                                            }
                                                            onChange={(value) =>
                                                                subTopicForm.setData(
                                                                    "content",
                                                                    value
                                                                )
                                                            }
                                                            className="h-48"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            PDF File
                                                        </label>
                                                        <div className="flex items-center gap-3">
                                                            <label className="flex-1">
                                                                <div className="relative">
                                                                    <input
                                                                        type="file"
                                                                        accept="application/pdf"
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            subTopicForm.setData(
                                                                                "pdf",
                                                                                e
                                                                                    .target
                                                                                    .files[0]
                                                                            )
                                                                        }
                                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                                    />
                                                                    <div className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 flex items-center justify-between">
                                                                        <span>
                                                                            {subTopicForm
                                                                                .data
                                                                                .pdf
                                                                                ?.name ||
                                                                                "Choose file"}
                                                                        </span>
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="h-5 w-5 text-gray-400"
                                                                            viewBox="0 0 20 20"
                                                                            fill="currentColor"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                                                                clipRule="evenodd"
                                                                            />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                            {subTopicForm.data
                                                                .pdf && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        subTopicForm.setData(
                                                                            "pdf",
                                                                            null
                                                                        )
                                                                    }
                                                                    className="p-2 text-red-500 hover:text-red-700"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-5 w-5"
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Video File
                                                        </label>
                                                        <div className="flex items-center gap-3">
                                                            <label className="flex-1">
                                                                <div className="relative">
                                                                    <input
                                                                        type="file"
                                                                        accept="video/*"
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            subTopicForm.setData(
                                                                                "video",
                                                                                e
                                                                                    .target
                                                                                    .files[0]
                                                                            )
                                                                        }
                                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                                    />
                                                                    <div className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 flex items-center justify-between">
                                                                        <span>
                                                                            {subTopicForm
                                                                                .data
                                                                                .video
                                                                                ?.name ||
                                                                                "Choose file"}
                                                                        </span>
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="h-5 w-5 text-gray-400"
                                                                            viewBox="0 0 20 20"
                                                                            fill="currentColor"
                                                                        >
                                                                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                            {subTopicForm.data
                                                                .video && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        subTopicForm.setData(
                                                                            "video",
                                                                            null
                                                                        )
                                                                    }
                                                                    className="p-2 text-red-500 hover:text-red-700"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-5 w-5"
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-end gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setEditingSubTopic(
                                                                null
                                                            )
                                                        }
                                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                                    >
                                                        Batal
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                                                    >
                                                        Update Subtopic
                                                    </button>
                                                </div>
                                            </form>
                                        )}

                                        {course.sub_topics?.length > 0 && (
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-medium text-gray-800">
                                                    Subtopics
                                                </h3>
                                                <div className="space-y-3">
                                                    {course.sub_topics.map(
                                                        (sub, subIndex) => (
                                                            <div
                                                                key={sub.id}
                                                                className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs"
                                                            >
                                                                <div className="flex justify-between items-start">
                                                                    <h4 className="font-medium text-gray-800">
                                                                        <span className="text-indigo-600">
                                                                            {courseIndex +
                                                                                1}
                                                                            .
                                                                            {subIndex +
                                                                                1}
                                                                        </span>{" "}
                                                                        {
                                                                            sub.title
                                                                        }
                                                                    </h4>
                                                                    <div className="flex gap-2">
                                                                        <button
                                                                            onClick={() =>
                                                                                handleDeleteSubTopic(
                                                                                    sub.id
                                                                                )
                                                                            }
                                                                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded"
                                                                        >
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                className="h-5 w-5"
                                                                                viewBox="0 0 20 20"
                                                                                fill="currentColor"
                                                                            >
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                                    clipRule="evenodd"
                                                                                />
                                                                            </svg>
                                                                        </button>

                                                                        <button
                                                                            onClick={() => {
                                                                                setEditingSubTopic(
                                                                                    sub
                                                                                );
                                                                                subTopicForm.setData(
                                                                                    {
                                                                                        course_id:
                                                                                            course.id,
                                                                                        title: sub.title,
                                                                                        content:
                                                                                            sub.content,
                                                                                        pdf: null,
                                                                                        video: null,
                                                                                    }
                                                                                );
                                                                            }}
                                                                            className="p-1 text-yellow-500 hover:text-yellow-700 hover:bg-yellow-100 rounded"
                                                                        >
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                className="h-5 w-5"
                                                                                viewBox="0 0 20 20"
                                                                                fill="currentColor"
                                                                            >
                                                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-9.793 9.793H4v-2.621l9.586-9.586z" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    className="prose prose-sm max-w-none text-gray-600 mt-2"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: sub.content,
                                                                    }}
                                                                />

                                                                {(sub.pdf_path ||
                                                                    sub.video_path) && (
                                                                    <div className="mt-4 grid md:grid-cols-2 gap-4">
                                                                        {sub.pdf_path && (
                                                                            <div className="border rounded-lg overflow-hidden">
                                                                                <div className="bg-gray-50 px-3 py-2 border-b flex items-center gap-2">
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        className="h-5 w-5 text-red-500"
                                                                                        fill="none"
                                                                                        viewBox="0 0 24 24"
                                                                                        stroke="currentColor"
                                                                                    >
                                                                                        <path
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                            strokeWidth={
                                                                                                2
                                                                                            }
                                                                                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                                                                        />
                                                                                    </svg>
                                                                                    <span className="text-sm font-medium">
                                                                                        PDF
                                                                                        Document
                                                                                    </span>
                                                                                </div>
                                                                                <iframe
                                                                                    src={`/storage/${sub.pdf_path}`}
                                                                                    className="w-full h-48"
                                                                                    title={`PDF ${sub.title}`}
                                                                                />
                                                                            </div>
                                                                        )}

                                                                        {sub.video_path && (
                                                                            <div className="border rounded-lg overflow-hidden">
                                                                                <div className="bg-gray-50 px-3 py-2 border-b flex items-center gap-2">
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        className="h-5 w-5 text-blue-500"
                                                                                        fill="none"
                                                                                        viewBox="0 0 24 24"
                                                                                        stroke="currentColor"
                                                                                    >
                                                                                        <path
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                            strokeWidth={
                                                                                                2
                                                                                            }
                                                                                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                                                        />
                                                                                    </svg>
                                                                                    <span className="text-sm font-medium">
                                                                                        Video
                                                                                    </span>
                                                                                </div>
                                                                                <video
                                                                                    controls
                                                                                    className="w-full h-48 bg-black"
                                                                                    src={`/storage/${sub.video_path}`}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
