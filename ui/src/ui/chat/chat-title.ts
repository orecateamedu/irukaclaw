/**
 * chat-title.ts
 * Auto-titling cho phiên chat: sau khi user gửi tin đầu tiên, sinh tiêu đề ngắn
 * (fallback heuristic ngay lập tức + AI trong nền) và lưu qua sessions.patch { label }.
 *
 * Cải tiến v2:
 * - Dùng sessionStorage để lưu cache triggeredSessions bền vững qua reload trang.
 * - Không re-trigger khi session đã có AI title ổn định (auto: + độ dài hợp lý).
 */

import type { GatewayBrowserClient } from "../gateway.ts";
import type { MessageGroup } from "../types/chat-types.ts";

/** Prefix để nhận biết label do hệ thống tự sinh (cho phép ghi đè khi topic thay đổi) */
const AUTO_TITLE_PREFIX = "auto:";

/** Key lưu Set các sessionKey đã trigger trong sessionStorage */
const STORAGE_KEY = "oc_auto_titled_sessions";

/** Module-level singleton: GatewayBrowserClient được set bởi app.ts sau khi connect */
let _globalClient: GatewayBrowserClient | null = null;

/**
 * Đăng ký GatewayBrowserClient để module có thể dùng mà không cần truyền qua props.
 */
export function setAutoTitleClient(client: GatewayBrowserClient | null): void {
  _globalClient = client;
}

export function getAutoTitleClient(): GatewayBrowserClient | null {
  return _globalClient;
}

// ---------- sessionStorage helpers ----------

function loadTriggeredSet(): Set<string> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      return new Set<string>(JSON.parse(raw) as string[]);
    }
  } catch {
    /* ignore */
  }
  return new Set<string>();
}

function saveTriggeredSet(set: Set<string>): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    /* ignore */
  }
}

function hasBeenTriggered(sessionKey: string): boolean {
  return loadTriggeredSet().has(sessionKey);
}

function markTriggered(sessionKey: string): void {
  const set = loadTriggeredSet();
  set.add(sessionKey);
  saveTriggeredSet(set);
}

function unmarkTriggered(sessionKey: string): void {
  const set = loadTriggeredSet();
  set.delete(sessionKey);
  saveTriggeredSet(set);
}

// ---------- core helpers ----------

/**
 * Trích xuất đoạn text đầu tiên có nghĩa từ MessageGroup của user.
 */
export function extractFirstUserText(groups: MessageGroup[]): string {
  for (const g of groups) {
    if (g.role !== "user") {
      continue;
    }
    for (const msg of g.messages) {
      const m = msg as Record<string, unknown>;
      if (typeof m.content === "string" && m.content.trim().length > 3) {
        return m.content.trim().slice(0, 400);
      }
      if (Array.isArray(m.content)) {
        for (const block of m.content) {
          const b = block as Record<string, unknown>;
          if (b.type === "text" && typeof b.text === "string" && b.text.trim().length > 3) {
            return b.text.trim().slice(0, 400);
          }
        }
      }
    }
  }
  return "";
}

/**
 * Sinh tiêu đề ngắn gọn từ nội dung câu hỏi đầu tiên của user (heuristic).
 */
export function deriveTitle(firstUserText: string): string {
  const cleaned = firstUserText.replace(/\s+/g, " ").replace(/["""]/g, '"').trim();
  const sentence = cleaned.split(/[.!?\n]/)[0].trim();
  const short = sentence.length > 60 ? sentence.slice(0, 57) + "…" : sentence;
  return short.charAt(0).toUpperCase() + short.slice(1);
}

/**
 * Kiểm tra xem session đã có label tùy chỉnh do người dùng đặt thủ công chưa.
 * Label do hệ thống tự sinh có tiền tố "auto:" → cho phép ghi đè.
 */
function hasCustomLabel(currentLabel: string | null | undefined): boolean {
  if (!currentLabel) return false;
  return !currentLabel.startsWith(AUTO_TITLE_PREFIX);
}

/**
 * Kiểm tra xem auto-title hiện tại đã "ổn định" chưa.
 * "Ổn định" = đã có auto: label dài hơn 10 ký tự (không phải fallback UUID cắt ngắn).
 * Khi ổn định, ta không gọi AI nữa dù cache bị reset.
 */
function isStableAutoTitle(currentLabel: string | null | undefined): boolean {
  if (!currentLabel?.startsWith(AUTO_TITLE_PREFIX)) return false;
  const content = currentLabel.slice(AUTO_TITLE_PREFIX.length).trim();
  // Nếu content > 10 ký tự và không trông như UUID-cắt → coi là ổn định
  return content.length > 10 && !/^[0-9a-fA-F-]{8,}/.test(content);
}

/**
 * Điểm vào chính: Gọi sau khi render danh sách message.
 * Sinh và lưu label nếu đủ điều kiện.
 */
export async function maybeTriggerAutoTitle(
  client: GatewayBrowserClient | null,
  sessionKey: string,
  messageGroups: MessageGroup[],
  currentLabel?: string | null,
): Promise<void> {
  if (!client) return;

  // Không ghi đè label người dùng đặt thủ công
  if (hasCustomLabel(currentLabel)) return;

  // Nếu đã có AI title ổn định → đánh dấu vào cache và dừng
  if (isStableAutoTitle(currentLabel)) {
    markTriggered(sessionKey);
    return;
  }

  // Đã trigger trong session này (qua sessionStorage) → bỏ qua
  if (hasBeenTriggered(sessionKey)) return;

  // Chỉ trigger sau khi có ≥ 1 user message
  const userCount = messageGroups.filter((g) => g.role === "user").length;
  if (userCount < 1) return;

  // Đánh dấu đã trigger để không lặp lại trong session browser này
  markTriggered(sessionKey);

  const firstUserText = extractFirstUserText(messageGroups);
  if (!firstUserText) return;

  const fallbackTitle = deriveTitle(firstUserText);
  if (!fallbackTitle || fallbackTitle.length < 3) return;

  // Lần 1: Patch fallback ngay để thay thế UUID trên Sidebar lập tức
  try {
    await client.request("sessions.patch", {
      key: sessionKey,
      label: `${AUTO_TITLE_PREFIX}${fallbackTitle}`,
    });
  } catch {
    // Xóa cache để cho phép thử lại nếu lỗi mạng
    unmarkTriggered(sessionKey);
    return;
  }

  // Lần 2: Gọi AI trong nền để sinh tiêu đề thông minh hơn
  try {
    const aiResponse = await client.postJson<{
      choices?: Array<{ message?: { content?: string } }>;
    }>("/v1/chat/completions", {
      model: "openclaw",
      messages: [
        {
          role: "user",
          content: `Tóm tắt nội dung sau thành một tiêu đề siêu ngắn gọn (tối đa 6 từ), chỉ trả về văn bản tiêu đề, không giải thích, không dùng ngoặc kép:\n\n"${firstUserText}"`,
        },
      ],
    });

    let aiTitle = aiResponse?.choices?.[0]?.message?.content?.trim();
    if (aiTitle) {
      // Làm sạch nếu AI trả về ngoặc kép ở 2 đầu
      aiTitle = aiTitle.replace(/^["']|["']$/g, "").trim();
      if (aiTitle.length >= 2) {
        await client.request("sessions.patch", {
          key: sessionKey,
          label: `${AUTO_TITLE_PREFIX}${aiTitle}`,
        });
      }
    }
  } catch (err) {
    // Thất bại → giữ nguyên fallback title đã patch ở Lần 1
    console.warn("Auto-titling background AI request failed:", err);
  }
}

/**
 * Xóa tiền tố "auto:" khỏi label để hiển thị thân thiện trên UI.
 */
export function cleanAutoTitleLabel(rawLabel: string | null | undefined): string | null {
  if (!rawLabel) return null;
  if (rawLabel.startsWith(AUTO_TITLE_PREFIX)) {
    return rawLabel.slice(AUTO_TITLE_PREFIX.length);
  }
  return rawLabel;
}
