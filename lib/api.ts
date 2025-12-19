import type { Course, Lesson } from './types';
import { mockCourses, mockNews } from './mockData';

// Функция-хелпер для имитации задержки сети
const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// --- API для КУРСОВ ---

// Получить список всех курсов
export async function fetchAllCourses(): Promise<Course[]> {
    return mockCourses;
}

// Получить список курсов, на которые записан ученик
export async function fetchMyCourses(): Promise<Course[]> {
    return mockCourses.filter(course => course.isEnrolled);
}

// Получить данные конкретного курса по ID
export async function fetchCourseById(id: number): Promise<Course | undefined> {
    return mockCourses.find(course => course.id === id);
}

// Получить данные конкретного урока по ID
export async function fetchLessonById(courseId: number, lessonId: number): Promise<Lesson | undefined> {
    const course = mockCourses.find(c => c.id === courseId);
    return course?.lessons.find(lesson => lesson.id === lessonId);
}

export async function fetchLessonData(courseId: number, lessonId: number) {
    // 1. Ищем курс
    const course = mockCourses.find(c => c.id === courseId);
    if (!course) return null;

    // 2. Ищем индекс урока внутри массива
    const lessonIndex = course.lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex === -1) return null;

    // 3. Достаем сам урок и соседей для навигации
    const lesson = course.lessons[lessonIndex];
    const prevLesson = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null;
    const nextLesson = lessonIndex < course.lessons.length - 1 ? course.lessons[lessonIndex + 1] : null;

    // 4. Возвращаем всё пачкой
    return {
        course,
        lesson,
        prevLesson,
        nextLesson
    };
}

// --- API для НОВОСТЕЙ ---

export async function fetchNews() {
    await simulateDelay(300);
    return mockNews;
}

// --- API для АВТОРИЗАЦИИ (заглушки) ---

export async function login(data: any): Promise<{ token: string }> {
    await simulateDelay(1000);
    if (data.email === "test@bashlms.kz" && data.password === "123456") {
        return { token: "fake_jwt_token_12345" };
    }
    throw new Error("Неверные учетные данные");
}