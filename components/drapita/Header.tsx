"use client";

import { RiskLevel } from "@/lib/drapita/types";

interface HeaderProps {
    companyName: string;
    unprocessedCount: number;
    showBack?: boolean;
    onBack?: () => void;
}

export default function Header({
    companyName,
    unprocessedCount,
    showBack = false,
    onBack,
}: HeaderProps) {
    const today = new Date().toLocaleDateString("ja-JP", {
        month: "long",
        day: "numeric",
        weekday: "short",
    });

    return (
        <header className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 sticky top-0 z-50">
            <div className="flex items-center gap-3">
                {showBack && (
                    <button
                        onClick={onBack}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
                    >
                        <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                )}
                <div>
                    <h1 className="text-white font-bold text-base">{companyName}</h1>
                    <p className="text-slate-400 text-xs">{today}</p>
                </div>
            </div>

            <div className="relative">
                <div className="bg-red-500 text-white font-bold text-sm px-3 py-1.5 rounded-full min-w-[48px] text-center shadow-lg shadow-red-500/30">
                    {unprocessedCount}
                </div>
                <span className="absolute -bottom-4 right-0 text-[10px] text-slate-400">
                    未対応
                </span>
            </div>
        </header>
    );
}

// 危険度バッジコンポーネント
export function RiskBadge({ level }: { level: RiskLevel }) {
    const config: Record<RiskLevel, { bg: string; text: string; label: string }> = {
        OVERDUE: {
            bg: "bg-red-500/20",
            text: "text-red-400",
            label: "期限超過",
        },
        TODAY: {
            bg: "bg-orange-500/20",
            text: "text-orange-400",
            label: "今日中",
        },
        NEW: {
            bg: "bg-emerald-500/20",
            text: "text-emerald-400",
            label: "新着",
        },
        NORMAL: {
            bg: "bg-slate-500/20",
            text: "text-slate-400",
            label: "通常",
        },
    };

    const { bg, text, label } = config[level];

    return (
        <span
            className={`${bg} ${text} text-xs font-semibold px-2 py-0.5 rounded-full`}
        >
            {label}
        </span>
    );
}
