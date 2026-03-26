import { html, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { parseAgentSessionKey } from "../../../src/sessions/session-key-utils.js";
import { t } from "../i18n/index.ts";
import { refreshChat } from "./app-chat.ts";
import { syncUrlWithSessionKey } from "./app-settings.ts";
import type { AppViewState } from "./app-view-state.ts";
import { OpenClawApp } from "./app.ts";
import { createChatModelOverride } from "./chat-model-ref.ts";
import {
  resolveChatModelOverrideValue,
  resolveChatModelSelectState,
} from "./chat-model-select-state.ts";
import { cleanAutoTitleLabel } from "./chat/chat-title.ts";
import { ChatState, loadChatHistory } from "./controllers/chat.ts";
import { loadSessions } from "./controllers/sessions.ts";
import { icons } from "./icons.ts";
import { iconForTab, pathForTab, titleForTab, type Tab } from "./navigation.ts";
import { getProviderLogoSvg } from "./provider-logos.ts";
import type { ThemeTransitionContext } from "./theme-transition.ts";
import type { ThemeMode, ThemeName } from "./theme.ts";
import type { SessionsListResult } from "./types.ts";

type SessionDefaultsSnapshot = {
  mainSessionKey?: string;
  mainKey?: string;
};

function resolveSidebarChatSessionKey(state: AppViewState): string {
  const snapshot = state.hello?.snapshot as
    | { sessionDefaults?: SessionDefaultsSnapshot }
    | undefined;
  const mainSessionKey = snapshot?.sessionDefaults?.mainSessionKey?.trim();
  if (mainSessionKey) {
    return mainSessionKey;
  }
  const mainKey = snapshot?.sessionDefaults?.mainKey?.trim();
  if (mainKey) {
    return mainKey;
  }
  return "main";
}

function resetChatStateForSessionSwitch(state: AppViewState, sessionKey: string) {
  state.sessionKey = sessionKey;
  state.chatMessage = "";
  state.chatStream = null;
  (state as unknown as OpenClawApp).chatStreamStartedAt = null;
  state.chatRunId = null;
  (state as unknown as OpenClawApp).resetToolStream();
  (state as unknown as OpenClawApp).resetChatScroll();
  state.applySettings({
    ...state.settings,
    sessionKey,
    lastActiveSessionKey: sessionKey,
  });
}

export function renderTab(state: AppViewState, tab: Tab, opts?: { collapsed?: boolean }) {
  const href = pathForTab(tab, state.basePath);
  const isActive = state.tab === tab;
  const collapsed = opts?.collapsed ?? state.settings.navCollapsed;
  return html`
    <a
      href=${href}
      class="nav-item ${isActive ? "nav-item--active" : ""}"
      @click=${(event: MouseEvent) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        event.preventDefault();
        if (tab === "chat") {
          const mainSessionKey = resolveSidebarChatSessionKey(state);
          if (state.sessionKey !== mainSessionKey) {
            resetChatStateForSessionSwitch(state, mainSessionKey);
            void state.loadAssistantIdentity();
          }
        }
        state.setTab(tab);
      }}
      title=${titleForTab(tab)}
    >
      <span class="nav-item__icon" aria-hidden="true">${icons[iconForTab(tab)]}</span>
      ${!collapsed ? html`<span class="nav-item__text">${titleForTab(tab)}</span>` : nothing}
    </a>
  `;
}

export function renderChatSessionSelect(state: AppViewState) {
  const sessionGroups = resolveSessionOptionGroups(state, state.sessionKey, state.sessionsResult);
  const modelSelect = renderChatModelSelect(state);
  return html`
    <div class="chat-controls__session-row">
      <label class="field chat-controls__session">
        <select
          .value=${state.sessionKey}
          ?disabled=${!state.connected || sessionGroups.length === 0}
          @change=${(e: Event) => {
            const next = (e.target as HTMLSelectElement).value;
            if (state.sessionKey === next) {
              return;
            }
            switchChatSession(state, next);
          }}
        >
          ${repeat(
            sessionGroups,
            (group) => group.id,
            (group) =>
              html`<optgroup label=${group.label}>
                ${repeat(
                  group.options,
                  (entry) => entry.key,
                  (entry) =>
                    html`<option value=${entry.key} title=${entry.title}>
                      ${entry.label}
                    </option>`,
                )}
              </optgroup>`,
          )}
        </select>
      </label>
      ${modelSelect}
    </div>
  `;
}

export function renderChatControls(state: AppViewState) {
  const disableThinkingToggle = state.onboarding;
  const showThinking = state.onboarding ? false : state.settings.chatShowThinking;
  const showToolCalls = state.onboarding ? true : state.settings.chatShowToolCalls;
  const toolCallsIcon = html`
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      ></path>
    </svg>
  `;
  const refreshIcon = html`
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
      <path d="M21 3v5h-5"></path>
    </svg>
  `;
  return html`
    <div class="chat-controls">
      <button
        class="btn btn--sm btn--icon"
        ?disabled=${state.chatLoading || !state.connected}
        @click=${async () => {
          const app = state as unknown as OpenClawApp;
          app.chatManualRefreshInFlight = true;
          app.chatNewMessagesBelow = false;
          await app.updateComplete;
          app.resetToolStream();
          try {
            await refreshChat(state as unknown as Parameters<typeof refreshChat>[0], {
              scheduleScroll: false,
            });
            app.scrollToBottom({ smooth: true });
          } finally {
            requestAnimationFrame(() => {
              app.chatManualRefreshInFlight = false;
              app.chatNewMessagesBelow = false;
            });
          }
        }}
        title=${t("chat.refreshTitle")}
      >
        ${refreshIcon}
      </button>
      <span class="chat-controls__separator">|</span>
      <button
        class="btn btn--sm btn--icon ${showThinking ? "active" : ""}"
        ?disabled=${disableThinkingToggle}
        @click=${() => {
          if (disableThinkingToggle) {
            return;
          }
          state.applySettings({
            ...state.settings,
            chatShowThinking: !state.settings.chatShowThinking,
          });
        }}
        aria-pressed=${showThinking}
        title=${disableThinkingToggle ? t("chat.onboardingDisabled") : t("chat.thinkingToggle")}
      >
        ${icons.brain}
      </button>
      <button
        class="btn btn--sm btn--icon ${showToolCalls ? "active" : ""}"
        ?disabled=${disableThinkingToggle}
        @click=${() => {
          if (disableThinkingToggle) {
            return;
          }
          state.applySettings({
            ...state.settings,
            chatShowToolCalls: !state.settings.chatShowToolCalls,
          });
        }}
        aria-pressed=${showToolCalls}
        title=${disableThinkingToggle ? t("chat.onboardingDisabled") : t("chat.toolCallsToggle")}
      >
        ${toolCallsIcon}
      </button>
    </div>
  `;
}

/**
 * Mobile-only gear toggle + dropdown for chat controls.
 * Rendered in the topbar so it doesn't consume content-header space.
 * Hidden on desktop via CSS.
 */
export function renderChatMobileToggle(state: AppViewState) {
  const sessionGroups = resolveSessionOptionGroups(state, state.sessionKey, state.sessionsResult);
  const disableThinkingToggle = state.onboarding;
  const disableFocusToggle = state.onboarding;
  const showThinking = state.onboarding ? false : state.settings.chatShowThinking;
  const showToolCalls = state.onboarding ? true : state.settings.chatShowToolCalls;
  const focusActive = state.onboarding ? true : state.settings.chatFocusMode;
  const toolCallsIcon = html`
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      ></path>
    </svg>
  `;
  const focusIcon = html`
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M4 7V4h3"></path>
      <path d="M20 7V4h-3"></path>
      <path d="M4 17v3h3"></path>
      <path d="M20 17v3h-3"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  `;

  return html`
    <div class="chat-mobile-controls-wrapper">
      <button
        class="btn btn--sm btn--icon chat-controls-mobile-toggle"
        @click=${(e: Event) => {
          e.stopPropagation();
          const btn = e.currentTarget as HTMLElement;
          const dropdown = btn.nextElementSibling as HTMLElement;
          if (dropdown) {
            const isOpen = dropdown.classList.toggle("open");
            if (isOpen) {
              const close = () => {
                dropdown.classList.remove("open");
                document.removeEventListener("click", close);
              };
              setTimeout(() => document.addEventListener("click", close, { once: true }), 0);
            }
          }
        }}
        title="Chat settings"
        aria-label="Chat settings"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>
      <div class="chat-controls-dropdown" @click=${(e: Event) => {
        e.stopPropagation();
      }}>
        <div class="chat-controls">
          <label class="field chat-controls__session">
            <select
              .value=${state.sessionKey}
              @change=${(e: Event) => {
                const next = (e.target as HTMLSelectElement).value;
                switchChatSession(state, next);
              }}
            >
              ${sessionGroups.map(
                (group) => html`
                  <optgroup label=${group.label}>
                    ${group.options.map(
                      (opt) => html`
                        <option value=${opt.key} title=${opt.title}>
                          ${opt.label}
                        </option>
                      `,
                    )}
                  </optgroup>
                `,
              )}
            </select>
          </label>
          <div class="chat-controls__thinking">
            <button
              class="btn btn--sm btn--icon ${showThinking ? "active" : ""}"
              ?disabled=${disableThinkingToggle}
              @click=${() => {
                if (!disableThinkingToggle) {
                  state.applySettings({
                    ...state.settings,
                    chatShowThinking: !state.settings.chatShowThinking,
                  });
                }
              }}
              aria-pressed=${showThinking}
              title=${t("chat.thinkingToggle")}
            >
              ${icons.brain}
            </button>
            <button
              class="btn btn--sm btn--icon ${showToolCalls ? "active" : ""}"
              ?disabled=${disableThinkingToggle}
              @click=${() => {
                if (!disableThinkingToggle) {
                  state.applySettings({
                    ...state.settings,
                    chatShowToolCalls: !state.settings.chatShowToolCalls,
                  });
                }
              }}
              aria-pressed=${showToolCalls}
              title=${t("chat.toolCallsToggle")}
            >
              ${toolCallsIcon}
            </button>
            <button
              class="btn btn--sm btn--icon ${focusActive ? "active" : ""}"
              ?disabled=${disableFocusToggle}
              @click=${() => {
                if (!disableFocusToggle) {
                  state.applySettings({
                    ...state.settings,
                    chatFocusMode: !state.settings.chatFocusMode,
                  });
                }
              }}
              aria-pressed=${focusActive}
              title=${t("chat.focusToggle")}
            >
              ${focusIcon}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function switchChatSession(state: AppViewState, nextSessionKey: string) {
  state.sessionKey = nextSessionKey;
  state.chatMessage = "";
  state.chatStream = null;
  // P1: Clear queued chat items from the previous session
  (state as unknown as { chatQueue: unknown[] }).chatQueue = [];
  (state as unknown as OpenClawApp).chatStreamStartedAt = null;
  state.chatRunId = null;
  (state as unknown as OpenClawApp).resetToolStream();
  (state as unknown as OpenClawApp).resetChatScroll();
  state.applySettings({
    ...state.settings,
    sessionKey: nextSessionKey,
    lastActiveSessionKey: nextSessionKey,
  });
  void state.loadAssistantIdentity();
  syncUrlWithSessionKey(
    state as unknown as Parameters<typeof syncUrlWithSessionKey>[0],
    nextSessionKey,
    true,
  );
  void loadChatHistory(state as unknown as ChatState);
  void refreshSessionOptions(state);
}

async function refreshSessionOptions(state: AppViewState) {
  await loadSessions(state as unknown as Parameters<typeof loadSessions>[0], {
    activeMinutes: 0,
    limit: 0,
    includeGlobal: true,
    includeUnknown: true,
  });
}

function renderChatModelSelect(state: AppViewState) {
  const { currentOverride, defaultLabel, options } = resolveChatModelSelectState(state);
  const busy =
    state.chatLoading || state.chatSending || Boolean(state.chatRunId) || state.chatStream !== null;
  const disabled =
    !state.connected || busy || (state.chatModelsLoading && options.length === 0) || !state.client;
  return html`
    <label class="field chat-controls__session chat-controls__model">
      <select
        data-chat-model-select="true"
        aria-label="Chat model"
        ?disabled=${disabled}
        @change=${async (e: Event) => {
          const next = (e.target as HTMLSelectElement).value.trim();
          await switchChatModel(state, next);
        }}
      >
        <option value="" ?selected=${currentOverride === ""}>${defaultLabel}</option>
        ${repeat(
          options,
          (entry) => entry.value,
          (entry) =>
            html`<option value=${entry.value} ?selected=${entry.value === currentOverride}>
              ${entry.label}
            </option>`,
        )}
      </select>
    </label>
  `;
}

async function switchChatModel(state: AppViewState, nextModel: string) {
  if (!state.client || !state.connected) {
    return;
  }
  const currentOverride = resolveChatModelOverrideValue(state);
  if (currentOverride === nextModel) {
    return;
  }
  const targetSessionKey = state.sessionKey;
  const prevOverride = state.chatModelOverrides[targetSessionKey];
  state.lastError = null;
  // Write the override cache immediately so the picker stays in sync during the RPC round-trip.
  state.chatModelOverrides = {
    ...state.chatModelOverrides,
    [targetSessionKey]: createChatModelOverride(nextModel),
  };
  try {
    await state.client.request("sessions.patch", {
      key: targetSessionKey,
      model: nextModel || null,
    });
    await refreshSessionOptions(state);
  } catch (err) {
    // Roll back so the picker reflects the actual server model.
    state.chatModelOverrides = { ...state.chatModelOverrides, [targetSessionKey]: prevOverride };
    state.lastError = `Failed to set model: ${String(err)}`;
  }
}

/* ── Channel display labels ────────────────────────────── */
const CHANNEL_LABELS: Record<string, string> = {
  bluebubbles: "iMessage",
  telegram: "Telegram",
  discord: "Discord",
  signal: "Signal",
  slack: "Slack",
  whatsapp: "WhatsApp",
  matrix: "Matrix",
  email: "Email",
  sms: "SMS",
};

const KNOWN_CHANNEL_KEYS = Object.keys(CHANNEL_LABELS);

/** Parsed type / context extracted from a session key. */
export type SessionKeyInfo = {
  /** Prefix for typed sessions (Subagent:/Cron:). Empty for others. */
  prefix: string;
  /** Human-readable fallback when no label / displayName is available. */
  fallbackName: string;
};

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Parse a session key to extract type information and a human-readable
 * fallback display name.  Exported for testing.
 */
export function parseSessionKey(key: string): SessionKeyInfo {
  const normalized = key.toLowerCase();

  // ── Main session ─────────────────────────────────
  if (key === "main" || key === "agent:main:main") {
    return { prefix: "", fallbackName: "Main Session" };
  }

  // ── Subagent ─────────────────────────────────────
  if (key.includes(":subagent:")) {
    return { prefix: "Subagent:", fallbackName: "Subagent:" };
  }

  // ── Cron job ─────────────────────────────────────
  if (normalized.startsWith("cron:") || key.includes(":cron:")) {
    return { prefix: "Cron:", fallbackName: "Cron Job:" };
  }

  // ── Direct chat  (agent:<x>:<channel>:direct:<id>) ──
  const directMatch = key.match(/^agent:[^:]+:([^:]+):direct:(.+)$/);
  if (directMatch) {
    const channel = directMatch[1];
    const identifier = directMatch[2];
    const channelLabel = CHANNEL_LABELS[channel] ?? capitalize(channel);
    return { prefix: "", fallbackName: `${channelLabel} · ${identifier}` };
  }

  // ── Group chat  (agent:<x>:<channel>:group:<id>) ────
  const groupMatch = key.match(/^agent:[^:]+:([^:]+):group:(.+)$/);
  if (groupMatch) {
    const channel = groupMatch[1];
    const channelLabel = CHANNEL_LABELS[channel] ?? capitalize(channel);
    return { prefix: "", fallbackName: `${channelLabel} Group` };
  }

  // ── Channel-prefixed legacy keys (e.g. "bluebubbles:g-…") ──
  for (const ch of KNOWN_CHANNEL_KEYS) {
    if (key === ch || key.startsWith(`${ch}:`)) {
      return { prefix: "", fallbackName: `${CHANNEL_LABELS[ch]} Session` };
    }
  }

  // ── Unknown — return key as-is ───────────────────
  return { prefix: "", fallbackName: key };
}

export function resolveSessionDisplayName(
  key: string,
  row?: SessionsListResult["sessions"][number],
): string {
  const label = row?.label?.trim() || "";
  const displayName = row?.displayName?.trim() || "";
  const { prefix, fallbackName } = parseSessionKey(key);

  const applyTypedPrefix = (name: string): string => {
    if (!prefix) {
      return name;
    }
    const prefixPattern = new RegExp(`^${prefix.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}\\s*`, "i");
    return prefixPattern.test(name) ? name : `${prefix} ${name}`;
  };

  if (label && label !== key) {
    return applyTypedPrefix(label);
  }
  if (displayName && displayName !== key) {
    return applyTypedPrefix(displayName);
  }
  return fallbackName;
}

export function isCronSessionKey(key: string): boolean {
  const normalized = key.trim().toLowerCase();
  if (!normalized) {
    return false;
  }
  if (normalized.startsWith("cron:")) {
    return true;
  }
  if (!normalized.startsWith("agent:")) {
    return false;
  }
  const parts = normalized.split(":").filter(Boolean);
  if (parts.length < 3) {
    return false;
  }
  const rest = parts.slice(2).join(":");
  return rest.startsWith("cron:");
}

type SessionOptionEntry = {
  key: string;
  label: string;
  scopeLabel: string;
  title: string;
};

type SessionOptionGroup = {
  id: string;
  label: string;
  options: SessionOptionEntry[];
};

export function resolveSessionOptionGroups(
  state: AppViewState,
  sessionKey: string,
  sessions: SessionsListResult | null,
): SessionOptionGroup[] {
  const rows = sessions?.sessions ?? [];
  const hideCron = state.sessionsHideCron ?? true;
  const byKey = new Map<string, SessionsListResult["sessions"][number]>();
  for (const row of rows) {
    byKey.set(row.key, row);
  }

  const seenKeys = new Set<string>();
  const groups = new Map<string, SessionOptionGroup>();
  const ensureGroup = (groupId: string, label: string): SessionOptionGroup => {
    const existing = groups.get(groupId);
    if (existing) {
      return existing;
    }
    const created: SessionOptionGroup = {
      id: groupId,
      label,
      options: [],
    };
    groups.set(groupId, created);
    return created;
  };

  const addOption = (key: string) => {
    if (!key || seenKeys.has(key)) {
      return;
    }
    seenKeys.add(key);
    const row = byKey.get(key);
    const parsed = parseAgentSessionKey(key);
    const group = parsed
      ? ensureGroup(
          `agent:${parsed.agentId.toLowerCase()}`,
          resolveAgentGroupLabel(state, parsed.agentId),
        )
      : ensureGroup("other", "Other Sessions");
    const scopeLabel = parsed?.rest?.trim() || key;
    const label = resolveSessionScopedOptionLabel(key, row, parsed?.rest);
    group.options.push({
      key,
      label,
      scopeLabel,
      title: key,
    });
  };

  for (const row of rows) {
    if (row.key !== sessionKey && (row.kind === "global" || row.kind === "unknown")) {
      continue;
    }
    if (hideCron && row.key !== sessionKey && isCronSessionKey(row.key)) {
      continue;
    }
    addOption(row.key);
  }
  addOption(sessionKey);

  for (const group of groups.values()) {
    const counts = new Map<string, number>();
    for (const option of group.options) {
      counts.set(option.label, (counts.get(option.label) ?? 0) + 1);
    }
    for (const option of group.options) {
      if ((counts.get(option.label) ?? 0) > 1 && option.scopeLabel !== option.label) {
        option.label = `${option.label} · ${option.scopeLabel}`;
      }
    }
  }

  const allOptions = Array.from(groups.values()).flatMap((group) =>
    group.options.map((option) => ({ groupLabel: group.label, option })),
  );
  const labels = new Map(allOptions.map(({ option }) => [option, option.label]));
  const countAssignedLabels = () => {
    const counts = new Map<string, number>();
    for (const { option } of allOptions) {
      const label = labels.get(option) ?? option.label;
      counts.set(label, (counts.get(label) ?? 0) + 1);
    }
    return counts;
  };
  const labelIncludesScopeLabel = (label: string, scopeLabel: string) => {
    const trimmedScope = scopeLabel.trim();
    if (!trimmedScope) {
      return false;
    }
    return (
      label === trimmedScope ||
      label.endsWith(` · ${trimmedScope}`) ||
      label.endsWith(` / ${trimmedScope}`)
    );
  };

  const globalCounts = countAssignedLabels();
  for (const { groupLabel, option } of allOptions) {
    const currentLabel = labels.get(option) ?? option.label;
    if ((globalCounts.get(currentLabel) ?? 0) <= 1) {
      continue;
    }
    const scopedPrefix = `${groupLabel} / `;
    if (currentLabel.startsWith(scopedPrefix)) {
      continue;
    }
    // Keep the agent visible once the native select collapses to a single chosen label.
    labels.set(option, `${groupLabel} / ${currentLabel}`);
  }

  const scopedCounts = countAssignedLabels();
  for (const { option } of allOptions) {
    const currentLabel = labels.get(option) ?? option.label;
    if ((scopedCounts.get(currentLabel) ?? 0) <= 1) {
      continue;
    }
    if (labelIncludesScopeLabel(currentLabel, option.scopeLabel)) {
      continue;
    }
    labels.set(option, `${currentLabel} · ${option.scopeLabel}`);
  }

  const finalCounts = countAssignedLabels();
  for (const { option } of allOptions) {
    const currentLabel = labels.get(option) ?? option.label;
    if ((finalCounts.get(currentLabel) ?? 0) <= 1) {
      continue;
    }
    // Fall back to the full key only when every friendlier disambiguator still collides.
    labels.set(option, `${currentLabel} · ${option.key}`);
  }

  for (const { option } of allOptions) {
    option.label = labels.get(option) ?? option.label;
  }

  return Array.from(groups.values());
}

function resolveAgentGroupLabel(state: AppViewState, agentIdRaw: string): string {
  const normalized = agentIdRaw.trim().toLowerCase();
  const agent = (state.agentsList?.agents ?? []).find(
    (entry) => entry.id.trim().toLowerCase() === normalized,
  );
  const name = agent?.identity?.name?.trim() || agent?.name?.trim() || "";
  return name && name !== agentIdRaw ? `${name} (${agentIdRaw})` : agentIdRaw;
}

function resolveSessionScopedOptionLabel(
  key: string,
  row?: SessionsListResult["sessions"][number],
  rest?: string,
) {
  const base = rest?.trim() || key;
  if (!row) {
    return base;
  }

  const label = row.label?.trim() || "";
  const displayName = row.displayName?.trim() || "";
  if ((label && label !== key) || (displayName && displayName !== key)) {
    return resolveSessionDisplayName(key, row);
  }

  return base;
}

type ThemeOption = { id: ThemeName; label: string; icon: string };
const THEME_OPTIONS: ThemeOption[] = [
  { id: "claw", label: "Claw", icon: "🦀" },
  { id: "knot", label: "Knot", icon: "🪢" },
  { id: "dash", label: "Dash", icon: "📊" },
];

type ThemeModeOption = { id: ThemeMode; label: string; short: string };
const THEME_MODE_OPTIONS: ThemeModeOption[] = [
  { id: "system", label: "System", short: "SYS" },
  { id: "light", label: "Light", short: "LIGHT" },
  { id: "dark", label: "Dark", short: "DARK" },
];

function currentThemeIcon(theme: ThemeName): string {
  return THEME_OPTIONS.find((o) => o.id === theme)?.icon ?? "🎨";
}

export function renderTopbarThemeModeToggle(state: AppViewState) {
  const modeIcon = (mode: ThemeMode) => {
    if (mode === "system") {
      return icons.monitor;
    }
    if (mode === "light") {
      return icons.sun;
    }
    return icons.moon;
  };

  const applyMode = (mode: ThemeMode, e: Event) => {
    if (mode === state.themeMode) {
      return;
    }
    state.setThemeMode(mode, { element: e.currentTarget as HTMLElement });
  };

  return html`
    <div class="topbar-theme-mode" role="group" aria-label="Color mode">
      ${THEME_MODE_OPTIONS.map(
        (opt) => html`
          <button
            type="button"
            class="topbar-theme-mode__btn ${opt.id === state.themeMode ? "topbar-theme-mode__btn--active" : ""}"
            title=${opt.label}
            aria-label="Color mode: ${opt.label}"
            aria-pressed=${opt.id === state.themeMode}
            @click=${(e: Event) => applyMode(opt.id, e)}
          >
            ${modeIcon(opt.id)}
          </button>
        `,
      )}
    </div>
  `;
}

export function renderSidebarConnectionStatus(state: AppViewState) {
  const label = state.connected ? t("common.online") : t("common.offline");
  const toneClass = state.connected
    ? "sidebar-connection-status--online"
    : "sidebar-connection-status--offline";

  return html`
    <span
      class="sidebar-version__status ${toneClass}"
      role="img"
      aria-live="polite"
      aria-label="Gateway status: ${label}"
      title="Gateway status: ${label}"
    ></span>
  `;
}

export function renderThemeToggle(state: AppViewState) {
  const setOpen = (orb: HTMLElement, nextOpen: boolean) => {
    orb.classList.toggle("theme-orb--open", nextOpen);
    const trigger = orb.querySelector<HTMLButtonElement>(".theme-orb__trigger");
    const menu = orb.querySelector<HTMLElement>(".theme-orb__menu");
    if (trigger) {
      trigger.setAttribute("aria-expanded", nextOpen ? "true" : "false");
    }
    if (menu) {
      menu.setAttribute("aria-hidden", nextOpen ? "false" : "true");
    }
  };

  const toggleOpen = (e: Event) => {
    const orb = (e.currentTarget as HTMLElement).closest<HTMLElement>(".theme-orb");
    if (!orb) {
      return;
    }
    const isOpen = orb.classList.contains("theme-orb--open");
    if (isOpen) {
      setOpen(orb, false);
    } else {
      setOpen(orb, true);
      const close = (ev: MouseEvent) => {
        if (!orb.contains(ev.target as Node)) {
          setOpen(orb, false);
          document.removeEventListener("click", close);
        }
      };
      requestAnimationFrame(() => document.addEventListener("click", close));
    }
  };

  const pick = (opt: ThemeOption, e: Event) => {
    const orb = (e.currentTarget as HTMLElement).closest<HTMLElement>(".theme-orb");
    if (orb) {
      setOpen(orb, false);
    }
    if (opt.id !== state.theme) {
      const context: ThemeTransitionContext = { element: orb ?? undefined };
      state.setTheme(opt.id, context);
    }
  };

  return html`
    <div class="theme-orb" aria-label="Theme">
      <button
        type="button"
        class="theme-orb__trigger"
        title="Theme"
        aria-haspopup="menu"
        aria-expanded="false"
        @click=${toggleOpen}
      >${currentThemeIcon(state.theme)}</button>
      <div class="theme-orb__menu" role="menu" aria-hidden="true">
        ${THEME_OPTIONS.map(
          (opt) => html`
            <button
              type="button"
              class="theme-orb__option ${opt.id === state.theme ? "theme-orb__option--active" : ""}"
              title=${opt.label}
              role="menuitemradio"
              aria-checked=${opt.id === state.theme}
              aria-label=${opt.label}
              @click=${(e: Event) => pick(opt, e)}
            >${opt.icon}</button>`,
        )}
      </div>
    </div>
  `;
}

export const formatModelName = (rawLabel: string): string => {
  if (!rawLabel) {
    return "";
  }
  let clean = rawLabel.replace(/\s*·\s*[a-zA-Z0-9_-]+$/, "");
  const matchObj = clean.match(/\((.*?)\)/);
  if (matchObj) {
    clean = matchObj[1];
  }

  const id = clean.toLowerCase();

  if (id.includes("claude-3-5-sonnet")) {
    return "Claude 3.5 Sonnet";
  }
  if (id.includes("claude-3-5-haiku")) {
    return "Claude 3.5 Haiku";
  }
  if (id.includes("claude-3-opus")) {
    return "Claude 3 Opus";
  }
  if (id.includes("claude-3-sonnet")) {
    return "Claude 3 Sonnet";
  }
  if (id.includes("claude-3-haiku")) {
    return "Claude 3 Haiku";
  }

  if (id.includes("gpt-4o-mini")) {
    return "GPT-4o mini";
  }
  if (id.includes("gpt-4o")) {
    return "GPT-4o";
  }
  if (id.includes("gpt-4-turbo")) {
    return "GPT-4 Turbo";
  }
  if (id.includes("gpt-4")) {
    return "GPT-4";
  }
  if (id.includes("o1-mini")) {
    return "o1-mini";
  }
  if (id.includes("o1-preview") || id === "o1") {
    return "OpenAI o1";
  }

  if (id.includes("gemini-1.5-pro")) {
    return "Gemini 1.5 Pro";
  }
  if (id.includes("gemini-1.5-flash")) {
    return "Gemini 1.5 Flash";
  }
  if (id.includes("gemini-2.0-flash")) {
    return "Gemini 2.0 Flash";
  }
  if (id.includes("gemini-pro")) {
    return "Gemini Pro";
  }

  if (id.includes("llama-3.1") && id.includes("405b")) {
    return "Llama 3.1 405B";
  }
  if (id.includes("llama-3.1") && id.includes("70b")) {
    return "Llama 3.1 70B";
  }
  if (id.includes("llama-3.1") && id.includes("8b")) {
    return "Llama 3.1";
  }

  if (id.includes("mixtral-8x7b")) {
    return "Mixtral 8x7B";
  }
  if (id.includes("deepseek-coder")) {
    return "DeepSeek Coder";
  }

  return clean
    .replace(/-[0-9]{8}$/, "")
    .replace(/-preview|-exp|-latest|-vision/g, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

/**
 * Chat header kiểu Zalo: hiển thị avatar + tên agent đang chat,
 * kèm model đang dùng ở dòng phụ.
 */
export function renderChatAgentHeader(state: AppViewState) {
  const agents = state.agentsList?.agents ?? [];
  const parsed = parseAgentSessionKey(state.sessionKey);
  const agentId = parsed?.agentId ?? state.agentsList?.defaultId ?? "main";
  const agent = agents.find((a) => a.id === agentId);

  const { defaultLabel } = resolveChatModelSelectState(state);
  const shortModelLabel = formatModelName(defaultLabel || "")
    .split(" · ")[0]
    .trim();

  const getAgentDisplayName = (id: string, rawName?: string | null): string => {
    const trimmed = rawName?.trim();
    if (trimmed && trimmed !== "main") {
      return trimmed;
    }
    if (id === "main") {
      return shortModelLabel || "Trợ lý hệ thống";
    }
    return id;
  };

  const agentName = getAgentDisplayName(agentId, agent?.identity?.name ?? agent?.name);
  const avatarUrl = agent?.identity?.avatarUrl?.trim() || null;

  const sessions = state.sessionsResult?.sessions ?? [];
  const currentSession = sessions.find((s) => s.key === state.sessionKey);
  const rawLabel = (currentSession as unknown as { label?: string })?.label;
  const displayTitle =
    cleanAutoTitleLabel(rawLabel) ||
    state.sessionKey.replace(/^agent:[^:]+:/, "").replace(/^main$/, "Hội thoại chính");

  const modelLabel = shortModelLabel;

  return html`
    <div class="chat-agent-header">
      <div class="chat-agent-header__avatar">
        ${
          avatarUrl
            ? html`<img src=${avatarUrl} alt=${agentName} class="chat-agent-header__avatar-img" />`
            : html`<div class="chat-agent-header__avatar-placeholder">${getProviderLogoSvg(modelLabel) || agentName.charAt(0).toUpperCase()}</div>`
        }
        <span class="chat-agent-header__status-dot"></span>
      </div>
      <div class="chat-agent-header__info">
        <span class="chat-agent-header__name">${displayTitle}</span>
        ${modelLabel ? html`<span class="chat-agent-header__model">${modelLabel}</span>` : nothing}
      </div>
    </div>
  `;
}

/**
 * Panel danh sách agent bên trái, kiểu cột chat Zalo.
 * Chỉ hiện các agent đã kết nối API thành công (có model catalog).
 */
export function renderChatAgentList(state: AppViewState, onAgentSelect: (agentId: string) => void) {
  const agents = state.agentsList?.agents ?? [];

  // Lấy agentId đang active
  const parsed = parseAgentSessionKey(state.sessionKey);
  const currentAgentId = parsed?.agentId ?? state.agentsList?.defaultId ?? "main";

  // Lọc agent: chỉ lấy agent có tên hoặc không phải hệ thống ẩn
  const visibleAgents = agents.filter((a) => a.id && a.id !== "__system__");

  // Xóa điều kiện ẩn sidebar do user muốn xem UI z-index

  // Nếu không có agent nào hoặc chỉ có 1 agent duy nhất, không hiển thị thanh trợ lý
  if (visibleAgents.length === 0) {
    return nothing;
  }

  const getDisplayName = (id: string, rawName?: string | null): string => {
    const trimmed = rawName?.trim();
    if (trimmed) {
      return trimmed;
    }
    if (id === "main") {
      return "Trợ lý hệ thống";
    }
    return id;
  };

  return html`
    <nav class="chat-agent-bar" aria-label="Chọn trợ lý">
      ${visibleAgents.map((agent) => {
        const name = getDisplayName(agent.id, agent.identity?.name ?? agent.name);
        const avatarUrl = agent.identity?.avatarUrl?.trim() || null;
        const isActive = agent.id === currentAgentId;
        return html`
          <button
            class="chat-agent-bar__item ${isActive ? "chat-agent-bar__item--active" : ""}"
            role="tab"
            aria-selected=${isActive}
            title="${name}"
            @click=${() => onAgentSelect(agent.id)}
          >
            <div class="chat-agent-bar__avatar">
              ${
                avatarUrl
                  ? html`<img src=${avatarUrl} alt=${name} />`
                  : html`<span>${name.charAt(0).toUpperCase()}</span>`
              }
            </div>
            <span class="chat-agent-bar__name">${name}</span>
          </button>
        `;
      })}
    </nav>
  `;
}

/**
 * Cột trái kiểu Zalo: session list + agent footer.
 * Bao gồm: search bar, danh sách hội thoại, agent info cuối cột.
 */
export function renderChatLeftPanel(
  state: AppViewState,
  onSessionSelect: (sessionKey: string) => void,
  onAgentSelect: (agentId: string) => void,
  onNewSession: () => void,
  widthRatio?: number,
) {
  const sessions = state.sessionsResult?.sessions ?? [];
  const currentKey = state.sessionKey;

  const agents = state.agentsList?.agents ?? [];
  const parsed = parseAgentSessionKey(currentKey);
  const currentAgentId = parsed?.agentId ?? state.agentsList?.defaultId ?? "main";

  const { defaultLabel } = resolveChatModelSelectState(state);
  const shortModelLabel = formatModelName(defaultLabel || "")
    .split(" · ")[0]
    .trim();

  const getAgentDisplayName = (id: string, rawName?: string | null): string => {
    const trimmed = rawName?.trim();
    if (trimmed && trimmed !== "main") {
      return trimmed;
    }
    if (id === "main") {
      return shortModelLabel || "Trợ lý";
    }
    return id;
  };

  const currentAgent = agents.find((a) => a.id === currentAgentId);
  const currentAgentName = getAgentDisplayName(
    currentAgentId,
    currentAgent?.identity?.name ?? currentAgent?.name,
  );
  const currentAgentAvatar = currentAgent?.identity?.avatarUrl?.trim() || null;
  const visibleAgents = agents.filter((a) => a.id && a.id !== "__system__");

  const formatTime = (ts: number | undefined): string => {
    if (!ts) {
      return "";
    }
    const d = new Date(ts);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      return d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    }
    if (diffDays <= 6) {
      return d.toLocaleDateString("vi-VN", { weekday: "short" });
    }
    return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
  };

  type SessionRow = { key: string; lastMessage?: string; updatedAt?: number };

  return html`
    <aside
      class="chat-left-panel"
      style=${widthRatio != null ? `flex: 0 0 ${widthRatio * 100}%; width: ${widthRatio * 100}%;` : ""}
    >
      <div class="chat-left-panel__search">
        <div class="chat-left-panel__search-wrapper">
          <span class="chat-left-panel__search-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </span>
          <input type="text" class="chat-left-panel__search-input" placeholder="Tìm kiếm hội thoại..." ?disabled=${!state.connected} />
        </div>
        <button
          class="chat-left-panel__new-btn"
          title="Tạo hội thoại mới"
          aria-label="New chat"
          @click=${onNewSession}
          ?disabled=${!state.connected}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        </button>
      </div>

      <ul class="chat-left-panel__sessions" role="listbox" aria-label="Danh sách hội thoại">
        ${
          sessions.length === 0
            ? html`
                <li class="chat-left-panel__empty">Chưa có hội thoại nào</li>
              `
            : sessions.slice(0, 80).map((rawSession) => {
                const session = rawSession as unknown as SessionRow;
                const isActive = session.key === currentKey;
                // Ưu tiên hiển thị auto-title label (nếu có), fallback về session key thân thiện
                const rawLabel = (rawSession as unknown as { label?: string }).label;
                const displayKey =
                  cleanAutoTitleLabel(rawLabel) ||
                  session.key.replace(/^agent:[^:]+:/, "").replace(/^main$/, "Hội thoại chính");
                return html`
                <li
                  class="chat-left-panel__session ${isActive ? "chat-left-panel__session--active" : ""}"
                  role="option"
                  aria-selected=${isActive}
                  @click=${() => onSessionSelect(session.key)}
                >
                  <div class="chat-left-panel__session-avatar">
                    ${
                      currentAgentAvatar
                        ? html`<img src=${currentAgentAvatar} alt="" />`
                        : getProviderLogoSvg(currentAgentName) ||
                          html`<span>${currentAgentName.charAt(0).toUpperCase()}</span>`
                    }
                  </div>
                  <div class="chat-left-panel__session-body">
                    <div class="chat-left-panel__session-top">
                      <span class="chat-left-panel__session-name">${displayKey}</span>
                      ${
                        session.updatedAt
                          ? html`<span class="chat-left-panel__session-time">${formatTime(session.updatedAt)}</span>`
                          : nothing
                      }
                    </div>
                    ${
                      session.lastMessage
                        ? html`<span class="chat-left-panel__session-preview">${session.lastMessage}</span>`
                        : nothing
                    }
                  </div>
                </li>
              `;
              })
        }
      </ul>

      <div class="chat-left-panel__agent-footer">
        <div class="chat-left-panel__agent-label">Trợ lý</div>
        ${
          visibleAgents.length <= 1
            ? html`
              <div class="chat-left-panel__agent-current">
                <div class="chat-left-panel__agent-avatar">
                  ${
                    currentAgentAvatar
                      ? html`<img src=${currentAgentAvatar} alt="" />`
                      : getProviderLogoSvg(currentAgentName) ||
                        html`<span>${currentAgentName.charAt(0).toUpperCase()}</span>`
                  }
                </div>
                <div class="chat-left-panel__agent-info">
                  <span class="chat-left-panel__agent-name">${currentAgentName}</span>
                </div>
              </div>
            `
            : html`
              <div class="chat-left-panel__agent-list">
                ${visibleAgents.map((agent) => {
                  const name = getAgentDisplayName(agent.id, agent.identity?.name ?? agent.name);
                  const avatarUrl = agent.identity?.avatarUrl?.trim() || null;
                  const isActive = agent.id === currentAgentId;
                  return html`
                    <button
                      class="chat-left-panel__agent-item ${isActive ? "chat-left-panel__agent-item--active" : ""}"
                      title="${name}"
                      @click=${() => onAgentSelect(agent.id)}
                    >
                      <div class="chat-left-panel__agent-avatar">
                        ${
                          avatarUrl
                            ? html`<img src=${avatarUrl} alt="" />`
                            : getProviderLogoSvg(name) ||
                              html`<span>${name.charAt(0).toUpperCase()}</span>`
                        }
                      </div>
                      <span class="chat-left-panel__agent-name">${name}</span>
                    </button>
                  `;
                })}
              </div>
            `
        }
      </div>
    </div>
  `;
}
