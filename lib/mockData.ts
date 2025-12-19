import type { Course, Lesson } from '@/lib/types';

// --- 1) Уроки: Python (все обычные видео) ---
const pythonLessons: Lesson[] = [
    { id: 101, kind: 'video', title: 'Введение в Python и установка IDE', videoUrl: 'video_101.mp4', status: 'completed', grade: 5, duration: '15:00' },
    { id: 102, kind: 'video', title: 'Переменные, типы данных и вывод', videoUrl: 'video_102.mp4', status: 'completed', grade: 4, duration: '22:30' },
    { id: 103, kind: 'video', title: 'Условные операторы (if/else)', videoUrl: 'video_103.mp4', status: 'active', duration: '18:45' },
    { id: 104, kind: 'video', title: 'Циклы for и while', videoUrl: 'video_104.mp4', status: 'locked', duration: '30:10' },
    { id: 105, kind: 'video', title: 'Функции и модули', videoUrl: 'video_105.mp4', status: 'locked', duration: '25:00' },
    { id: 106, kind: 'video', title: 'Списки и словари (Data Structures)', videoUrl: 'video_106.mp4', status: 'locked', duration: '28:15' },
    { id: 107, kind: 'video', title: 'Введение в ООП: Классы и Объекты', videoUrl: 'video_107.mp4', status: 'locked', duration: '35:20' },
    { id: 108, kind: 'video', title: 'Работа с файлами и исключениями', videoUrl: 'video_108.mp4', status: 'locked', duration: '20:10' },
    { id: 109, kind: 'video', title: 'Итоговый проект: Телеграм-бот', videoUrl: 'video_109.mp4', status: 'locked', duration: '45:00', deadline: '2026-02-01' },
];

// --- 2) Уроки: Дизайн (все обычные видео) ---
const designLessons: Lesson[] = [
    { id: 201, kind: 'video', title: 'Основы композиции и цвета', videoUrl: 'video_201.mp4', status: 'completed', grade: 5, duration: '12:00' },
    { id: 202, kind: 'video', title: 'Знакомство с Figma', videoUrl: 'video_202.mp4', status: 'completed', grade: 5, duration: '40:00' },
    { id: 203, kind: 'video', title: 'HTML5: Теги и структура', videoUrl: 'video_203.mp4', status: 'active', deadline: '2025-12-25', duration: '25:30' },
    { id: 204, kind: 'video', title: 'CSS3: Стили и селекторы', videoUrl: 'video_204.mp4', status: 'active', duration: '30:00' },
    { id: 205, kind: 'video', title: 'Flexbox и Grid верстка', videoUrl: 'video_205.mp4', status: 'locked', duration: '35:45' },
    { id: 206, kind: 'video', title: 'Адаптив под мобильные устройства', videoUrl: 'video_206.mp4', status: 'locked', duration: '28:10' },
    { id: 207, kind: 'video', title: 'Анимации в CSS', videoUrl: 'video_207.mp4', status: 'locked', duration: '20:00' },
];

// --- 3) Тестовый курс: Математика (PDF тест + таймер + 4 видео-объяснения) ---
const math6Lessons: Lesson[] = [
    {
        id: 701,
        kind: 'quiz_pdf',
        title: 'Тест: Линейные уравнения (40 вопросов)',
        status: 'active',
        duration: '45:00',
        pdfUrl: '/pdf/math6/linear-equations-test-1.pdf',
        questionCount: 40,
        timerSec: 45 * 60,
        explanationVideos: [
            { from: 1, to: 10, videoUrl: 'math_701_explain_1_10.mp4' },
            { from: 11, to: 20, videoUrl: 'math_701_explain_11_20.mp4' },
            { from: 21, to: 30, videoUrl: 'math_701_explain_21_30.mp4' },
            { from: 31, to: 40, videoUrl: 'math_701_explain_31_40.mp4' },
        ],
        // временно для фронта (пример, можно убрать/заменить позже)
        answerKey: {
            1: 'A',
            2: 'C',
            3: 'B',
            4: 'D',
        },
    },
];

// --- 4) Тестовый курс: Казахский язык (видео + текст + загрузка ДЗ) ---
const kazakhLessons: Lesson[] = [
    {
        id: 801,
        kind: 'video_homework',
        title: 'Сабақ 1: Сөз таптары (үй жұмысы)',
        status: 'active',
        duration: '04:00',
        videoUrl: 'kz_801.mp4',
        extraText: 'Жұмысты дәптерге орындап, фотосын жүктеңіз.',
        homework: { accept: 'image', maxFiles: 1 },
    },
];

// --- Курсы (оставляем 1 и 2 + добавляем 2 тестовых под kind) ---
export const mockCourses: Course[] = [
    {
        id: 1,
        title: 'Python-разработчик с нуля',
        description: 'Полный курс от "Hello World" до создания своего первого Telegram-бота и работы с базами данных.',
        price: 25000,
        startDate: '2025-12-15',
        isEnrolled: true,
        category: 'Programming',
        lessons: pythonLessons,
    },
    {
        id: 2,
        title: 'Веб-дизайн и Верстка',
        description: 'Научись создавать современные сайты. Figma, HTML, CSS и основы JavaScript для анимаций.',
        price: 18900,
        startDate: '2026-01-10',
        isEnrolled: true,
        category: 'Design',
        lessons: designLessons,
    },
    {
        id: 7,
        title: 'Математика 6 класс (Проверка)',
        description: 'Тестовый курс: PDF-тест + таймер + видео-разбор.',
        price: 0,
        startDate: '2026-01-15',
        isEnrolled: true,
        category: 'Science',
        lessons: math6Lessons,
    },
    {
        id: 8,
        title: 'Казахский язык (Проверка)',
        description: 'Тестовый курс: видео + загрузка домашки.',
        price: 0,
        startDate: '2026-01-15',
        isEnrolled: true,
        category: 'Science',
        lessons: kazakhLessons,
    },
];

// Новости можешь оставить как были, сокращаю для примера
export const mockNews = [
    { id: 1, title: 'Запуск курса по Python!', content: 'Мы обновили программу курса. Теперь еще больше практики и проектов в портфолио.', date: '2025-12-12' },
];
