'use client';

import React, { useState } from 'react';
import { LoginFormUI } from './LoginFormUI';
import { useRouter } from 'next/navigation'; // Для перенаправления после логина
// import { loginUser } from '@/lib/api'; // <-- В будущем тут будет реальный API клиент

export const LoginFormContainer = () => {
    const router = useRouter(); // Используем useRouter для программной навигации
    const [formState, setFormState] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // 1. **ВАЛИДАЦИЯ (Frontend):**
        if (!formState.email || !formState.password) {
            setError("Пожалуйста, введите email и пароль.");
            setIsLoading(false);
            return;
        }

        try {
            // 2. **ВЫЗОВ API (Backend):**
            // const response = await loginUser(formState); // <-- В будущем тут будет реальный вызов
            console.log('Отправка данных на Django для логина:', formState);

            // 3. **УСПЕХ:**
            // if (response.token) { // Предполагаем, что Django возвращает токен
            //   localStorage.setItem('authToken', response.token); // Сохраняем токен
            //   router.push('/news'); // Перенаправляем на главную после логина
            // }
            alert('Успешный вход! (Перенаправления пока нет)');
            router.push('/news'); // Временно перенаправляем на новости после алерта

        } catch (apiError) {
            // 4. **ОШИБКА:**
            console.error('Ошибка входа:', apiError);
            // setError(apiError.response.data.message || "Неверный логин или пароль.");
            setError("Неверный email или пароль.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LoginFormUI
            isLoading={isLoading}
            error={error}
            onSubmit={handleLogin}
            onInputChange={handleInputChange}
        />
    );
};

export class LoginFormConatiner {
}