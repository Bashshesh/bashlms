import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {mockCourses, Course, Lesson} from "@/lib/mockData";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}