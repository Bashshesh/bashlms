"use client";

import Link from "next/link";
import {BookOpen, Home, Trophy, User, ChevronLeft, ChevronRight, MoreVertical, LogOut} from "lucide-react";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { fetchMe, logout } from "@/lib/api"; // Импортируй свои функции


interface SidebarContextType {
    expanded: boolean;
}
const SidebarContext = createContext<SidebarContextType>({ expanded: false });

export const Sidebar = () => {
    const [expanded, setExpanded] = useState(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        fetchMe().then(setUser).catch(() => setUser(null));
    }, []);

    const handleLogout = () => {
        logout(); // Удаляем токен
        router.push('/login');
    };

    return (
        <aside className="h-screen sticky top-0 z-50">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm transition-all duration-300">

                {/* --- ШАПКА: Лого + Кнопка сворачивания --- */}
                <div className="p-4 pb-2 flex justify-between items-center h-16">
                    <div className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ${expanded ? "w-40" : "w-0"}`}>
                        <div className="h-8 w-8 min-w-[32px] rounded-full bg-blue-600 flex-shrink-0" />
                        <span className={`text-xl font-bold whitespace-nowrap ${!expanded && "hidden"}`}>
              BashLMS
            </span>
                    </div>

                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600"
                    >
                        {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </button>
                </div>

                {/* --- МЕНЮ --- */}
                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3 mt-4 flex flex-col gap-1">
                        <SidebarItem icon={Home} label="Главная" href="/" />
                        <SidebarItem icon={Trophy} label="Новости" href="/news" />
                        <SidebarItem icon={BookOpen} label="Курсы" href="/courses" />
                        {user && <SidebarItem icon={BookOpen} label="Мои курсы" href="/my-courses" />}
                        <SidebarItem icon={Trophy} label="Достижения" href="/achievements" />
                        <SidebarItem icon={User} label="Профиль" href="/profile" />
                    </ul>
                </SidebarContext.Provider>

                {/* --- НИЖНЯЯ ЧАСТЬ: Профиль (Опционально) --- */}
                <div className="border-t flex p-3 items-center relative group">
                    <div className="w-10 h-10 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg min-w-[40px] uppercase">
                        {user?.email?.[0] || "?"}
                    </div>

                    <div className={`flex justify-between items-center overflow-hidden transition-all duration-300 ${expanded ? "w-40 ml-3" : "w-0"}`}>
                        <div className="leading-4 whitespace-nowrap overflow-hidden">
                            <h4 className="font-semibold text-sm truncate">{user?.username || "Гость"}</h4>
                            <span className="text-xs text-gray-600 truncate block w-32" title={user?.email}>
                                {user?.email || "Войдите в аккаунт"}
                            </span>
                        </div>

                        {/* Кнопка выхода (Logout) */}
                        {user ? (
                            <button onClick={handleLogout} title="Выйти" className="hover:text-red-500 transition">
                                <LogOut size={20} className="text-gray-500" />
                            </button>
                        ) : (
                            <Link href="/login">
                                <MoreVertical size={20} className="text-gray-500 cursor-pointer" />
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </aside>
    );
};

// Компонент одного пункта меню
interface SidebarItemProps {
    icon: any;
    label: string;
    href: string;
    alert?: boolean; // Если нужно показать красную точку
}

function SidebarItem({ icon: Icon, label, href, alert }: SidebarItemProps) {
    const { expanded } = useContext(SidebarContext);
    const pathname = usePathname();

    // Проверяем, активна ли ссылка (совпадает ли путь)
    const isActive = pathname === href;

    return (
        <Link href={href}>
            <li
                className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${isActive
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-100 text-gray-600"
                }
        `}
            >
                <Icon size={20} className="min-w-[20px]" />

                <span className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${expanded ? "w-40 ml-3" : "w-0"}`}>
          {label}
        </span>

                {/* Индикатор уведомления (красная точка) */}
                {alert && (
                    <div className={`absolute right-2 w-2 h-2 rounded bg-red-400 ${expanded ? "" : "top-2"}`} />
                )}

                {/* Тултип (Всплывашка при наведении, когда меню свернуто) */}
                {!expanded && (
                    <div className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-gray-800 text-white text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            whitespace-nowrap z-50
          `}>
                        {label}
                    </div>
                )}
            </li>
        </Link>
    );
}