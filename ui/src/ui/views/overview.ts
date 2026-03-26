import { html } from "lit";
import type { EventLogEntry } from "../app-events.ts";
import { formatCost, formatTokens } from "../format.ts";
import type { GatewayHelloOk } from "../gateway.ts";
import type { UiSettings } from "../storage.ts";
import type {
  AttentionItem,
  CronJob,
  CronStatus,
  SessionsListResult,
  SessionsUsageResult,
  SkillStatusReport,
} from "../types.ts";

export type OverviewProps = {
  connected: boolean;
  hello: GatewayHelloOk | null;
  settings: UiSettings;
  password: string;
  lastError: string | null;
  lastErrorCode: string | null;
  presenceCount: number;
  sessionsCount: number | null;
  cronEnabled: boolean | null;
  cronNext: number | null;
  lastChannelsRefresh: number | null;
  // New dashboard data
  usageResult: SessionsUsageResult | null;
  sessionsResult: SessionsListResult | null;
  skillsReport: SkillStatusReport | null;
  cronJobs: CronJob[];
  cronStatus: CronStatus | null;
  attentionItems: AttentionItem[];
  eventLog: EventLogEntry[];
  overviewLogLines: string[];
  showGatewayToken: boolean;
  showGatewayPassword: boolean;
  onSettingsChange: (next: UiSettings) => void;
  onPasswordChange: (next: string) => void;
  onSessionKeyChange: (next: string) => void;
  onToggleGatewayTokenVisibility: () => void;
  onToggleGatewayPasswordVisibility: () => void;
  onConnect: () => void;
  onRefresh: () => void;
  onNavigate: (tab: string) => void;
  onRefreshLogs: () => void;
};

export function renderOverview(props: OverviewProps) {
  const usageData = props.usageResult?.aggregates?.byAgent;

  if (!usageData) {
    return html`
      <section class="card">
        <div class="card-title" style="font-size: 1.5rem; margin-bottom: 8px;">Xếp hạng Chi phí Agent</div>
        <div class="card-sub" style="margin-bottom: 24px;">Đang tính toán thống kê...</div>
        <div class="ov-cards" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px;">
          ${[0, 1, 2, 3].map(
            (i) => html`
              <div class="ov-card" style="cursor:default; animation-delay:${i * 50}ms; min-height: 100px;">
                <span class="skeleton skeleton-line" style="width:100px; height:18px"></span>
                <span class="skeleton skeleton-stat" style="margin: 12px 0;"></span>
                <span class="skeleton skeleton-line skeleton-line--medium" style="height:12px"></span>
              </div>
            `,
          )}
        </div>
      </section>
    `;
  }

  // Sắp xếp Agent có chi phí từ cao xuống thấp
  const sortedAgents = [...usageData].toSorted((a, b) => b.totals.totalCost - a.totals.totalCost);

  return html`
    <section class="card usage-overview-card" style="box-shadow: none; border: none;">
      <div class="card-title" style="font-size: 1.5rem; color: var(--color-text); margin-bottom: 8px;">Xếp hạng Chi phí Agent</div>
      <div class="card-sub" style="margin-bottom: 24px; color: var(--color-muted);">Thống kê chi tiêu Tín dụng và Số lượt sử dụng của từng AI (Agent) trong ứng dụng.</div>

      <div class="ov-cards" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px;">
        ${
          sortedAgents.length === 0
            ? html`
                <div class="muted">Chưa có dữ liệu thống kê nào để hiển thị.</div>
              `
            : sortedAgents.map((agent) => {
                return html`
                <div class="ov-card" style="cursor: default; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 16px; transition: transform 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                  <div class="ov-card__label" style="font-weight: 700; font-size: 1.15rem; color: var(--color-primary); margin-bottom: 8px; text-transform: capitalize;">${
                    agent.agentId
                  }</div>
                  <div class="ov-card__value" style="color: var(--color-danger); font-size: 1.8rem; font-weight: 800; margin: 12px 0; font-family: 'Inter', sans-serif;">${formatCost(
                    agent.totals.totalCost,
                  )}</div>
                  <div class="ov-card__hint" style="display: flex; flex-direction: column; gap: 6px; font-size: 0.95rem; color: var(--color-text);">
                    <div style="display: flex; justify-content: space-between;">
                      <span class="muted">Tokens:</span>
                      <strong style="color: var(--color-text);">${formatTokens(agent.totals.totalTokens)}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                      <span class="muted">Lượt dùng:</span>
                      <strong style="color: var(--color-text);">${agent.count} tin nhắn</strong>
                    </div>
                  </div>
                </div>
              `;
              })
        }
      </div>
    </section>
  `;
}
