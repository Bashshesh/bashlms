import Link from "next/link";

// Компонент карточки для статистики
const StatCard = ({ title, value, subtext }: { title: string; value: string; subtext: string }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</h3>
        <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{value}</span>
        </div>
        <p className="mt-1 text-sm text-green-600">{subtext}</p>
    </div>
);

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Дашборд</h1>
                <p className="text-slate-500">Обзор статистики платформы за сегодня</p>
            </div>

            {/* 1. Статистика */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Студенты" value="1,203" subtext="+12 сегодня" />
                <StatCard title="Продажи" value="450,000 ₸" subtext="+45,000 ₸ за неделю" />
                <StatCard title="Активные курсы" value="8" subtext="2 на модерации" />
            </div>

            {/* 2. Быстрые действия */}
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-blue-900">Быстрый старт</h3>
                    <p className="text-blue-700">Самое важное действие сейчас — наполнение контентом.</p>
                </div>
                <Link
                    href="/admin/courses/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                    + Добавить новый курс
                </Link>
            </div>
        </div>
    );
}
