const API_URL = "http://localhost:8000"; // Адрес твоего Python бэка

export async function createCourse(data: any) {
    const res = await fetch(`${API_URL}/courses/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Ошибка при создании курса");
    return res.json(); // Возвращает созданный курс с ID
}

export async function createLesson(courseId: number, data: any) {
    const res = await fetch(`${API_URL}/courses/${courseId}/lessons/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Ошибка при создании урока");
    return res.json();
}
