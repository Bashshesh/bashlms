import Link from "next/link";
import { BookOpen, Home, Trophy, User } from "lucide-react";

export const Sidebar = () => {
    return (
        <aside className="h-full w-64 border-r bg-white p-4 shadow-sm">
            <div className="mb-8 flex items-center gap-2 px-2">
                <div className="h-8 w-8 rounded-full bg-blue-600" />
                <span className="text-xl font-bold">BashLMS</span>
            </div>

            <nav className="flex flex-col gap-2">
                <SidebarItem icon={Home} label="Главная" href="/" />
                <SidebarItem icon={Trophy} label="Новости" href="/news" />
                <SidebarItem icon={BookOpen} label="Курсы" href="/courses" />
                <SidebarItem icon={BookOpen} label="Мои курсы" href="/my-courses" />
                <SidebarItem icon={Trophy} label="Достижения" href="/achievements" />
                <SidebarItem icon={User} label="Профиль" href="/profile" />
            </nav>
        </aside>
    );
};

function SidebarItem({ icon: Icon, label, href }: { icon: any; label: string; href: string }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
        >
            <Icon size={20} />
            <span>{label}</span>
        </Link>
    );
}