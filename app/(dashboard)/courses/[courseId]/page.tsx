'use client'; // Указываем, что это клиентский компонент

import { useEffect, useState } from 'react'; // Хуки нужны!
import { fetchCourseById } from '@/lib/api';
import { CourseMapUI } from '@/components/features/course/CourseMapUI';
import { Alert } from '@/components/ui/Alert';
import { useRouter, useParams } from 'next/navigation'; // Хуки навигации
import { Course } from '@/lib/types'; // Импортируй свой тип Course

export default function CoursePage() {
    const params = useParams(); // Получаем ID через хук
    const router = useRouter();

    // Состояние для данных и загрузки
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Достаем ID (безопасно)
    const courseId = Number(params.courseId);

    // Загружаем данные при монтировании компонента
    useEffect(() => {
        if (!courseId || isNaN(courseId)) {
            setError(true);
            setLoading(false);
            return;
        }

        const loadCourse = async () => {
            try {
                // Запрос идет С КЛИЕНТА -> Токен передается -> isEnrolled будет true/false
                const data = await fetchCourseById(courseId);

                if (!data) {
                    setError(true);
                } else {
                    setCourse(data);
                    // Для отладки
                    console.log("ЗАГРУЖЕН КУРС:", data);
                }
            } catch (e) {
                console.error("Ошибка загрузки курса:", e);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadCourse();
    }, [courseId]); // Зависимость: перезагружать, если ID изменился

    // Рендер состояний
    if (loading) {
        return <div className="p-8 text-center text-gray-500">Загрузка карты курса...</div>;
    }

    if (error || !course) {
        return (
            <div className="p-8">
                <h2 className="text-2xl font-bold text-red-500">Ошибка 404</h2>
                <p>Курс не найден.</p>
                <button onClick={() => router.push('/courses')} className="mt-4 text-blue-600 underline">
                    Вернуться в каталог
                </button>
            </div>
        );
    }

    // Проверка записи
    if (!course.isEnrolled) {
        return (
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6">🛑 Доступ закрыт</h2>
                <Alert type="warning" message={`Вы не записаны на курс "${course.title}". Пожалуйста, приобретите доступ.`} />
                <button onClick={() => router.push('/courses')} className="mt-4 text-blue-600 underline">
                    Вернуться к списку курсов
                </button>
            </div>
        );
    }

    // Проверка уроков
    if (!course.lessons || course.lessons.length === 0) {
        return (
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6">🚧 Курс в разработке</h2>
                <Alert type="warning" message={`В курсе "${course.title}" пока нет уроков.`} />
            </div>
        );
    }

    // Успешный рендер
    return (
        <CourseMapUI
            courseTitle={course.title}
            courseId={course.id}
            lessons={course.lessons}
        />
    );
}
