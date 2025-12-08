import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";
import Link from "next/link";
import React from "react";

interface LoginFormUIProps {
    isLoading: boolean;
    error: string | null;
    onSubmit: (e: React.FormEvent) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoginFormUI = ({
                                   isLoading,
                                   error,
                                   onSubmit,
                                   onInputChange
                               }: LoginFormUIProps) => {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            {error && <Alert type="error" message={error} />} {/* Показываем ошибку, если есть */}

            <Input
                id="email"
                name="email"
                type="email"
                label="Электронная почта"
                placeholder="pochta@primer.ru"
                onChange={onInputChange}
                required
            />

            <Input
                id="name"
                name="name"
                type="text"
                label="Ваше имя"
                placeholder="Иван"
                onChange={onInputChange}
                required
            />

            <Input
                id="password"
                name="password"
                type="password"
                label="Пароль"
                placeholder="••••••••"
                onChange={onInputChange}
                required
            />

            <div className="flex items-center justify-end">
                <div className="text-sm">
                    <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                        Забыли пароль?
                    </Link>
                </div>
            </div>

            <Button type="submit" isLoading={isLoading} disabled={isLoading} className="w-full">
                {isLoading ? 'Вход...' : 'Войти'}
            </Button>
        </form>
    );
};
