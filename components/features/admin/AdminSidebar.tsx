"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminLinks = [
    { href: "/admin", label: "Главная" },
    { href: "/admin/courses", label: "Курсы" },
    { href: "/admin/users", label: "Пользователи" }, // на будущее
];

export const AdminSidebar = () => {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full">
            {/* Логотип админки */}
            <div className="h-16 flex items-center px-6 border-b border-slate-800 font-bold text-xl">
                LMS Admin 🛡️
            </div>

            {/* Меню */}
            <nav className="flex-1 py-6 px-3 space-y-1">
                {adminLinks.map((link) => {
                    const isActive = pathname === link.href || pathname.startsWith(link.href + "/");

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                            }`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Кнопка выхода */}
            <div className="p-4 border-t border-slate-800">
                <Link href="/" className="text-xs text-slate-400 hover:text-white">
                    ← Вернуться на сайт
                </Link>
            </div>
        </div>
    );
};
