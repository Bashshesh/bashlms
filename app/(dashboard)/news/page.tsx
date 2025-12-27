import { fetchNews } from "@/lib/api";
import { Alert } from '@/components/ui/Alert';
import { Calendar } from "lucide-react"; // Иконка даты

interface NewsItem {
    id: number;
    title: string;
    content: string;
    date: string;
}

export default async function NewsPage() {
    let news: NewsItem[] = [];
    let error: string | null = null;

    try {
        news = await fetchNews();
    } catch (e) {
        error = 'Не удалось загрузить новости.';
        console.error(e);
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Новости и обновления</h1>
                    <p className="text-gray-500 mt-1">Последние события платформы BashLMS</p>
                </div>
            </div>

            {error && <Alert type="error" message={error} className="mb-6" />}

            {news.length === 0 && !error && (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                    <h3 className="text-lg font-medium text-gray-900">Пока новостей нет</h3>
                    <p className="text-gray-500">Следите за обновлениями.</p>
                </div>
            )}

            <div className="grid gap-6">
                {news.map((item) => (
                    <article key={item.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                            <Calendar size={14} />
                            <time>{new Date(item.date).toLocaleDateString('ru-RU', {
                                day: 'numeric', month: 'long', year: 'numeric'
                            })}</time>
                        </div>

                        <h2 className="text-xl font-bold text-gray-800 mb-3 leading-tight hover:text-blue-600 transition-colors cursor-pointer">
                            {item.title}
                        </h2>

                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                            {item.content}
                        </p>
                    </article>
                ))}
            </div>
        </div>
    );
}
