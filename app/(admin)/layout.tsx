import type { Metadata } from "next";
import { AdminSidebar } from "@/components/features/admin/AdminSidebar"; // Сейчас создадим

export const metadata: Metadata = {
    title: "Админ-панель | LMS",
    description: "Управление курсами",
};

export default function AdminLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Левая часть: Сайдбар (фиксированный) */}
            <aside className="w-64 bg-slate-900 text-white flex-shrink-0">
                <AdminSidebar />
            </aside>

            {/* Правая часть: Контент (скроллится) */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
