import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: 'BashLMS | Платформа для обучения',
    description: 'Образовательная платформа для школьников.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
        <body className={inter.className}>{children}</body>
        </html>
    );
}
