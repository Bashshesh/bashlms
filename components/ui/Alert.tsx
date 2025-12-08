import { AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertProps {
    message: string;
    type?: "success" | "error" | "warning";
    className?: string;
}

export const Alert = ({ message, type = "warning", className }: AlertProps) => {
    const icon = type === "error" ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />;
    const baseClasses = "flex items-center gap-2 rounded-md p-3 text-sm";

    const typeClasses = {
        success: "bg-green-50 border border-green-200 text-green-700",
        error: "bg-red-50 border border-red-200 text-red-700",
        warning: "bg-yellow-50 border border-yellow-200 text-yellow-700",
    };

    return (
        <div className={cn(baseClasses, typeClasses[type], className)} role="alert">
            {icon}
            <span>{message}</span>
        </div>
    );
};