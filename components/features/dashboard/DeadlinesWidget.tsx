'use client';
import React, { useEffect, useState } from 'react';
import { CalendarClock, CheckCircle } from 'lucide-react'; // Красивые иконки

export const DeadlinesWidget = () => {
    // В будущем тут будет fetchMyCourses() и поиск уроков с дедлайнами
    const [hasDeadlines, setHasDeadlines] = useState(false);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg text-gray-800">Дедлайны</h2>
                {hasDeadlines && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">2 срочных</span>}
            </div>

            {hasDeadlines ? (
                // ВАРИАНТ А: ЕСТЬ ДЕДЛАЙНЫ (Заготовка на будущее)
                <div className="space-y-3">
                    <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded flex justify-between items-center">
                        <div>
                            <h4 className="font-bold text-sm text-gray-800">React Hooks</h4>
                            <p className="text-xs text-red-600">Сегодня, 23:59</p>
                        </div>
                        <CalendarClock size={20} className="text-red-400" />
                    </div>
                </div>
            ) : (
                // ВАРИАНТ Б: НЕТ ДЕДЛАЙНОВ (Сейчас)
                <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                        <CheckCircle size={32} />
                    </div>
                    <h3 className="font-bold text-gray-700">Всё чисто!</h3>
                    <p className="text-sm text-gray-400 mt-1 max-w-[200px]">
                        У вас нет горящих задач на ближайшее время. Можно отдохнуть.
                    </p>
                </div>
            )}
        </div>
    );
}
