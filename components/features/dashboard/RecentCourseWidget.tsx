'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/Button";
import { Star, FileCheck, Frown } from 'lucide-react'; // Поправил импорт иконки
import { fetchMyCourses } from '@/lib/api';
import { Course } from '@/lib/types';
import { useRouter } from 'next/navigation';

export const RecentCourseWidget = () => {
    const [lastCourse, setLastCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const load = async () => {
            try {
                const courses = await fetchMyCourses();
                if (courses.length > 0) {
                    // Берем первый курс из списка (можно усложнить логику сортировки)
                    setLastCourse(courses[0]);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return <div className="h-24 bg-gray-100 rounded-xl animate-pulse" />;

    if (!lastCourse) {
        // Если курсов нет, предлагаем начать
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="font-semibold text-lg text-gray-500">Нет активных курсов</div>
                <Button onClick={() => router.push('/courses')}>Найти курс</Button>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 transition hover:shadow-md">
            <div className="flex flex-col">
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">
                    Продолжить обучение
                </div>
                <div className="font-bold text-lg text-gray-800 truncate max-w-[200px]" title={lastCourse.title}>
                    {lastCourse.title}
                </div>
            </div>

            {/* Прогресс (Фейковый пока нет данных с бэка, или рандом для красоты) */}
            <div className="w-full md:w-48 flex flex-col gap-1">
                <div className="h-2 bg-blue-100 rounded-full w-full">
                    <div className="h-2 bg-blue-600 rounded-full transition-all duration-1000" style={{width: '35%'}}></div>
                </div>
                <div className="text-xs text-right text-gray-500">35%</div>
            </div>

            {/* Статистика (Заглушки) */}
            <div className="flex gap-4 text-sm font-medium text-gray-600">
                <div className="flex items-center gap-1" title="Достижения"><Star size={16} className="text-yellow-500"/> 1</div>
                <div className="flex items-center gap-1" title="Задания"><FileCheck size={16} className="text-green-500"/> 2</div>
                <div className="flex items-center gap-1" title="Ошибки"><Frown size={16} className="text-red-400"/> 0</div>
            </div>

            <Button
                onClick={() => router.push(`/courses/${lastCourse.id}`)}
                className="hover:bg-blue-700 bg-blue-600 text-white transform hover:scale-[1.02] transition-all shadow-blue-200 shadow-lg"
            >
                Продолжить →
            </Button>
        </div>
    )
}
