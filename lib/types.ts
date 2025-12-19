export type LessonStatus = 'locked' | 'active' | 'completed';

export type LessonBase = {
    id: number;
    title: string;
    status: LessonStatus;
    grade?: number;
    deadline?: string;
    duration?: string;
};

export type VideoLesson = LessonBase & {
    kind: 'video';
    videoUrl: string;
};

export type QuizPdfLesson = LessonBase & {
    kind: 'quiz_pdf';
    pdfUrl: string;
    questionCount: number; // 40
    timerSec: number;
    explanationVideos: Array<{ from: number; to: number; videoUrl: string }>;
    answerKey?: Record<number, 'A' | 'B' | 'C' | 'D'>; // временно для фронта
};

export type VideoHomeworkLesson = LessonBase & {
    kind: 'video_homework';
    videoUrl: string;
    extraText?: string;
    homework: { accept: 'image'; maxFiles: number };
};

export type Lesson = VideoLesson | QuizPdfLesson | VideoHomeworkLesson;

export type Course = {
    id: number;
    title: string;
    description: string;
    price: number;
    startDate: string;
    isEnrolled: boolean;
    image?: string;
    lessons: Lesson[];
    category: 'Programming' | 'Design' | 'Marketing' | 'Science';
};
