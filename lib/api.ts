import api from '@/lib/axios';
import type { Course, Lesson } from './types';

// --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ (Mappers) ---
// Django отдает snake_case (video_url), а фронт ждет camelCase (videoUrl)
// Здесь мы их "женим"

const adaptCourse = (data: any): Course => ({
    id: data.id,
    title: data.title,
    description: data.description,
    price: 0, // В твоей БД нет цены, ставим заглушку или добавь поле в модель
    startDate: data.created_at || new Date().toISOString(), // created_at -> startDate
    isEnrolled: data.is_enrolled,
    image: data.cover, // cover -> image
    lessons: data.lessons ? data.lessons.map(adaptLesson) : [],
});

const adaptLesson = (data: any): Lesson => ({
    id: data.id,
    title: data.title,
    status: data.status, // Твой сериалайзер уже возвращает 'locked'/'active'/'completed'

    // Опциональные поля
    videoUrl: data.video_url || undefined, // video_url -> videoUrl

    // Поля, которых нет в БД (пока заглушки, чтобы TS не ругался)
    questionCount: 0,
    timerSec: 0,

    grade: data.grade,
});

// --- API ФУНКЦИИ ---

export async function completeLesson(courseId: number, lessonId: number) {
    // Вызываем action "complete" из LessonViewSet
    // URL будет примерно такой: /courses/1/lessons/5/complete/
    const response = await api.post(`/courses/${courseId}/lessons/${lessonId}/complete/`);
    return response.data;
}

export async function fetchAllCourses(): Promise<Course[]> {
    const response = await api.get('/courses/');
    return response.data.map(adaptCourse);
}

export async function fetchMyCourses(): Promise<Course[]> {
    // Используем твой action "my_courses" из CourseViewSet
    const response = await api.get('/courses/my_courses/');
    return response.data.map(adaptCourse);
}

export async function fetchCourseById(id: number): Promise<Course | undefined> {
    try {
        const response = await api.get(`/courses/${id}/`);
        return adaptCourse(response.data);
    } catch (error) {
        return undefined;
    }
}

// Получить данные урока (Context)
export async function fetchLessonData(courseId: number, lessonId: number) {
    try {
        // Вызываем твой кастомный action "context"
        const response = await api.get(`/courses/${courseId}/lessons/${lessonId}/context/`);

        return {
            course: adaptCourse(response.data.course),
            lesson: adaptLesson(response.data.lesson),
            prevLesson: response.data.prevLesson ? adaptLesson(response.data.prevLesson) : null,
            nextLesson: response.data.nextLesson ? adaptLesson(response.data.nextLesson) : null
        };
    } catch (error) {
        console.error("Ошибка загрузки урока:", error);
        return null;
    }
}

// --- API для НОВОСТЕЙ ---

export async function fetchNews() {
    const response = await api.get('/news/');
    return response.data;
}

// --- API для АВТОРИЗАЦИИ ---

export async function login(data: any): Promise<{ token: string, refresh: string }> {
    // ВАЖНО: У тебя в urls.py путь api/v1/auth/token/
    const response = await api.post('/auth/token/', {
        email: data.email,
        password: data.password
    });

    if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        return { token: response.data.access, refresh: response.data.refresh };
    }
    throw new Error("Ошибка входа");
}

export async function register(data: any) {
    // Путь из users/urls.py -> path('auth/register/', ...)
    const response = await api.post('/auth/register/', {
        username: data.username,
        email: data.email,
        password: data.password,
        password2: data.confirmPassword // Бэк ждет password2
    });
    return response.data;
}

export async function fetchMe() {
    // Получить данные текущего юзера
    const response = await api.get('/auth/me/');
    return response.data;
}

// Функция выхода
export function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
}

//Запись на курс
export async function enrollInCourse(courseId: number): Promise<void> {
    // Вызываем action "enroll", который ты прописал в views.py
    await api.post(`/courses/${courseId}/enroll/`);
}