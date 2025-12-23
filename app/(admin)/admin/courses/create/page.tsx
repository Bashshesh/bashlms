import { CreateCourseForm } from "@/components/features/admin/CreateCourseForm";

export default function CreateCoursePage() {
    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Создать новый курс</h1>
            </div>

            <CreateCourseForm />
        </div>
    );
}
