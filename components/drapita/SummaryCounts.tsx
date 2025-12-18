"use client";

import { DeskCounts } from "@/lib/drapita/types";

interface SummaryCountsProps {
    counts: DeskCounts;
}

export default function SummaryCounts({ counts }: SummaryCountsProps) {
    return (
        <div className="px-4 py-4 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-b border-slate-700/50">
            <div className="text-2xl font-bold text-white mb-2">
                未対応{" "}
                <span className="text-3xl bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                    {counts.unprocessedTotal}
                </span>
                <span className="text-lg font-normal text-slate-400 ml-1">件</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-red-400 font-medium">期限超過 {counts.overdue}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-orange-400 font-medium">今日中 {counts.dueToday}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-emerald-400 font-medium">新着 {counts.newItems}</span>
                </div>
            </div>
        </div>
    );
}
