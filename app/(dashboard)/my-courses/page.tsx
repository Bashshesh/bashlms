import { fetchAllCourses } from '@/lib/api';
import { CourseCard } from '@/components/features/course/CourseCard';

export default async function CoursesPage() {
    const courses = await fetchAllCourses();


    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6">⭐ Каталог Моих Курсов</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.filter(c => c.isEnrolled).map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
}