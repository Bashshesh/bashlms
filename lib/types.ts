export type LessonStatus = 'locked' | 'active' | 'completed';
export type HomeworkAccept = 'image' | 'file';

export type Lesson = {
    id: number;
    title: string;
    status: LessonStatus;

    // Основной контент (опционально любой из них)
    videoUrl?: string;
    pdfUrl?: string;
    questionCount?: number;
    timerSec?: number;

    // Дополнительные элементы
    extraText?: string;
    explanationVideos?: Array<{ from: number; to: number; videoUrl: string }>;
    answerKey?: Record<number, 'A' | 'B' | 'C' | 'D'>;

    // Домашка
    homework?: {
        accept: HomeworkAccept;
        maxFiles: number;
    };

    // Общие поля
    grade?: number;
    deadline?: string;
    duration?: string;
};

export type Course = {
    id: number;
    title: string;
    description: string;
    price: number;
    startDate: string;
    isEnrolled: boolean;
    image?: string;
    lessons: Lesson[];
};
