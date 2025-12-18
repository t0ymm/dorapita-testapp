"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/drapita/Header";
import SummaryCounts from "@/components/drapita/SummaryCounts";
import FilterChips from "@/components/drapita/FilterChips";
import ApplicationCard from "@/components/drapita/ApplicationCard";
import ActionConfirmModal from "@/components/drapita/ActionConfirmModal";
import { useToast } from "./layout";
import {
    Application,
    DeskCounts,
    FilterType,
    ActionType,
    ReasonCode,
} from "@/lib/drapita/types";
import {
    mockApplications,
    mockDeskCounts,
    companyName,
} from "@/lib/drapita/mockData";
import {
    logDeskView,
    logActionOpen,
    logActionCommit,
} from "@/lib/drapita/eventLogger";

type LoadingState = "loading" | "success" | "error" | "empty";

export default function DeskPage() {
    const router = useRouter();
    const { showToast } = useToast();

    const [loadingState, setLoadingState] = useState<LoadingState>("loading");
    const [applications, setApplications] = useState<Application[]>([]);
    const [counts, setCounts] = useState<DeskCounts>(mockDeskCounts);
    const [filter, setFilter] = useState<FilterType>("all");

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);
    const [selectedAction, setSelectedAction] = useState<ActionType>("OK");
    const [actionStartTime, setActionStartTime] = useState<number>(0);

    // Load data
    useEffect(() => {
        const loadData = async () => {
            setLoadingState("loading");
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 800));

            setApplications(mockApplications);
            setCounts(mockDeskCounts);
            setLoadingState(mockApplications.length > 0 ? "success" : "empty");

            // Log event
            logDeskView(mockDeskCounts);
        };

        loadData();
    }, []);

    // Filter applications
    const filteredApplications = applications.filter((app) => {
        if (filter === "all") return true;
        if (filter === "overdue") return app.riskLevel === "OVERDUE";
        if (filter === "today") return app.riskLevel === "TODAY";
        if (filter === "new") return app.riskLevel === "NEW";
        return true;
    });

    const filterCounts = {
        all: applications.length,
        overdue: applications.filter((a) => a.riskLevel === "OVERDUE").length,
        today: applications.filter((a) => a.riskLevel === "TODAY").length,
        new: applications.filter((a) => a.riskLevel === "NEW").length,
    };

    // Handlers
    const handleCardClick = (id: string) => {
        router.push(`/drapita/application/${id}`);
    };

    const handleAction = (id: string, action: ActionType) => {
        const app = applications.find((a) => a.id === id);
        if (!app) return;

        setSelectedApp(app);
        setSelectedAction(action);
        setActionStartTime(Date.now());
        setModalOpen(true);

        // Log event
        logActionOpen(id, action);
    };

    const handleConfirmAction = useCallback(
        (options: {
            sendTemplate?: boolean;
            reasonCode?: ReasonCode;
            holdHours?: 24 | 72 | null;
        }) => {
            if (!selectedApp) return;

            // Log commit event
            const elapsedMs = Date.now() - actionStartTime;
            logActionCommit(selectedApp.id, selectedAction, elapsedMs);

            // Remove from list (simulate API update)
            setApplications((prev) => prev.filter((a) => a.id !== selectedApp.id));

            // Update counts
            setCounts((prev) => ({
                ...prev,
                unprocessedTotal: prev.unprocessedTotal - 1,
                overdue:
                    selectedApp.riskLevel === "OVERDUE" ? prev.overdue - 1 : prev.overdue,
                dueToday:
                    selectedApp.riskLevel === "TODAY" ? prev.dueToday - 1 : prev.dueToday,
                newItems:
                    selectedApp.riskLevel === "NEW" ? prev.newItems - 1 : prev.newItems,
            }));

            // Close modal and show toast
            setModalOpen(false);
            setSelectedApp(null);
            showToast("対応を完了しました");
        },
        [selectedApp, selectedAction, actionStartTime, showToast]
    );

    const handleRetry = () => {
        setLoadingState("loading");
        setTimeout(() => {
            setApplications(mockApplications);
            setCounts(mockDeskCounts);
            setLoadingState("success");
        }, 800);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header companyName={companyName} unprocessedCount={counts.unprocessedTotal} />

            {loadingState === "loading" && (
                <div className="flex-1 flex flex-col">
                    <div className="px-4 py-4 animate-pulse">
                        <div className="h-8 bg-slate-800 rounded-lg w-48 mb-2" />
                        <div className="h-4 bg-slate-800 rounded w-64" />
                    </div>
                    <div className="px-4 py-3 flex gap-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-10 w-20 bg-slate-800 rounded-full animate-pulse" />
                        ))}
                    </div>
                    <div className="px-4 space-y-3 flex-1">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-40 bg-slate-800 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                </div>
            )}

            {loadingState === "error" && (
                <div className="flex-1 flex flex-col items-center justify-center px-4">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-white font-medium mb-2">読み込みに失敗しました</p>
                    <p className="text-slate-400 text-sm mb-6">ネットワークを確認してください</p>
                    <button
                        onClick={handleRetry}
                        className="px-6 py-3 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 transition-colors"
                    >
                        再試行
                    </button>
                </div>
            )}

            {loadingState === "empty" && (
                <div className="flex-1 flex flex-col items-center justify-center px-4">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <p className="text-white font-medium mb-2">未対応はありません</p>
                    <p className="text-slate-400 text-sm mb-6">すべての応募に対応済みです</p>
                    <button
                        onClick={handleRetry}
                        className="px-6 py-3 bg-slate-800 text-slate-300 font-medium rounded-xl hover:bg-slate-700 transition-colors"
                    >
                        更新
                    </button>
                </div>
            )}

            {loadingState === "success" && (
                <>
                    <SummaryCounts counts={counts} />
                    <FilterChips
                        selected={filter}
                        onSelect={setFilter}
                        counts={filterCounts}
                    />

                    <div className="flex-1 px-4 pb-6 space-y-3 overflow-y-auto">
                        {filteredApplications.length === 0 ? (
                            <div className="text-center py-12 text-slate-400">
                                該当する応募はありません
                            </div>
                        ) : (
                            filteredApplications.map((app) => (
                                <ApplicationCard
                                    key={app.id}
                                    application={app}
                                    onCardClick={handleCardClick}
                                    onAction={handleAction}
                                />
                            ))
                        )}
                    </div>
                </>
            )}

            <ActionConfirmModal
                isOpen={modalOpen}
                actionType={selectedAction}
                candidateName={selectedApp?.candidateDisplayName || ""}
                onConfirm={handleConfirmAction}
                onCancel={() => {
                    setModalOpen(false);
                    setSelectedApp(null);
                }}
            />
        </div>
    );
}
