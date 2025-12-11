import { fetchCourseById } from '@/lib/api';
import { CourseMapUI } from '@/components/features/course/CourseMapUI';
import { Alert } from '@/components/ui/Alert';
import { notFound } from 'next/navigation';

interface CoursePageProps {
    params: {
        courseId: string; // ID курса будет строкой из URL
    };
}

export default async function CoursePage({ params }: CoursePageProps) {
    const resolvedParams = await Promise.resolve(params);
    const { courseId: courseIdString } = resolvedParams;
    const courseId = Number(courseIdString);
    if (isNaN(courseId)) {
        // Если ID не число, показываем 404
        notFound();
    }

    const course = await fetchCourseById(courseId);


    if (!course) {
        notFound();
    }

    // 4. Проверка на то, что ученик записан (реальная логика авторизации будет тут)
    if (!course.isEnrolled) {
        // Если не записан, можно показать заглушку или купить курс
        return (
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6">🛑 Доступ закрыт</h2>
                <Alert type="warning" message={`Вы не записаны на курс "${course.title}". Пожалуйста, приобретите доступ.`} />
            </div>
        );
    }
    // проверка есть ли вообще уроки в этом курсе?
    if (!course?.lessons || course.lessons.length === 0) {
        return (
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6">🛑 Уроков еще нет</h2>
                <Alert type="warning" message={`В курсе "${course.title}" не имеются уроки. Пожалуйста, обратитесь в поддержку.`} />
            </div>
        )
    }



    // 5. Рендерим UI, передавая необходимые данные
    return (
        <CourseMapUI
            courseTitle={course.title}
            courseId={course.id}
            lessons={course.lessons}
        />
    );
}