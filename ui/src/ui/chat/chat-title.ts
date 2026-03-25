/**
 * chat-title.ts
 * Auto-titling cho phiên chat: sau khi có đủ hội thoại, gọi AI sinh tiêu đề ngắn
 * và lưu vào backend qua sessions.patch { label }.
 *
 * Logic:
 *   1. Đợi messages ≥ 3 (ít nhất 1 cặp user+assistant) và session chưa có label tùy chỉnh.
 *   2. Gọi sessions.patch với một đề xuất title dựa vào nội dung tin nhắn user đầu tiên.
 *   3. Không gọi lại nếu session đã có label từ trước (được đặt thủ công hoặc do auto).
 *
 * Cách gọi: `maybeTriggerAutoTitle(state, messageGroups)` từ nơi render chat.
 */

import type { GatewayBrowserClient } from "../gateway.ts";
import type { MessageGroup } from "../types/chat-types.ts";

/** Prefix để nhận biết label do hệ thống tự sinh (cho phép ghi đè khi topic thay đổi) */
const AUTO_TITLE_PREFIX = "auto:";

/** Cache tránh gọi lặp cho cùng session trong cùng phiên browser */
const triggeredSessions = new Set<string>();

/** Module-level singleton: GatewayBrowserClient được set bởi app.ts sau khi connect */
let _globalClient: GatewayBrowserClient | null = null;

/**
 * Đăng ký GatewayBrowserClient để module có thể dùng mà không cần truyền qua props.
 * Gọi từ app.ts mỗi khi client được tạo/connect.
 */
export function setAutoTitleClient(client: GatewayBrowserClient | null): void {
  _globalClient = client;
}

/**
 * Trả về GatewayBrowserClient hiện tại (dùng trong views không có client qua props).
 */
export function getAutoTitleClient(): GatewayBrowserClient | null {
  return _globalClient;
}

/**
 * Trích xuất đoạn text đầu tiên có nghĩa từ MessageGroup của user.
 */
function extractFirstUserText(groups: MessageGroup[]): string {
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
 * Sinh tiêu đề ngắn gọn (≤ 6 từ) từ nội dung câu hỏi đầu tiên của user.
 * Không gọi API AI — dùng heuristic tinh gọn để tránh roundtrip.
 * Nếu dự án sau này muốn nâng cấp lên AI, thay hàm này.
 */
function deriveTitle(firstUserText: string): string {
  // Bỏ xuống dòng, khoảng trắng thừa
  const cleaned = firstUserText.replace(/\s+/g, " ").replace(/["""]/g, '"').trim();

  // Lấy câu đầu tiên hoặc tối đa 60 ký tự
  const sentence = cleaned.split(/[.!?\n]/)[0].trim();
  const short = sentence.length > 60 ? sentence.slice(0, 57) + "…" : sentence;

  // Viết hoa chữ cái đầu
  return short.charAt(0).toUpperCase() + short.slice(1);
}

/**
 * Kiểm tra xem session đã có label tùy chỉnh chưa (có label hiện tại không phải auto).
 */
function hasCustomLabel(currentLabel: string | null | undefined): boolean {
  if (!currentLabel) {
    return false;
  }
  // Label do hệ thống tự sinh có tiền tố "auto:" — cho phép ghi đè
  if (currentLabel.startsWith(AUTO_TITLE_PREFIX)) {
    return false;
  }
  // Bất kỳ label nào khác => người dùng đã tự đặt, không ghi đè
  return true;
}

/**
 * Điểm vào chính: Gọi hàm này sau khi render danh sách message.
 * Sẽ tự động sinh và lưu label nếu đủ điều kiện.
 *
 * @param client - GatewayBrowserClient để gọi sessions.patch
 * @param sessionKey - key của phiên chat đang active
 * @param messageGroups - danh sách MessageGroup đã được render
 * @param currentLabel - label hiện tại của session (nếu có)
 */
export async function maybeTriggerAutoTitle(
  client: GatewayBrowserClient | null,
  sessionKey: string,
  messageGroups: MessageGroup[],
  currentLabel?: string | null,
): Promise<void> {
  // Điều kiện: cần đủ hội thoại + chưa trigger + không có label tùy chỉnh + có client
  if (!client) {
    return;
  }
  if (triggeredSessions.has(sessionKey)) {
    return;
  }
  if (hasCustomLabel(currentLabel)) {
    return;
  }

  // Chỉ trigger sau khi có ≥ 1 user message và ≥ 1 assistant reply (tổng ≥ 2 groups)
  const userCount = messageGroups.filter((g) => g.role === "user").length;
  const assistantCount = messageGroups.filter((g) => g.role === "assistant").length;
  if (userCount < 1 || assistantCount < 1) {
    return;
  }

  // Đánh dấu đã trigger để không gọi lại trong session browser này
  triggeredSessions.add(sessionKey);

  const firstUserText = extractFirstUserText(messageGroups);
  if (!firstUserText) {
    return;
  }

  const title = deriveTitle(firstUserText);
  if (!title || title.length < 3) {
    return;
  }

  try {
    await client.request("sessions.patch", {
      sessionKey,
      patch: {
        label: `${AUTO_TITLE_PREFIX}${title}`,
      },
    });
  } catch {
    // Silent fail — auto-title không phải chức năng nghiêm trọng
    triggeredSessions.delete(sessionKey); // Cho phép thử lại lần sau
  }
}

/**
 * Xóa tiền tố "auto:" khỏi label để hiển thị thân thiện trên UI.
 */
export function cleanAutoTitleLabel(rawLabel: string | null | undefined): string | null {
  if (!rawLabel) {
    return null;
  }
  if (rawLabel.startsWith(AUTO_TITLE_PREFIX)) {
    return rawLabel.slice(AUTO_TITLE_PREFIX.length);
  }
  return rawLabel;
}
