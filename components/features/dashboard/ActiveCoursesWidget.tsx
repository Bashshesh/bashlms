'use client';
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/Button";
import { Star, FileCheck, Frown } from 'lucide-react'; // Иконки (поправил имя FileCheckCorner -> FileCheck)
import { fetchMyCourses } from '@/lib/api';
import { Course } from '@/lib/types';
import { useRouter } from 'next/navigation';

export const ActiveCoursesWidget = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchMyCourses().then(setCourses).catch(console.error);
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Мои Курсы</h2>
                <div className="flex gap-2">
                    <Button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-[1.01]">Активные</Button>
                    <Button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transform hover:scale-[1.01]">Оконченные</Button>
                </div>
            </div>

            {/* Список курсов */}
            <div className="space-y-4">
                {courses.length === 0 ? (
                    <div className="text-center text-gray-400 py-4">Нет активных курсов</div>
                ) : (
                    courses.map((course) => (
                        <div
                            key={course.id}
                            onClick={() => router.push(`/courses/${course.id}`)}
                            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition"
                        >
                            <div className="w-1/3 font-medium truncate pr-2">{course.title}</div>

                            <div className="w-1/3 px-4">
                                {/* Фейковый прогресс бар (пока нет данных с бэка) */}
                                <div className="h-2 w-full bg-blue-100 rounded-full">
                                    <div
                                        className="h-2 bg-blue-600 rounded-full"
                                        style={{ width: `${Math.random() * 100}%` }} // Пока рандом для красоты
                                    ></div>
                                </div>
                            </div>

                            <div className="w-1/3 flex gap-3 text-sm text-gray-500 justify-end items-center">
                                <div className="flex items-center gap-1"><Star size={14} /> 0</div>
                                <div className="flex items-center gap-1"><FileCheck size={14} /> 0</div>
                                <div className="flex items-center gap-1"><Frown size={14} /> 0</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
