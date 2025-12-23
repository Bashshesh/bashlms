"use client";

import Link from "next/link";
import type {Course, HomeworkAccept, Lesson} from "@/lib/types";
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
                Назад к курсу: {course.title}
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

            {/* CONTENT */}
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
    return (
        <div className="flex flex-col gap-6">
            {/* 1. ВИДЕО (если есть) */}
            {lesson.videoUrl && (
                <VideoBlock videoUrl={lesson.videoUrl} />
            )}

            {/* 2. PDF-ТЕСТ (если есть) */}
            {lesson.pdfUrl && (
                <QuizPdfBlock lesson={lesson} />
            )}

            {/* 3. ДОПОЛНИТЕЛЬНЫЙ ТЕКСТ (если есть) */}
            {lesson.extraText && (
                <div className="bg-white rounded-xl border p-6 text-gray-700 leading-relaxed">
                    {lesson.extraText}
                </div>
            )}

            {/* 4. ДОМАШКА (если есть) */}
            {lesson.homework && (
                <HomeworkBlock homework={lesson.homework} />
            )}

            {/* 5. ВИДЕО-РАЗБОРЫ (если есть) */}
            {lesson.explanationVideos?.length && (
                <ExplanationsBlock videos={lesson.explanationVideos} />
            )}
        </div>
    );
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

function QuizPdfBlock({ lesson }: { lesson: Lesson }) {
    const [secondsLeft, setSecondsLeft] = useState(lesson.timerSec || 0);
    const [locked, setLocked] = useState(false);
    const [answers, setAnswers] = useState<Record<number, "A" | "B" | "C" | "D" | undefined>>({});

    useEffect(() => {
        if (locked || !lesson.timerSec) return;

        const interval = setInterval(() => {
            setSecondsLeft((prevSeconds) => {
                if (prevSeconds <= 1) {
                    setLocked(true);
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [locked, lesson.timerSec]); // ✅ Только эти зависимости


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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border overflow-hidden shadow-lg">
                <iframe
                    src={lesson.pdfUrl!}
                    className="w-full h-[70vh]"
                    title="Тест PDF"
                />
            </div>

            <div className="bg-white rounded-xl border p-6 flex flex-col gap-4 shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="font-semibold text-gray-900">
                        Тест: {lesson.questionCount || '??'} вопросов
                    </div>
                    <div className={`font-mono font-semibold text-lg ${locked ? "text-red-600" : "text-blue-600"}`}>
                        {formatTime(secondsLeft)}
                    </div>
                </div>

                <AnswerSheet
                    questionCount={lesson.questionCount || 40}
                    value={answers}
                    disabled={locked}
                    onChange={(q, v) => setAnswers((prev) => ({ ...prev, [q]: v }))}
                />

                <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t">
                    <Button
                        onClick={() => setLocked(true)}
                        disabled={locked}
                        className="flex-1"
                    >
                        Завершить тест
                    </Button>
                    {score !== null && (
                        <div className="text-sm text-gray-700 flex items-center font-semibold bg-gray-50 px-4 py-2 rounded-lg">
                            Балл: {score}/{lesson.questionCount || 40}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function HomeworkBlock({ homework }: { homework: NonNullable<Lesson["homework"]> }) {
    const acceptMap: Record<HomeworkAccept, string> = {
        image: 'image/*',
        file: '*/*',
    };

    return (
        <div className="bg-white rounded-xl border p-6 shadow-lg">
            <h3 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
                📤 Домашнее задание
            </h3>
            <div className="space-y-3">
                <input
                    type="file"
                    accept={acceptMap[homework.accept]}
                    className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border rounded-lg px-3 py-2"
                    multiple={homework.maxFiles > 1}
                />
                <p className="text-xs text-gray-500">
                    Формат: {homework.accept}. Макс: {homework.maxFiles}
                </p>
            </div>
        </div>
    );
}




function ExplanationsBlock({ videos }: { videos: Lesson["explanationVideos"] }) {
    return (
        <div className="bg-white rounded-xl border p-6 shadow-lg">
            <h3 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
                🎥 Видео-разборы
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
                {videos!.map((video, idx) => (
                    <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="font-medium text-gray-900 mb-2">
                            Вопросы {video.from}-{video.to}
                        </div>
                        <VideoBlock videoUrl={video.videoUrl} />
                    </div>
                ))}
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
        <div className="max-h-[55vh] overflow-auto pr-2 border rounded-lg">
            <div className="grid gap-2 p-3">
                {Array.from({ length: questionCount }, (_, i) => i + 1).map((q) => (
                    <div key={q} className="flex items-center justify-between border rounded-lg px-3 py-2 bg-gray-50">
                        <div className="text-sm font-medium text-gray-800 w-12">#{q}</div>
                        <div className="flex gap-1">
                            {options.map((opt) => (
                                <label key={opt} className={`text-xs px-2 py-1 rounded cursor-pointer transition-all ${
                                    disabled
                                        ? "opacity-50 cursor-not-allowed"
                                        : value[q] === opt
                                            ? "bg-blue-100 text-blue-800 font-semibold border-2 border-blue-300"
                                            : "hover:bg-gray-100"
                                }`}>
                                    <input
                                        type="radio"
                                        name={`q_${q}`}
                                        value={opt}
                                        disabled={disabled}
                                        checked={value[q] === opt}
                                        onChange={() => onChange(q, opt)}
                                        className="sr-only"
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
