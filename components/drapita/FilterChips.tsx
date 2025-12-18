"use client";

import { FilterType } from "@/lib/drapita/types";

interface FilterChipsProps {
    selected: FilterType;
    onSelect: (filter: FilterType) => void;
    counts: {
        all: number;
        overdue: number;
        today: number;
        new: number;
    };
}

export default function FilterChips({ selected, onSelect, counts }: FilterChipsProps) {
    const filters: { key: FilterType; label: string; count: number }[] = [
        { key: "all", label: "すべて", count: counts.all },
        { key: "overdue", label: "期限超過", count: counts.overdue },
        { key: "today", label: "今日中", count: counts.today },
        { key: "new", label: "新着", count: counts.new },
    ];

    return (
        <div className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
            {filters.map(({ key, label, count }) => (
                <button
                    key={key}
                    onClick={() => onSelect(key)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selected === key
                            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }`}
                >
                    {label}
                    <span
                        className={`ml-1.5 ${selected === key ? "text-blue-100" : "text-slate-500"
                            }`}
                    >
                        {count}
                    </span>
                </button>
            ))}
        </div>
    );
}
