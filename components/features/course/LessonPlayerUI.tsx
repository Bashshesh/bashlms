"use client";

import Link from "next/link";
import type { Course, Lesson } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, CheckCircle, Lock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface LessonPlayerUIProps {
    course: Course;
    lesson: Lesson;
    prevLesson: Lesson | null;
    nextLesson: Lesson | null;
}

export default function LessonPlayerUI({ course, lesson, prevLesson, nextLesson }: LessonPlayerUIProps) {
    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto p-4">
            <Link
                href={`/courses/${course.id}`}
                className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Назад к курсу "{course.title}"
            </Link>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
                    <p className="text-gray-500 mt-1">Урок #{lesson.id}</p>
                </div>

                {lesson.status === "completed" && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Просмотрено {lesson.grade ? `(Оценка: ${lesson.grade})` : ""}
                    </div>
                )}
            </div>

            {/* CONTENT BY KIND */}
            {lesson.status === "locked" ? (
                <LockedBlock lesson={lesson} />
            ) : (
                <LessonContent lesson={lesson} />
            )}

            <div className="flex justify-between items-center mt-2">
                {prevLesson ? (
                    <Link href={`/courses/${course.id}/lesson/${prevLesson.id}`}>
                        <Button variant="outline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {prevLesson.title}
                        </Button>
                    </Link>
                ) : (
                    <div />
                )}

                {nextLesson ? (
                    <Link href={`/courses/${course.id}/lesson/${nextLesson.id}`}>
                        <Button>
                            Следующий урок
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                ) : (
                    <Button disabled>Это последний урок</Button>
                )}
            </div>
        </div>
    );
}

function LockedBlock({ lesson }: { lesson: Lesson }) {
    return (
        <div className="aspect-video bg-gray-900/80 rounded-xl overflow-hidden shadow-lg flex flex-col items-center justify-center text-white">
            <Lock className="w-12 h-12 mb-2 text-gray-400" />
            <p className="font-semibold">Этот урок пока недоступен</p>
            {lesson.deadline && <p className="text-sm text-gray-400">Откроется: {lesson.deadline}</p>}
        </div>
    );
}

function LessonContent({ lesson }: { lesson: Lesson }) {
    switch (lesson.kind) {
        case "video":
            return <VideoBlock videoUrl={lesson.videoUrl} />;

        case "video_homework":
            return (
                <div className="flex flex-col gap-4">
                    <VideoBlock videoUrl={lesson.videoUrl} />
                    {lesson.extraText && <div className="bg-white rounded-xl border p-4 text-gray-700">{lesson.extraText}</div>}

                    <div className="bg-white rounded-xl border p-4">
                        <p className="font-semibold text-gray-900 mb-2">Отправить домашку</p>
                        <input type="file" accept="image/*" className="block w-full text-sm" />
                        <p className="text-xs text-gray-500 mt-2">Формат: фото. Макс. файлов: {lesson.homework.maxFiles}</p>
                    </div>
                </div>
            );

        case "quiz_pdf":
            return <QuizPdfBlock lesson={lesson} />;
    }
}

function VideoBlock({ videoUrl }: { videoUrl: string }) {
    return (
        <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
            <video controls className="w-full h-full object-cover" poster="/globe.svg">
                <source src={videoUrl} type="video/mp4" />
                Ваш браузер не поддерживает видео.
            </video>
        </div>
    );
}

function QuizPdfBlock({ lesson }: { lesson: Extract<Lesson, { kind: "quiz_pdf" }> }) {
    const [secondsLeft, setSecondsLeft] = useState(lesson.timerSec);
    const [locked, setLocked] = useState(false);
    const [answers, setAnswers] = useState<Record<number, "A" | "B" | "C" | "D" | undefined>>({});

    useEffect(() => {
        if (locked) return;
        if (secondsLeft <= 0) {
            setLocked(true);
            return;
        }
        const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
        return () => clearInterval(t);
    }, [secondsLeft, locked]);

    const score = useMemo(() => {
        if (!lesson.answerKey) return null;
        let ok = 0;
        for (const [qStr, right] of Object.entries(lesson.answerKey)) {
            const q = Number(qStr);
            if (answers[q] && answers[q] === right) ok++;
        }
        return ok;
    }, [answers, lesson.answerKey]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border overflow-hidden">
                {/* Пока без зависимостей: просто iframe */}
                <iframe src={lesson.pdfUrl} className="w-full h-[70vh]" />
            </div>

            <div className="bg-white rounded-xl border p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="font-semibold text-gray-900">Тест: {lesson.questionCount} вопросов</div>
                    <div className={`font-mono ${locked ? "text-red-600" : "text-gray-700"}`}>
                        {formatTime(secondsLeft)}
                    </div>
                </div>

                <AnswerSheet
                    questionCount={lesson.questionCount}
                    value={answers}
                    disabled={locked}
                    onChange={(q, v) => setAnswers((prev) => ({ ...prev, [q]: v }))}
                />

                <div className="flex gap-2">
                    <Button onClick={() => setLocked(true)} disabled={locked}>
                        Завершить
                    </Button>
                    {locked && score !== null && (
                        <div className="text-sm text-gray-700 flex items-center">
                            Балл: <span className="font-semibold ml-1">{score}</span>
                        </div>
                    )}
                </div>

                {locked && (
                    <div className="border-t pt-4">
                        <p className="font-semibold text-gray-900 mb-2">Видео-разбор</p>
                        <div className="grid gap-2">
                            {lesson.explanationVideos.map((v) => (
                                <div key={`${v.from}-${v.to}`} className="text-sm text-gray-700">
                                    {v.from}-{v.to}: {v.videoUrl}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function AnswerSheet({
                         questionCount,
                         value,
                         disabled,
                         onChange,
                     }: {
    questionCount: number;
    value: Record<number, "A" | "B" | "C" | "D" | undefined>;
    disabled: boolean;
    onChange: (q: number, v: "A" | "B" | "C" | "D") => void;
}) {
    const options: Array<"A" | "B" | "C" | "D"> = ["A", "B", "C", "D"];

    return (
        <div className="max-h-[55vh] overflow-auto pr-2">
            <div className="grid gap-2">
                {Array.from({ length: questionCount }, (_, i) => i + 1).map((q) => (
                    <div key={q} className="flex items-center justify-between border rounded-lg px-3 py-2">
                        <div className="text-sm font-medium text-gray-800">#{q}</div>
                        <div className="flex gap-2">
                            {options.map((opt) => (
                                <label key={opt} className={`text-sm ${disabled ? "opacity-60" : ""}`}>
                                    <input
                                        type="radio"
                                        name={`q_${q}`}
                                        value={opt}
                                        disabled={disabled}
                                        checked={value[q] === opt}
                                        onChange={() => onChange(q, opt)}
                                        className="mr-1"
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function formatTime(totalSec: number) {
    const s = Math.max(0, totalSec);
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
}
