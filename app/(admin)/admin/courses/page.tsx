import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AdminCoursesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Управление курсами</h1>

                {/* КНОПКА, КОТОРАЯ ВЕДЕТ НА СОЗДАНИЕ */}
                <Link href="/admin/courses/create">
                    <Button>+ Создать курс</Button>
                </Link>
            </div>

            {/* Тут будет таблица курсов, пока заглушка */}
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                Здесь будет список ваших курсов...
            </div>
        </div>
    );
}
