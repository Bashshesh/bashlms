import React from 'react';
import { Medal } from 'lucide-react';

export default function AchievementsPage() {
    return (
        <div className="p-6 max-w-5xl mx-auto h-full flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Medal size={48} className="text-gray-300" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">Достижения пока закрыты</h1>
            <p className="text-gray-500 max-w-md mb-8">
                Проходите курсы, сдавайте тесты на отлично и получайте уникальные награды.
                Ваша первая медаль уже ждет вас!
            </p>

            {/* Фейковые заблокированные ачивки для красоты */}
            <div className="grid grid-cols-3 gap-4 opacity-50 pointer-events-none grayscale">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">🏆</div>
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">⚡️</div>
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">🎓</div>
            </div>
        </div>
    );
}
