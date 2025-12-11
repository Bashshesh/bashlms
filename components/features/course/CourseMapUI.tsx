"use client";

import { Lesson } from '@/lib/mockData';
import { LessonNode } from './LessonNode';

interface CourseMapUIProps {
    courseTitle: string;
    courseId: number;
    lessons: Lesson[];
}

export const CourseMapUI = ({ courseTitle, courseId, lessons }: CourseMapUIProps) => {
    return (
        <div className="p-8">
            <h2 className="text-3xl font-extrabold mb-8 text-gray-800">
                🗺️ Дорожная Карта: {courseTitle}
            </h2>

            {/* Контейнер для карты, который будет имитировать дорогу (Timeline) */}
            <div className="relative w-full max-w-4xl mx-auto py-12">

                {/* Линия дороги (имитация) */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-2 bg-gray-200 rounded-full"></div>

                {/* Размещение узлов */}
                <div className="space-y-16">
                    {lessons.map((lesson, index) => (
                        <div
                            key={lesson.id}
                            // Это родительский контейнер для ряда. Устанавливаем ему высоту, чтобы "растянуть" дорогу.
                            className="relative flex items-center h-24" // <-- ДОБАВЛЕНО h-24
                        >

                            {/* 1. ПОЗИЦИОНИРОВАНИЕ УЗЛА: Мы его "приклеиваем" к центру ряда */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 z-10"> {/* <-- ДОБАВЛЕНО z-10 */}
                                <LessonNode lesson={lesson} courseId={courseId} />
                            </div>

                            {/* 2. ИНФОРМАЦИОННЫЙ БЛОК: Его позиция зависит от четности индекса */}
                            <div
                                className={`w-1/2 p-4 rounded-lg bg-white shadow-md border transition duration-300
                    ${index % 2 === 0 ? 'ml-0 mr-auto' : 'mr-0 ml-auto'} 
                    ${lesson.status === 'active' ? 'border-blue-300' : 'border-gray-200'}`
                                }
                            >
                                <p className="font-semibold">{lesson.title}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {lesson.status === 'locked' && lesson.deadline ? `Дедлайн: ${lesson.deadline}` : `Статус: ${lesson.status}`}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};