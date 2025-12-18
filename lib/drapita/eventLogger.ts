// ドラピタ 企業管理画面APP - イベントログ

import { DeskCounts, ActionType } from "./types";

export function logDeskView(counts: DeskCounts): void {
    console.log("[EVENT] desk_view", {
        unprocessedTotal: counts.unprocessedTotal,
        overdue: counts.overdue,
        dueToday: counts.dueToday,
        newItems: counts.newItems,
        timestamp: new Date().toISOString(),
    });
}

export function logApplicationView(applicationId: string): void {
    console.log("[EVENT] application_view", {
        applicationId,
        timestamp: new Date().toISOString(),
    });
}

export function logActionOpen(applicationId: string, actionType: ActionType): void {
    console.log("[EVENT] action_open", {
        applicationId,
        actionType,
        timestamp: new Date().toISOString(),
    });
}

export function logActionCommit(
    applicationId: string,
    actionType: ActionType,
    elapsedMs: number
): void {
    console.log("[EVENT] action_commit", {
        applicationId,
        actionType,
        elapsedMs,
        timestamp: new Date().toISOString(),
    });
}

export function logPushOpen(source: string): void {
    console.log("[EVENT] push_open", {
        source,
        timestamp: new Date().toISOString(),
    });
}
