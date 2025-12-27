'use client';

import Link from "next/link";
import { UserCircle, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchMe } from "@/lib/api";
import { usePathname } from "next/navigation";

export const Header = () => {
    const [user, setUser] = useState<any>(null);
    const pathname = usePathname();

    useEffect(() => {
        fetchMe().then(setUser).catch(() => setUser(null));
    }, []);

    // Простой маппинг путей в заголовки
    const getPageTitle = () => {
        if (pathname === '/') return 'Главная';
        if (pathname.startsWith('/courses')) return 'Каталог Курсов';
        if (pathname.startsWith('/my-courses')) return 'Мои Курсы';
        if (pathname.startsWith('/profile')) return 'Профиль';
        if (pathname.startsWith('/news')) return 'Новости';
        return 'BashLMS';
    };

    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6 sticky top-0 z-40 shadow-sm">
            {/* Левая часть */}
            <div className="flex items-center gap-4">
                {/* Эту кнопку можно использовать для мобильного меню в будущем */}
                <button className="text-slate-500 hover:text-blue-600 transition md:hidden">
                    <Menu size={24} />
                </button>

                <div className="text-lg font-semibold text-gray-700">
                    {getPageTitle()}
                </div>
            </div>

            {/* Правая часть */}
            <div className="flex items-center gap-3">
                {user ? (
                    <>
                        <span className="text-sm text-gray-600 hidden sm:block font-medium">
                            {user.username}
                        </span>
                        <Link href="/profile" aria-label="Профиль">
                            {/* Если есть аватарка - показать, иначе иконку */}
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold uppercase hover:bg-blue-200 transition">
                                {user.email[0]}
                            </div>
                        </Link>
                    </>
                ) : (
                    <Link href="/login" className="text-sm font-medium text-blue-600 hover:underline">
                        Войти
                    </Link>
                )}
            </div>
        </header>
    )
}
