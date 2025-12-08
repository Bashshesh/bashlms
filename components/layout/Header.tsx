import Link from "next/link";
import { UserCircle, Menu } from "lucide-react";

export const Header = () => {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
            {/*Levaia chast'*/}
            <div className="flex items-center gap-4">
                {/*Knopla damoi*/}
                <button className="text-slate-500 hover:text-blue-600 transition">
                    <Menu size={24} />
                </button>

                {/*Glavnaya str*/}
                <Link href="/" className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition">
                    Главная
                </Link>
            </div>

            {/* ПРАВАЯ ЧАСТЬ: Профиль */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 hidden sm:block">Имя Пользователя</span>
                <Link href="/profile" aria-label="Профиль">
                    <UserCircle size={32} className="text-gray-500 hover:text-blue-600 transition" />
                </Link>
            </div>
        </header>
    )
}