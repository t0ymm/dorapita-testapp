"use client";

import { useEffect, useState } from "react";

interface ToastProps {
    message: string;
    isVisible: boolean;
    onHide: () => void;
    duration?: number;
}

export default function Toast({
    message,
    isVisible,
    onHide,
    duration = 1500,
}: ToastProps) {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsAnimating(true);
            const timer = setTimeout(() => {
                setIsAnimating(false);
                setTimeout(onHide, 300); // Wait for fade out animation
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onHide]);

    if (!isVisible && !isAnimating) return null;

    return (
        <div
            className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${isAnimating
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
        >
            <div className="bg-emerald-500 text-white px-6 py-3 rounded-full font-medium shadow-lg shadow-emerald-500/30 flex items-center gap-2">
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
                {message}
            </div>
        </div>
    );
}
