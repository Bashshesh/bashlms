import { Lesson } from '@/lib/mockData';
import { LessonNode } from './LessonNode';
import { cn } from '@/lib/utils';

interface CourseMapUIProps {
    courseTitle: string;
    courseId: number;
    lessons: Lesson[];
}

export const CourseMapUI = ({ courseTitle, courseId, lessons }: CourseMapUIProps) => {
    // НАСТРОЙКИ ГЕОМЕТРИИ
    const ROW_HEIGHT = 300;   // Высота одной секции
    const AMPLITUDE = 200;     // Отклонение влево/вправо (px). Ты просил 50, но для кнопок 96px лучше 80, иначе линия будет почти прямой.

    const SVG_WIDTH = 400;    // Ширина холста SVG
    const CENTER = SVG_WIDTH / 2;

    // Функция: Четный -> Вправо, Нечетный -> Влево
    const getXOffset = (index: number) => {
        // Если индекс делится на 2 без остатка - идем вправо (+), иначе влево (-)
        return (index % 2 === 0 ? 1 : -1) * AMPLITUDE;
    };

    const generatePath = () => {
        if (lessons.length === 0) return '';
        let path = '';
        lessons.forEach((_, index) => {
            if (index === lessons.length - 1) return;

            const currentX = CENTER + getXOffset(index);
            const currentY = index * ROW_HEIGHT + ROW_HEIGHT / 2;

            const nextX = CENTER + getXOffset(index + 1);
            const nextY = (index + 1) * ROW_HEIGHT + ROW_HEIGHT / 2;

            // Контрольные точки строго вертикальные для красивой S-кривой
            const cp1 = { x: currentX, y: currentY + ROW_HEIGHT * 0.5 };
            const cp2 = { x: nextX, y: nextY - ROW_HEIGHT * 0.5 };

            if (index === 0) path += `M ${currentX} ${currentY} `;
            path += `C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${nextX} ${nextY} `;
        });
        return path;
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-12">
            <h2 className="text-3xl font-extrabold mb-16 text-gray-800 text-center">
                🗺️ {courseTitle}
            </h2>

            <div
                className="relative w-full max-w-xl mx-auto flex flex-col items-center"
                style={{ height: lessons.length * ROW_HEIGHT + 100 }}
            >
                {/* 1. ЛИНИЯ ПУТИ (SVG) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0" style={{ width: SVG_WIDTH, height: '100%' }}>
                    <svg className="w-full h-full overflow-visible">
                        {/* Тень линии */}
                        <path d={generatePath()} fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="24" strokeLinecap="round" />
                        {/* Сама линия */}
                        <path d={generatePath()} fill="none" stroke="#cbd5e1" strokeWidth="8" strokeDasharray="20 12" strokeLinecap="round" />
                    </svg>
                </div>

                {/* 2. УЗЛЫ */}
                {lessons.map((lesson, index) => {
                    const xOffset = getXOffset(index);
                    const isRightSide = index % 2 === 0; // Четный = Справа

                    return (
                        <div
                            key={lesson.id}
                            className="absolute left-1/2 flex items-center justify-center"
                            style={{
                                top: index * ROW_HEIGHT + ROW_HEIGHT / 2,
                                transform: `translate(-50%, -50%) translate(${xOffset}px, 0)` // Центрируем + сдвигаем
                            }}
                        >
                            {/* УЗЕЛ (Кнопка) */}
                            <div className="relative z-10">
                                <LessonNode lesson={lesson} courseId={courseId} />

                                {/* Эффект активного урока (свечение сзади) */}
                                {lesson.status === 'active' && (
                                    <div className="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-40 -z-10 animate-pulse"></div>
                                )}
                            </div>

                            {/* ТЕКСТ / ИНФОРМАЦИЯ */}
                            {/* Позиционируем АБСОЛЮТНО относительно кнопки */}
                            <div
                                className={cn(
                                    "absolute top-1/2 -translate-y-1/2 w-48 flex flex-col justify-center z-0",
                                    // ЛОГИКА:
                                    // Если кнопка Справа (isRightSide) -> Текст ставим еще правее (left-full)
                                    // Если кнопка Слева (!isRightSide) -> Текст ставим еще левее (right-full)
                                    isRightSide ? "left-full ml-6 text-left" : "right-full mr-6 text-right"
                                )}
                            >
                                <h3 className={cn(
                                    "font-bold text-lg leading-tight transition-colors duration-300",
                                    lesson.status === 'locked' ? "text-gray-400" : "text-gray-800"
                                )}>
                                    {lesson.title}
                                </h3>

                                <p className={cn(
                                    "text-sm font-medium mt-1",
                                    lesson.status === 'completed' ? "text-green-600" :
                                        lesson.status === 'active' ? "text-blue-600" :
                                            "text-gray-400"
                                )}>
                                    {lesson.status === 'active' && '🚀 Текущий урок'}
                                    {lesson.status === 'completed' && '✅ Пройдено'}
                                    {lesson.status === 'locked' && '🔒 Закрыто'}
                                </p>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};
