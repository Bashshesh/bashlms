import Link from "next/link";
import {LoginFormContainer} from "@/components/features/auth/LoginFormContainer";

export default function RegisterPage() {
    return (
        <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">🔐 Вход</h1>
            <LoginFormContainer />

            <p className="mt-6 text-center text-sm text-gray-600">
                Нет аккаунта?
                <Link href="/register" className="font-semibold text-blue-600 hover:underline ml-1">
                    Зарегистрироваться
                </Link>
            </p>
        </div>
    )
}