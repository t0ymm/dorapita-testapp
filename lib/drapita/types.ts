// ドラピタ 企業管理画面APP - 型定義

export type RiskLevel = "OVERDUE" | "TODAY" | "NEW" | "NORMAL";
export type ApplicationStatus = "UNPROCESSED" | "OK" | "REJECT" | "HOLD";
export type ActionType = "OK" | "REJECT" | "HOLD";
export type ReasonCode = "COND_MISMATCH" | "NO_RESPONSE" | "OTHER";

export interface Application {
  id: string;
  companyId: string;
  jobId: string;
  jobTitle: string;
  candidateId: string;
  candidateDisplayName: string;
  candidateArea: string | null;
  appliedAt: string; // ISO datetime
  lastTouchedAt: string | null;
  status: ApplicationStatus;
  holdUntil: string | null;
  slaDueAt: string | null;
  riskLevel: RiskLevel;
  unattendedDays: number;
  highlights: string[]; // 最大3件
  memo: string | null; // 最大80文字
}

export interface DeskCounts {
  unprocessedTotal: number;
  overdue: number;
  dueToday: number;
  newItems: number;
}

export interface DeskResponse {
  counts: DeskCounts;
  items: Application[];
}

export interface ActionRequest {
  action: ActionType;
  reasonCode?: ReasonCode;
  holdHours?: 24 | 72 | null;
}

export interface ActionResponse {
  updated: Application;
  counts: DeskCounts;
}

export type FilterType = "all" | "overdue" | "today" | "new";
