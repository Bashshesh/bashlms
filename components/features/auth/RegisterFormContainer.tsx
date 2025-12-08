"use client";

import React, { useState } from 'react';
import { RegisterFormUI } from './RegisterFormUI';
// import { registerUser } from '@/lib/api';

export const RegisterFormContainer = () => {
    const [formState, setFormState] = useState({
        email: '',
        name: '',
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

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // 1. **ВАЛИДАЦИЯ (Frontend):** Простая проверка
        if (!formState.email || formState.password.length < 6) {
            setError("Пожалуйста, заполните все поля корректно.");
            setIsLoading(false);
            return;
        }

        try {
            // 2. **ВЫЗОВ API (Backend):**
            // await registerUser(formState); // <-- В будущем тут будет реальный вызов
            console.log('Отправка данных на Django:', formState);

            // 3. **УСПЕХ:**
            // router.push('/news'); // Перенаправляем на дашборд
            alert('Успешная регистрация! (Перенаправления пока нет)');

        } catch (apiError) {
            // 4. **ОШИБКА:** Обработка ошибок от Django (400, 409 Conflict и т.д.)
            console.error('Ошибка регистрации:', apiError);
            // setError(apiError.response.data.message || "Произошла ошибка сервера.");
            setError("Ошибка: Пользователь с таким email уже существует.");
        } finally {
            setIsLoading(false);
        }
    };

    // Передаем логику и состояние в "тупой" UI компонент
    return (
        <RegisterFormUI
            isLoading={isLoading}
            error={error}
            onSubmit={handleRegister}
            onInputChange={handleInputChange}
        />
    );
};