import { fetchLessonData } from '@/lib/api';
import LessonPlayerUI from '@/components/features/course/LessonPlayerUI';
import { notFound } from 'next/navigation';
import { Alert } from '@/components/ui/Alert';

interface LessonPageProps {
    params: Promise<{
        courseId: string;
        lessonId: string;
    }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
    // 1. Асинхронно получаем параметры (для Next.js 15)
    const { courseId, lessonId } = await params;

    // 2. Преобразуем ID
    const cId = Number(courseId);
    const lId = Number(lessonId);

    if (isNaN(cId) || isNaN(lId)) {
        notFound();
    }

    // 3. Получаем все данные одной функцией из API
    const data = await fetchLessonData(cId, lId);

    // 4. Если урок не найден — 404
    if (!data) {
        notFound();
    }

    // 5. Проверка доступа (если курс не куплен)
    if (!data.course.isEnrolled) {
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">🛑 Доступ ограничен</h2>
                <Alert type="warning" message={`Чтобы просмотреть урок "${data.lesson.title}", необходимо приобрести курс.`} />
            </div>
        );
    }

    // 6. Рендерим плеер
    return (
        <LessonPlayerUI
            course={data.course}
            lesson={data.lesson}
            prevLesson={data.prevLesson}
            nextLesson={data.nextLesson}
        />
    );
}
