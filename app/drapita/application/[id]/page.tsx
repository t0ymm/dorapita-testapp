"use client";

import { useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import Header, { RiskBadge } from "@/components/drapita/Header";
import ActionConfirmModal from "@/components/drapita/ActionConfirmModal";
import { useToast } from "../../layout";
import {
    Application,
    ActionType,
    ReasonCode,
} from "@/lib/drapita/types";
import {
    mockApplications,
    mockDeskCounts,
    companyName,
} from "@/lib/drapita/mockData";
import {
    logApplicationView,
    logActionOpen,
    logActionCommit,
} from "@/lib/drapita/eventLogger";

export default function ApplicationDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const router = useRouter();
    const { showToast } = useToast();

    const [application, setApplication] = useState<Application | null>(null);
    const [loading, setLoading] = useState(true);
    const [counts, setCounts] = useState(mockDeskCounts);

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState<ActionType>("OK");
    const [actionStartTime, setActionStartTime] = useState<number>(0);

    useEffect(() => {
        // Simulate API call
        const loadData = async () => {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 300));

            const app = mockApplications.find((a) => a.id === id);
            setApplication(app || null);
            setLoading(false);

            if (app) {
                logApplicationView(app.id);
            }
        };

        loadData();
    }, [id]);

    const handleBack = () => {
        router.push("/drapita");
    };

    const handleAction = (action: ActionType) => {
        if (!application) return;

        setSelectedAction(action);
        setActionStartTime(Date.now());
        setModalOpen(true);

        logActionOpen(application.id, action);
    };

    const handleConfirmAction = useCallback(
        (options: {
            sendTemplate?: boolean;
            reasonCode?: ReasonCode;
            holdHours?: 24 | 72 | null;
        }) => {
            if (!application) return;

            // Log commit event
            const elapsedMs = Date.now() - actionStartTime;
            logActionCommit(application.id, selectedAction, elapsedMs);

            // Close modal and show toast
            setModalOpen(false);
            showToast("対応を完了しました");

            // Navigate back to Desk
            setTimeout(() => {
                router.push("/drapita");
            }, 300);
        },
        [application, selectedAction, actionStartTime, showToast, router]
    );

    const formattedDate = application
        ? new Date(application.appliedAt).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
        : "";

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header
                    companyName={companyName}
                    unprocessedCount={counts.unprocessedTotal}
                    showBack
                    onBack={handleBack}
                />
                <div className="flex-1 p-4 space-y-4">
                    <div className="h-8 bg-slate-800 rounded-lg w-32 animate-pulse" />
                    <div className="h-6 bg-slate-800 rounded w-48 animate-pulse" />
                    <div className="h-24 bg-slate-800 rounded-xl animate-pulse" />
                    <div className="h-32 bg-slate-800 rounded-xl animate-pulse" />
                </div>
            </div>
        );
    }

    if (!application) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header
                    companyName={companyName}
                    unprocessedCount={counts.unprocessedTotal}
                    showBack
                    onBack={handleBack}
                />
                <div className="flex-1 flex flex-col items-center justify-center px-4">
                    <p className="text-white font-medium mb-2">応募が見つかりません</p>
                    <button
                        onClick={handleBack}
                        className="px-6 py-3 bg-blue-500 text-white font-medium rounded-xl"
                    >
                        戻る
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header
                companyName={companyName}
                unprocessedCount={counts.unprocessedTotal}
                showBack
                onBack={handleBack}
            />

            {/* Content */}
            <div className="flex-1 overflow-y-auto pb-28">
                {/* Summary Section */}
                <div className="px-4 py-5 border-b border-slate-800">
                    <div className="flex items-center gap-3 mb-3">
                        <RiskBadge level={application.riskLevel} />
                        <span className="text-slate-300">
                            放置{" "}
                            <span
                                className={`font-bold ${application.unattendedDays >= 4
                                        ? "text-red-400"
                                        : application.unattendedDays >= 2
                                            ? "text-orange-400"
                                            : "text-white"
                                    }`}
                            >
                                {application.unattendedDays}日
                            </span>
                        </span>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-1">
                        {application.candidateDisplayName}
                    </h2>
                    {application.candidateArea && (
                        <p className="text-slate-400 mb-2">{application.candidateArea}</p>
                    )}
                    <p className="text-slate-300">{application.jobTitle}</p>
                    <p className="text-slate-500 text-sm mt-2">応募: {formattedDate}</p>
                </div>

                {/* Highlights Section */}
                <div className="px-4 py-5 border-b border-slate-800">
                    <h3 className="text-sm font-semibold text-slate-400 mb-3">
                        経歴ハイライト
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {application.highlights.map((highlight, index) => (
                            <span
                                key={index}
                                className="px-3 py-1.5 bg-blue-500/20 text-blue-300 text-sm rounded-full"
                            >
                                {highlight}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Memo Section */}
                {application.memo && (
                    <div className="px-4 py-5 border-b border-slate-800">
                        <h3 className="text-sm font-semibold text-slate-400 mb-3">メモ</h3>
                        <p className="text-slate-300">{application.memo}</p>
                    </div>
                )}

                {/* External Link */}
                <div className="px-4 py-5">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            console.log("[LINK] Opening web detail view");
                        }}
                        className="flex items-center justify-center gap-2 w-full py-3 border border-slate-700 rounded-xl text-slate-300 hover:bg-slate-800 transition-colors"
                    >
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
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                        </svg>
                        WEBで詳細を見る
                    </a>
                </div>
            </div>

            {/* Bottom Fixed Action */}
            <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-gradient-to-t from-slate-900 via-slate-900 to-transparent pt-8 pb-6 px-4">
                <div className="flex gap-3">
                    <button
                        onClick={() => handleAction("OK")}
                        className="flex-1 py-4 rounded-xl bg-emerald-500 text-white font-bold text-base
                       hover:bg-emerald-600 active:scale-95 transition-all duration-150 shadow-lg shadow-emerald-500/30"
                    >
                        OK
                    </button>
                    <button
                        onClick={() => handleAction("REJECT")}
                        className="flex-1 py-4 rounded-xl bg-red-500 text-white font-bold text-base
                       hover:bg-red-600 active:scale-95 transition-all duration-150 shadow-lg shadow-red-500/30"
                    >
                        見送り
                    </button>
                    <button
                        onClick={() => handleAction("HOLD")}
                        className="flex-1 py-4 rounded-xl bg-yellow-500 text-slate-900 font-bold text-base
                       hover:bg-yellow-600 active:scale-95 transition-all duration-150 shadow-lg shadow-yellow-500/30"
                    >
                        保留
                    </button>
                </div>
            </div>

            <ActionConfirmModal
                isOpen={modalOpen}
                actionType={selectedAction}
                candidateName={application.candidateDisplayName}
                onConfirm={handleConfirmAction}
                onCancel={() => setModalOpen(false)}
            />
        </div>
    );
}
