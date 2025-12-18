"use client";

import { ReactNode, createContext, useContext, useState, useCallback } from "react";
import Toast from "@/components/drapita/Toast";

interface ToastContextType {
    showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within DrapitaLayout");
    }
    return context;
}

export default function DrapitaLayout({ children }: { children: ReactNode }) {
    const [toastMessage, setToastMessage] = useState("");
    const [isToastVisible, setIsToastVisible] = useState(false);

    const showToast = useCallback((message: string) => {
        setToastMessage(message);
        setIsToastVisible(true);
    }, []);

    const hideToast = useCallback(() => {
        setIsToastVisible(false);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            <div className="min-h-screen bg-slate-950">
                {/* Mobile container */}
                <div className="max-w-[390px] mx-auto min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl">
                    {children}
                </div>
            </div>
            <Toast message={toastMessage} isVisible={isToastVisible} onHide={hideToast} />
        </ToastContext.Provider>
    );
}
