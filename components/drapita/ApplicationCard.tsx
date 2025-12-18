"use client";

import { Application, ActionType } from "@/lib/drapita/types";
import { RiskBadge } from "./Header";

interface ApplicationCardProps {
    application: Application;
    onCardClick: (id: string) => void;
    onAction: (id: string, action: ActionType) => void;
}

export default function ApplicationCard({
    application,
    onCardClick,
    onAction,
}: ApplicationCardProps) {
    const formattedDate = new Date(application.appliedAt).toLocaleDateString(
        "ja-JP",
        {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    );

    const handleCardClick = (e: React.MouseEvent) => {
        // ボタンクリック時はカード遷移しない
        if ((e.target as HTMLElement).closest("button")) return;
        onCardClick(application.id);
    };

    return (
        <div
            onClick={handleCardClick}
            className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50 cursor-pointer 
                 hover:bg-slate-750 active:scale-[0.98] transition-all duration-150
                 shadow-lg shadow-black/20"
        >
            {/* 上段: 危険度バッジ + 放置日数 */}
            <div className="flex items-center justify-between mb-3">
                <RiskBadge level={application.riskLevel} />
                <div className="text-sm">
                    <span className="text-slate-400">放置 </span>
                    <span
                        className={`font-bold ${application.unattendedDays >= 4
                                ? "text-red-400"
                                : application.unattendedDays >= 2
                                    ? "text-orange-400"
                                    : "text-slate-300"
                            }`}
                    >
                        {application.unattendedDays}日
                    </span>
                </div>
            </div>

            {/* 中段: 候補者名 + エリア */}
            <div className="mb-1">
                <span className="text-lg font-bold text-white">
                    {application.candidateDisplayName}
                </span>
                {application.candidateArea && (
                    <span className="text-slate-400 text-sm ml-2">
                        {application.candidateArea}
                    </span>
                )}
            </div>

            {/* 求人名 */}
            <div className="text-slate-300 text-sm mb-2">{application.jobTitle}</div>

            {/* 応募日時 */}
            <div className="text-slate-500 text-xs mb-4">応募: {formattedDate}</div>

            {/* 下段: 3択ボタン */}
            <div className="flex gap-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onAction(application.id, "OK");
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 font-semibold text-sm
                     hover:bg-emerald-500/30 active:scale-95 transition-all duration-150"
                >
                    OK
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onAction(application.id, "REJECT");
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-red-500/20 text-red-400 font-semibold text-sm
                     hover:bg-red-500/30 active:scale-95 transition-all duration-150"
                >
                    見送り
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onAction(application.id, "HOLD");
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-yellow-500/20 text-yellow-400 font-semibold text-sm
                     hover:bg-yellow-500/30 active:scale-95 transition-all duration-150"
                >
                    保留
                </button>
            </div>
        </div>
    );
}
