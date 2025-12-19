"use client";

import Link from 'next/link';
import { Lock, Zap, CheckCircle, Star } from 'lucide-react';
import { Lesson } from '@/lib/types';

interface LessonNodeProps {
    lesson: Lesson;
    courseId: number;
}

export const LessonNode = ({ lesson, courseId }: LessonNodeProps) => {
    const { status, title, grade, id } = lesson;
    const link = `/courses/${courseId}/lesson/${id}`;

    // Размеры
    const sizeClasses = "h-24 w-24"; // 96px
    const iconSize = "h-10 w-10";

    const statusConfig = {
        completed: {
            icon: <CheckCircle className={`${iconSize} text-white`} />,
            classes: 'bg-green-500 shadow-[0_8px_20px_rgba(34,197,94,0.4)]',
        },
        active: {
            icon: <Zap className={`${iconSize} text-white`} />,
            classes: 'bg-blue-600 ring-[6px] ring-blue-200 shadow-[0_8px_25px_rgba(37,99,235,0.5)]',
        },
        locked: {
            icon: <Lock className={`${iconSize} text-gray-400`} />,
            classes: 'bg-gray-100 border-4 border-gray-200 shadow-none',
        },
    }[status];

    const isPerfect = status === 'completed' && grade === 5;

    const nodeContent = (
        <div
            // shrink-0 запрещает сплющивание
            className={`
                ${sizeClasses} shrink-0 rounded-full flex items-center justify-center 
                transition-transform duration-300 transform 
                ${statusConfig.classes} 
                ${isPerfect ? 'border-4 border-yellow-400' : ''}
            `}
        >
            {statusConfig.icon}
            {isPerfect && (
                <Star className="absolute top-0 right-0 h-8 w-8 text-yellow-500 fill-yellow-500 transform translate-x-1 -translate-y-1 drop-shadow-md" />
            )}
        </div>
    );

    if (status === 'locked') {
        return <div className="flex items-center justify-center">{nodeContent}</div>;
    }

    return (
        <Link
            href={link}
            className="flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all duration-300"
        >
            {nodeContent}
        </Link>
    );
};
