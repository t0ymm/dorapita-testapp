"use client";

import { ActionType, ReasonCode } from "@/lib/drapita/types";
import { useState } from "react";

interface ActionConfirmModalProps {
    isOpen: boolean;
    actionType: ActionType;
    candidateName: string;
    onConfirm: (options: {
        sendTemplate?: boolean;
        reasonCode?: ReasonCode;
        holdHours?: 24 | 72 | null;
    }) => void;
    onCancel: () => void;
}

export default function ActionConfirmModal({
    isOpen,
    actionType,
    candidateName,
    onConfirm,
    onCancel,
}: ActionConfirmModalProps) {
    const [sendTemplate, setSendTemplate] = useState(true);
    const [reasonCode, setReasonCode] = useState<ReasonCode | null>(null);
    const [holdHours, setHoldHours] = useState<24 | 72 | null>(24);

    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm({
            sendTemplate: actionType === "OK" ? sendTemplate : undefined,
            reasonCode: actionType === "REJECT" ? (reasonCode || undefined) : undefined,
            holdHours: actionType === "HOLD" ? holdHours : undefined,
        });
    };

    const actionConfig = {
        OK: {
            title: "採用選考を進めますか？",
            color: "emerald",
            buttonText: "OKで確定",
        },
        REJECT: {
            title: "見送りにしますか？",
            color: "red",
            buttonText: "見送りで確定",
        },
        HOLD: {
            title: "保留にしますか？",
            color: "yellow",
            buttonText: "保留で確定",
        },
    };

    const config = actionConfig[actionType];

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onCancel}
            />

            {/* Modal */}
            <div className="relative w-full max-w-[390px] bg-slate-900 rounded-t-3xl p-6 pb-8 animate-slideUp">
                <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-6" />

                <h2 className="text-xl font-bold text-white text-center mb-2">
                    {config.title}
                </h2>
                <p className="text-slate-400 text-center mb-6">{candidateName}</p>

                {/* OK: 返信テンプレート送信トグル */}
                {actionType === "OK" && (
                    <div
                        className="flex items-center justify-between bg-slate-800 rounded-xl p-4 mb-6"
                        onClick={() => setSendTemplate(!sendTemplate)}
                    >
                        <span className="text-white">返信テンプレを送る</span>
                        <div
                            className={`w-12 h-7 rounded-full transition-colors duration-200 relative ${sendTemplate ? "bg-emerald-500" : "bg-slate-600"
                                }`}
                        >
                            <div
                                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${sendTemplate ? "translate-x-6" : "translate-x-1"
                                    }`}
                            />
                        </div>
                    </div>
                )}

                {/* REJECT: 理由選択 */}
                {actionType === "REJECT" && (
                    <div className="space-y-2 mb-6">
                        <p className="text-slate-400 text-sm mb-3">理由（任意）</p>
                        {[
                            { code: "COND_MISMATCH" as ReasonCode, label: "条件不一致" },
                            { code: "NO_RESPONSE" as ReasonCode, label: "連絡がつかない" },
                            { code: "OTHER" as ReasonCode, label: "その他" },
                        ].map(({ code, label }) => (
                            <button
                                key={code}
                                onClick={() => setReasonCode(reasonCode === code ? null : code)}
                                className={`w-full py-3 px-4 rounded-xl text-left transition-all duration-150 ${reasonCode === code
                                        ? "bg-red-500/20 text-red-400 border border-red-500/50"
                                        : "bg-slate-800 text-slate-300 border border-transparent hover:bg-slate-700"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                )}

                {/* HOLD: 期限選択 */}
                {actionType === "HOLD" && (
                    <div className="mb-6">
                        <p className="text-slate-400 text-sm mb-3">保留期間</p>
                        <div className="flex gap-2">
                            {[
                                { hours: 24 as const, label: "24時間" },
                                { hours: 72 as const, label: "72時間" },
                                { hours: null, label: "指定なし" },
                            ].map(({ hours, label }) => (
                                <button
                                    key={label}
                                    onClick={() => setHoldHours(hours)}
                                    className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${holdHours === hours
                                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                                            : "bg-slate-800 text-slate-300 border border-transparent hover:bg-slate-700"
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-4 rounded-xl bg-slate-800 text-slate-300 font-semibold
                       hover:bg-slate-700 active:scale-95 transition-all duration-150"
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={`flex-1 py-4 rounded-xl font-semibold active:scale-95 transition-all duration-150 ${actionType === "OK"
                                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                                : actionType === "REJECT"
                                    ? "bg-red-500 text-white hover:bg-red-600"
                                    : "bg-yellow-500 text-slate-900 hover:bg-yellow-600"
                            }`}
                    >
                        {config.buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
}
