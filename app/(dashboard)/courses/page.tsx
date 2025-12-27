'use client';

import { useEffect, useState } from 'react';
import { fetchAllCourses } from '@/lib/api';
import { CourseCard } from '@/components/features/course/CourseCard';
import { Course } from '@/lib/types';
import { Search } from 'lucide-react'; // Иконка поиска

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllCourses().then(setCourses).catch(console.error).finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1,2,3,4].map(i => <div key={i} className="h-80 bg-gray-100 rounded-xl" />)}
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Каталог Курсов</h1>
                    <p className="text-gray-500 mt-1">Выберите направление и начните учиться</p>
                </div>

                {/* Заготовка под поиск (пока не работает, но для визуала) */}
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        placeholder="Найти курс..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
}
