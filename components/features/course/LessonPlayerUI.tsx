"use client";

import Link from 'next/link';
import { Lesson, Course } from '@/lib/mockData';
import {Button} from '@/components/ui/Button'; // Твой компонент
import { ArrowLeft, ArrowRight, CheckCircle, Lock } from 'lucide-react'; // Убедись, что lucide-react установлен

interface LessonPlayerUIProps {
    course: Course;
    lesson: Lesson;
    prevLesson: Lesson | null;
    nextLesson: Lesson | null;
}

export default function LessonPlayerUI({ course, lesson, prevLesson, nextLesson }: LessonPlayerUIProps) {
    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto p-4">
            {/* Хлебные крошки / Навигация назад */}
            <Link
                href={`/courses/${course.id}`}
                className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Назад к курсу "{course.title}"
            </Link>

            {/* Видео-плеер (Заглушка или реальный тег) */}
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg relative group">
                {lesson.status === 'locked' ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gray-900/80">
                        <Lock className="w-12 h-12 mb-2 text-gray-400" />
                        <p className="font-semibold">Этот урок пока недоступен</p>
                        {lesson.deadline && <p className="text-sm text-gray-400">Откроется: {lesson.deadline}</p>}
                    </div>
                ) : (
                    <video
                        controls
                        className="w-full h-full object-cover"
                        poster="/globe.svg" // Можешь поставить свою картинку-заглушку
                    >
                        <source src={lesson.videoUrl} type="video/mp4" />
                        Ваш браузер не поддерживает видео.
                    </video>
                )}
            </div>

            {/* Заголовок и статус */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
                    <p className="text-gray-500 mt-1">Урок #{lesson.id}</p>
                </div>

                {lesson.status === 'completed' && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Просмотрено {lesson.grade ? `(Оценка: ${lesson.grade})` : ''}
                    </div>
                )}
            </div>

            {/* Кнопки навигации */}
            <div className="flex justify-between items-center mt-2">
                {prevLesson ? (
                    <Link href={`/courses/${course.id}/lesson/${prevLesson.id}`}>
                        <Button variant="outline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {prevLesson.title}
                    </Button>
                    </Link>
                    ) : (
                    <div /> /* Пустой блок, чтобы кнопка "Далее" осталась справа */
                    )}

                {nextLesson ? (
                    <Link href={`/courses/${course.id}/lesson/${nextLesson.id}`}>
                        <Button>
                            Следующий урок
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                ) : (
                    <Button disabled>Это последний урок</Button>
                )}
            </div>
        </div>
    );
}
