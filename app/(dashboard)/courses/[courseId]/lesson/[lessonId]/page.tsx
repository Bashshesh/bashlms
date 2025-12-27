'use client';
import { useEffect, useState } from 'react';
import { fetchLessonData, completeLesson } from '@/lib/api'; // completeLesson добавим ниже
import { useParams, useRouter } from 'next/navigation';
import { Lesson, Course } from '@/lib/types'; // Твои типы

export default function LessonPage() {
    const params = useParams();
    const router = useRouter();

    // Состояние
    const [lessonData, setLessonData] = useState<{
        lesson: Lesson;
        course: Course;
        prevLesson: Lesson | null;
        nextLesson: Lesson | null;
    } | null>(null);
    const [loading, setLoading] = useState(true);

    // ID из URL
    const courseId = Number(params.courseId); // Используем имя папки
    const lessonId = Number(params.lessonId);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchLessonData(courseId, lessonId);
                if (!data) {
                    // Если урока нет или доступа нет -> на главную курса
                    router.push(`/courses/${courseId}`);
                    return;
                }
                setLessonData(data);
            } catch (error) {
                console.error("Ошибка загрузки урока", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [courseId, lessonId, router]);

    const handleComplete = async () => {
        if (!lessonData) return;
        try {
            await completeLesson(courseId, lessonId);
            // Если есть следующий урок - переходим
            if (lessonData.nextLesson) {
                router.push(`/courses/${courseId}/lesson/${lessonData.nextLesson.id}`);
            } else {
                alert("Курс завершен! Молодец!");
                router.push(`/courses/${courseId}`);
            }
        } catch (e) {
            console.error(e);
            alert("Ошибка при завершении урока");
        }
    };

    if (loading) return <div>Загрузка урока...</div>;
    if (!lessonData) return <div>Урок не найден</div>;

    const { lesson, course, prevLesson, nextLesson } = lessonData;

    console.log("ДАННЫЕ УРОКА:", lesson);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
            <p className="text-gray-500 mb-6">Курс: {course.title}</p>

            {/* ВИДЕО */}
            {lesson.videoUrl && (
                <div className="mb-6 aspect-video bg-black rounded-lg overflow-hidden">
                    <iframe
                        src={lesson.videoUrl}
                        className="w-full h-full"
                        allowFullScreen
                        title="Lesson Video"
                    />
                </div>
            )}

            {/* КОНТЕНТ (из JSON settings или просто текст) */}
            <div className="prose max-w-none mb-8">
                {/* Если у тебя есть extraText или content */}
                <p>{lesson.extraText || "Описание урока..."}</p>
            </div>

            {/* НАВИГАЦИЯ */}
            <div className="flex justify-between mt-8 border-t pt-4">
                <button
                    disabled={!prevLesson}
                    onClick={() => router.push(`/courses/${courseId}/lesson/${prevLesson?.id}`)}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    ← Назад
                </button>

                {lesson.status === 'completed' ? (
                    <button
                        onClick={() => nextLesson && router.push(`/courses/${courseId}/lesson/${nextLesson.id}`)}
                        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Следующий урок →
                    </button>
                ) : (
                    <button
                        onClick={handleComplete}
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Завершить урок
                    </button>
                )}
            </div>
        </div>
    );
}
