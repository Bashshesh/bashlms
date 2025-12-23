'use client';

import Link from 'next/link';
import { Course } from '@/lib/types'; // Импортируем тип!
import { Button } from '@/components/ui/Button';

interface CourseCardProps {
    course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {

    let buttonText = 'Подробнее';
    let buttonVariant: 'default' | 'outline' = 'default';

    if (course.isEnrolled) {
        buttonText = 'Продолжить';
        buttonVariant = 'default'; // Синяя
    } else if (course.price > 0) {
        buttonText = 'Купить курс';
        buttonVariant = 'default'; // Синяя
    } else {
        buttonText = 'Начать бесплатно';
        buttonVariant = 'outline'; // или 'default', на твой выбор
    }

    return (
        // Карточка ведет на детальную страницу курса: /courses/[id]
        <Link href={`/courses/${course.id}`} className="block">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition hover:shadow-lg hover:border-blue-300 transform hover:scale-[1.01]">
                {/* ... (остальная вёрстка карточки) ... */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{course.description}</p>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-dashed border-gray-200">
                    <div className="text-sm">
                        <span className="font-medium text-gray-600">Начало:</span> {course.startDate}
                    </div>
                    {course.price > 0 ? (
                        <span className="text-lg font-extrabold text-green-600">
                            {course.price} тг.
                        </span>
                    ) : (
                        <span className="text-lg font-extrabold text-blue-600">Бесплатно</span>
                    )}
                </div>

                <Button
                    className="mt-4 w-full pointer-events-none" // ⬅️ w-full и mt-4
                    variant={buttonVariant}
                    size="default"
                    tabIndex={-1}
                >
                    {buttonText}
                </Button>
            </div>
        </Link>
    );
};