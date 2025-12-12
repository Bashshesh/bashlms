import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            variant: {
                default: "bg-blue-600 text-white hover:bg-blue-700",
                outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
                ghost: "hover:bg-gray-100",
                destructive: "bg-red-600 text-white hover:bg-red-700",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 px-3",
                lg: "h-11 px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

export const Button = ({
                           className,
                           children,
                           variant,
                           size,
                           isLoading = false,
                           disabled,
                           ...props
                       }: ButtonProps) => {
    return (
        <button
            className={cn(buttonVariants({ variant, size, className }))}
            disabled={isLoading || disabled} // Кнопка отключается, если isLoading или disabled
            {...props}
        >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} {/* Иконка загрузки */}
            {children}
        </button>
    );
};