"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

// Тип данных только для создания (без ID и уроков)
type CreateCourseDTO = {
    title: string;
    description: string;
    price: number;
    startDate: string;
    imageUrl?: string;
};

export const CreateCourseForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);

        // Собираем данные
        const data: CreateCourseDTO = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            price: Number(formData.get("price")),
            startDate: formData.get("startDate") as string,
            // Для MVP можно просто ссылку на картинку или заглушку
            imageUrl: "https://placehold.co/600x400",
        };

        try {
            // Имитация запроса к API (замени на реальный fetch)
            // const res = await fetch('/api/courses', { method: 'POST', body: JSON.stringify(data) ... })

            console.log("Отправляем на бэк:", data);

            // Имитация задержки и успешного ответа с ID нового курса
            await new Promise(resolve => setTimeout(resolve, 1000));
            const newCourseId = 123; // Допустим, бэк вернул ID

            // 🔥 Ключевой момент: Редирект на редактирование
            router.push(`/admin/courses/${newCourseId}`);

        } catch (err) {
            setError("Ошибка при создании курса. Проверьте данные.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 bg-white p-8 rounded-xl shadow-sm border">
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Основная информация</h2>
                <p className="text-sm text-gray-500">Заполните данные, чтобы начать наполнять курс</p>
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
                    {error}
                </div>
            )}

            {/* Название */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Название курса</label>
                <Input
                    name="title"
                    placeholder="Например: Python для начинающих"
                    required
                />
            </div>

            {/* Описание */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Описание</label>
                <textarea
                    name="description"
                    rows={4}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="О чем этот курс?"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Цена */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Цена (₸)</label>
                    <Input
                        name="price"
                        type="number"
                        placeholder="0"
                        min="0"
                        required
                    />
                </div>

                {/* Дата старта */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Дата старта</label>
                    <Input
                        name="startDate"
                        type="date"
                        required
                    />
                </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
                <Button
                    type="button"
                    variant="outline" // Если у тебя есть variants в Button
                    onClick={() => router.back()}
                    disabled={loading}
                >
                    Отмена
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? "Создание..." : "Создать и перейти к урокам →"}
                </Button>
            </div>
        </form>
    );
};
