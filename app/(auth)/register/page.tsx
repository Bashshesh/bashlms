import Link from "next/link";
import { RegisterFormContainer } from "@/components/features/auth/RegisterFormContainer";

export default function RegisterPage() {
    return (
        <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">✍️ Создать Аккаунт</h1>
            <RegisterFormContainer />

            <p className="mt-6 text-center text-sm text-gray-600">
                Уже есть аккаунт?
                <Link href="/login" className="font-semibold text-blue-600 hover:underline ml-1">
                    Войти
                </Link>
            </p>
        </div>
    )
}