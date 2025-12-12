// lib/mockData.ts

// --- 1. Типы Данных ---

export interface Lesson {
    id: number;
    title: string;
    videoUrl: string;
    status: 'locked' | 'active' | 'completed';
    grade?: number; // Оценка (если урок сдан)
    deadline?: string; // Дедлайн для ДЗ
}

export interface Course {
    id: number;
    title: string;
    description: string;
    price: number;
    startDate: string;
    isEnrolled: boolean;
    lessons: Lesson[];
}

// --- 2. Фейковые Данные ---

const courseLessons: Lesson[] = [
    { id: 101, title: 'Введение в Python', videoUrl: 'video_101.mp4', status: 'completed', grade: 5 },
    { id: 102, title: 'Переменные и типы', videoUrl: 'video_102.mp4', status: 'active' }, // Активный урок (надо пройти)
    { id: 103, title: 'Условные операторы', videoUrl: 'video_103.mp4', status: 'locked', deadline: '2025-12-20' }, // Закрыт
    { id: 104, title: 'Циклы', videoUrl: 'video_104.mp4', status: 'locked' },
    { id: 105, title: 'Функции', videoUrl: 'video_105.mp4', status: 'locked' },
    { id: 106, title: 'OOP', videoUrl: 'video_105.mp4', status: 'locked' },

];

const courseLessons2: Lesson[] = [
    { id: 201, title: 'OOP', videoUrl: 'video_105.mp4', status: 'completed' },
    { id: 202, title: 'Переменные и типы', videoUrl: 'video_102.mp4', status: 'completed' }, // Активный урок (надо пройти)
    { id: 203, title: 'Условные операторы', videoUrl: 'video_103.mp4', status: 'active', deadline: '2025-12-20' }, // Закрыт
    { id: 204, title: 'Циклы', videoUrl: 'video_104.mp4', status: 'active' },
    { id: 205, title: 'Функции', videoUrl: 'video_105.mp4', status: 'active' },

];



export const mockCourses: Course[] = [
    {
        id: 1,
        title: 'Основы программирования на Python',
        description: 'Изучаем базовые конструкции, чтобы начать кодить.',
        price: 9900,
        startDate: '2025-12-15',
        isEnrolled: true, // Ученик уже записан
        lessons: courseLessons,
    },
    {
        id: 2,
        title: 'Веб-дизайн для начинающих',
        description: 'HTML, CSS, Figma и основы адаптивной верстки.',
        price: 14900,
        startDate: '2026-01-10',
        isEnrolled: true,
        lessons: courseLessons2,
    },
    {
        id: 3,
        title: 'Математика: 7 класс (Углубленно)',
        description: 'Алгебра и геометрия в интересном формате.',
        price: 0, // Бесплатно
        startDate: '2025-12-01',
        isEnrolled: false,
        lessons: [],
    },
];

// --- 3. Фейковые Новости ---

export const mockNews = [
    { id: 1, title: "Новый курс по Python запущен!", content: "Приглашаем всех на курс, старт 15 декабря.", date: "2025-12-05" },
    { id: 2, title: "Конкурс по HTML/CSS", content: "Победителю — бесплатный доступ к курсу по дизайну.", date: "2025-12-01" },
];