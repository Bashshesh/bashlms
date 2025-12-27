'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Course } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { enrollInCourse } from "@/lib/api";

interface CourseCardProps {
    course: Course;
}

export const CourseCard = ({ course: initialCourse }: CourseCardProps) => {
    const router = useRouter();

    // Локальное состояние: записан или нет.
    // Сначала берем из пропсов, но при нажатии кнопки будем менять сами.
    const [isEnrolled, setIsEnrolled] = useState(initialCourse.isEnrolled);
    const [loading, setLoading] = useState(false);

    // Вычисляем текст и стиль кнопки
    let buttonText = 'Подробнее';
    let buttonVariant: 'default' | 'outline' = 'default';

    if (isEnrolled) {
        buttonText = 'Продолжить обучение →'; // Красивая стрелочка
        buttonVariant = 'default';
    } else if (initialCourse.price > 0) {
        buttonText = `Купить за ${initialCourse.price} ₸`;
        buttonVariant = 'default';
    } else {
        buttonText = 'Начать бесплатно';
        buttonVariant = 'outline';
    }

    const handleAction = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Чтобы клик по кнопке не триггерил клик по карточке

        // 1. Если уже записан -> просто идем на курс
        if (isEnrolled) {
            router.push(`/courses/${initialCourse.id}`);
            return;
        }

        // 2. Если не записан -> пытаемся записаться
        setLoading(true);
        try {
            await enrollInCourse(initialCourse.id);

            // УСПЕХ!
            // Не делаем alert, а просто меняем кнопку на "Продолжить"
            setIsEnrolled(true);

            // Опционально: можно сразу перекинуть внутрь
            // router.push(`/courses/${initialCourse.id}`);

        } catch (e: any) {
            console.error(e);
            // Если ошибка 401 (не авторизован) -> кидаем на логин
            if (e.response?.status === 401) {
                router.push('/login');
            } else {
                // Если другая ошибка (например, уже записан, но фронт тупит)
                // Просто считаем что записался
                setIsEnrolled(true);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCardClick = () => {
        router.push(`/courses/${initialCourse.id}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col h-full"
        >
            {/* Картинка курса (если есть) */}
            {initialCourse.image && (
                <div className="mb-4 rounded-lg overflow-hidden h-40 bg-gray-100">
                    <img src={initialCourse.image} alt={initialCourse.title} className="w-full h-full object-cover" />
                </div>
            )}

            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {initialCourse.title}
            </h3>

            <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">
                {initialCourse.description}
            </p>

            <div className="mt-auto">
                <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-200 mb-4">
                    <div className="text-xs text-gray-500">
                        Старт: {new Date(initialCourse.startDate).toLocaleDateString()}
                    </div>
                    {initialCourse.price > 0 ? (
                        <span className="font-bold text-green-600">{initialCourse.price} ₸</span>
                    ) : (
                        <span className="font-bold text-blue-600">Бесплатно</span>
                    )}
                </div>

                <Button
                    className={`w-full transition-all ${isEnrolled ? 'bg-green-600 hover:bg-green-700 text-white' : ''}`}
                    variant={isEnrolled ? 'default' : buttonVariant}
                    size="default"
                    onClick={handleAction}
                    disabled={loading}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Запись...
                        </span>
                    ) : buttonText}
                </Button>
            </div>
        </div>
    );
};
