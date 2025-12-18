// ドラピタ 企業管理画面APP - ダミーデータ

import { Application, DeskCounts, RiskLevel } from "./types";

const JOB_TITLES = [
    "大型ドライバー（長距離）",
    "中型ドライバー（地場配送）",
    "配送スタッフ（軽貨物）",
    "夜勤配送ドライバー",
    "ルート配送ドライバー",
    "引越しドライバー",
    "食品配送スタッフ",
    "宅配ドライバー",
];

const AREAS = [
    "東京都",
    "神奈川県",
    "埼玉県",
    "千葉県",
    "大阪府",
    "愛知県",
    null,
];

const HIGHLIGHTS_POOL = [
    "大型免許保有",
    "中型免許保有",
    "普通免許保有",
    "運送業経験5年以上",
    "運送業経験3年",
    "未経験",
    "フォークリフト資格",
    "危険物取扱者",
    "長距離運転経験あり",
    "夜勤経験あり",
    "即日勤務可能",
    "週5日勤務可",
];

const MEMOS = [
    "前職は物流会社で3年勤務",
    "体力に自信あり",
    "土日勤務希望",
    "早朝勤務可能",
    null,
    null,
    null,
];

function randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomHighlights(): string[] {
    const count = Math.floor(Math.random() * 3) + 1;
    const shuffled = [...HIGHLIGHTS_POOL].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function generateDate(daysAgo: number): string {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString();
}

function generateApplications(): Application[] {
    const applications: Application[] = [];
    let id = 1;

    // OVERDUE: 3件（unattendedDays=4〜10）
    for (let i = 0; i < 3; i++) {
        const unattendedDays = 4 + Math.floor(Math.random() * 7);
        applications.push({
            id: `app-${String(id++).padStart(3, "0")}`,
            companyId: "company-001",
            jobId: `job-${String(Math.floor(Math.random() * 8) + 1).padStart(3, "0")}`,
            jobTitle: randomItem(JOB_TITLES),
            candidateId: `cand-${String(id).padStart(3, "0")}`,
            candidateDisplayName: `候補者${String.fromCharCode(64 + id)}`,
            candidateArea: randomItem(AREAS),
            appliedAt: generateDate(unattendedDays),
            lastTouchedAt: null,
            status: "UNPROCESSED",
            holdUntil: null,
            slaDueAt: generateDate(-1), // 期限切れ
            riskLevel: "OVERDUE",
            unattendedDays,
            highlights: randomHighlights(),
            memo: randomItem(MEMOS),
        });
    }

    // TODAY: 8件（unattendedDays=1〜3）
    for (let i = 0; i < 8; i++) {
        const unattendedDays = 1 + Math.floor(Math.random() * 3);
        applications.push({
            id: `app-${String(id++).padStart(3, "0")}`,
            companyId: "company-001",
            jobId: `job-${String(Math.floor(Math.random() * 8) + 1).padStart(3, "0")}`,
            jobTitle: randomItem(JOB_TITLES),
            candidateId: `cand-${String(id).padStart(3, "0")}`,
            candidateDisplayName: `候補者${String.fromCharCode(64 + id)}`,
            candidateArea: randomItem(AREAS),
            appliedAt: generateDate(unattendedDays),
            lastTouchedAt: null,
            status: "UNPROCESSED",
            holdUntil: null,
            slaDueAt: generateDate(0), // 今日中
            riskLevel: "TODAY",
            unattendedDays,
            highlights: randomHighlights(),
            memo: randomItem(MEMOS),
        });
    }

    // NEW: 5件（unattendedDays=0）
    for (let i = 0; i < 5; i++) {
        applications.push({
            id: `app-${String(id++).padStart(3, "0")}`,
            companyId: "company-001",
            jobId: `job-${String(Math.floor(Math.random() * 8) + 1).padStart(3, "0")}`,
            jobTitle: randomItem(JOB_TITLES),
            candidateId: `cand-${String(id).padStart(3, "0")}`,
            candidateDisplayName: `候補者${String.fromCharCode(64 + id)}`,
            candidateArea: randomItem(AREAS),
            appliedAt: generateDate(0),
            lastTouchedAt: null,
            status: "UNPROCESSED",
            holdUntil: null,
            slaDueAt: generateDate(3),
            riskLevel: "NEW",
            unattendedDays: 0,
            highlights: randomHighlights(),
            memo: randomItem(MEMOS),
        });
    }

    // NORMAL: 9件（unattendedDays=1〜7）
    for (let i = 0; i < 9; i++) {
        const unattendedDays = 1 + Math.floor(Math.random() * 7);
        applications.push({
            id: `app-${String(id++).padStart(3, "0")}`,
            companyId: "company-001",
            jobId: `job-${String(Math.floor(Math.random() * 8) + 1).padStart(3, "0")}`,
            jobTitle: randomItem(JOB_TITLES),
            candidateId: `cand-${String(id).padStart(3, "0")}`,
            candidateDisplayName: `候補者${String.fromCharCode(64 + id)}`,
            candidateArea: randomItem(AREAS),
            appliedAt: generateDate(unattendedDays),
            lastTouchedAt: null,
            status: "UNPROCESSED",
            holdUntil: null,
            slaDueAt: generateDate(7 - unattendedDays),
            riskLevel: "NORMAL",
            unattendedDays,
            highlights: randomHighlights(),
            memo: randomItem(MEMOS),
        });
    }

    return applications;
}

// ソート: OVERDUE -> TODAY -> NEW -> NORMAL、同カテゴリ内はappliedAt古い順
function sortApplications(apps: Application[]): Application[] {
    const riskOrder: Record<RiskLevel, number> = {
        OVERDUE: 0,
        TODAY: 1,
        NEW: 2,
        NORMAL: 3,
    };

    return [...apps].sort((a, b) => {
        const riskDiff = riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
        if (riskDiff !== 0) return riskDiff;
        return new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime();
    });
}

// 初期データ生成
const rawApplications = generateApplications();
export const mockApplications = sortApplications(rawApplications);

export const mockDeskCounts: DeskCounts = {
    unprocessedTotal: 25,
    overdue: 3,
    dueToday: 8,
    newItems: 5,
};

export const companyName = "株式会社ドラピタ運送";
