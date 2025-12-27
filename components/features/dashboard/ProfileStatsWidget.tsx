'use client';
import React, { useEffect, useState } from 'react';
import { fetchMyCourses } from '@/lib/api';

export const ProfileStatsWidget = () => {
    const [stats, setStats] = useState({ total: 0, active: 0, completed: 0 });

    useEffect(() => {
        fetchMyCourses().then(courses => {
            // Тут можно будет фильтровать completed, если бэк будет отдавать статус курса
            // Пока считаем что все активные
            setStats({
                total: courses.length,
                active: courses.length,
                completed: 0
            });
        }).catch(console.error);
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm h-full flex flex-col justify-between gap-4">
            <h3 className="font-bold text-lg mb-2">Статистика</h3>

            {/* Блок 1 */}
            <div className="bg-gray-100 p-3 rounded-lg flex flex-col items-center justify-center text-center">
                <span className="font-bold text-xl text-blue-900">{stats.completed}</span>
                <span className="text-sm text-gray-600">Курсов пройдено 🎓</span>
            </div>

            {/* Блок 2 */}
            <div className="bg-gray-100 p-3 rounded-lg flex flex-col items-center justify-center text-center">
                <span className="font-bold text-xl text-blue-900">{stats.active}</span>
                <span className="text-sm text-gray-600">Курсов начато 📖</span>
            </div>

            {/* Блок 3 */}
            <div className="bg-gray-100 p-3 rounded-lg flex flex-col items-center justify-center text-center">
                <span className="font-bold text-xl text-green-600">--</span>
                <span className="text-sm text-gray-600">Средняя оценка 📊</span>
            </div>
        </div>
    );
};
