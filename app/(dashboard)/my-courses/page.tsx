'use client';
import { useEffect, useState } from 'react';
import { fetchMyCourses } from '@/lib/api';
import { CourseCard } from '@/components/features/course/CourseCard';
import { Course } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { BookOpen } from 'lucide-react';

export default function MyCoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchMyCourses().then(setCourses).catch(console.error).finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1,2,3].map(i => <div key={i} className="h-64 bg-gray-200 rounded-xl" />)}
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                    <BookOpen size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">У вас пока нет активных курсов</h2>
                <p className="text-gray-500 max-w-md mb-8">
                    Начните обучение прямо сейчас. Выберите курс из каталога и прокачайте свои навыки.
                </p>
                <Button onClick={() => router.push('/courses')}>
                    Перейти в каталог
                </Button>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <header className="mb-8 border-b pb-4">
                <h1 className="text-2xl font-bold text-gray-900">Мои Курсы</h1>
                <p className="text-gray-500">Продолжайте обучение там, где остановились</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
}
