import { redirect } from 'next/navigation';
// import { getSession } from '@/lib/auth';

export default async function RootPage() {
    // 🚨 ВАЖНО: Мокируем проверку. В будущем тут будет вызов к Django API.
    // Например: const session = await getSession();
    // const isAuthenticated = !!session;
    const isAuthenticated = false; // <-- МЕНЯЕМ НА false, чтобы тестировать Регистрацию

    if (isAuthenticated) {
        // 1. Если залогинен -> на Новости (Dashboard)
        redirect('/news');
    } else {
        // 2. Если НЕ залогинен -> на Регистрацию
        redirect('/register');
    }

    // Next.js должен найти компонент для отображения,
    // но redirect сработает раньше. Просто для чистоты:
    return null;
}
