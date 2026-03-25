# 🦞 Hướng Dẫn Dự Án irukaclaw — Dành Cho AI Agent & Developer

> Đây là bản Việt hoá của `AGENTS.md` (quy tắc kho mã nguồn).
> File gốc `AGENTS.md` bằng tiếng Anh được giữ nguyên để AI tools đọc đúng.

---

## 1. Cấu Trúc Thư Mục Tổng Quan

```mermaid
graph TD
    ROOT["irukaclaw/"] --> SRC["src/ — Mã lõi TypeScript"]
    ROOT --> EXT["extensions/ — Các plugin kênh"]
    ROOT --> UI["ui/ — Giao diện web Dashboard"]
    ROOT --> DIST["dist/ — File đã build, chạy gateway"]
    ROOT --> DOCS["docs/ — Tài liệu tiếng Anh"]
    ROOT --> HUONG["huong-dan/ — Tài liệu tiếng Việt"]
    ROOT --> SCRIPTS["scripts/ — Build & Dev scripts"]
    ROOT --> PKG["packages/ — Thư viện nội bộ"]
    ROOT --> SKILLS["skills/ — Kỹ năng mở rộng"]

    SRC --> SRC1["src/cli — Wiring CLI"]
    SRC --> SRC2["src/commands — Lệnh CLI"]
    SRC --> SRC3["src/infra — Hạ tầng"]
    SRC --> SRC4["src/media — Pipeline media"]
    SRC --> SRC5["src/provider-web.ts — Web provider"]

    EXT --> EXT1["extensions/telegram"]
    EXT --> EXT2["extensions/discord"]
    EXT --> EXT3["extensions/zalo"]
    EXT --> EXTN["extensions/... (82 kênh)"]
```

---

## 2. Quy Tắc Đặt Tên

```mermaid
graph LR
    A["Tên sản phẩm"] -->|Heading/Docs/UI| B["OpenClaw (chữ hoa O và C)"]
    A -->|CLI/package/path/config| C["openclaw (lowercase)"]

    D["Plugin ID"] -->|Thư mục| E["extensions/<id>"]
    D -->|Package npm| F["@openclaw/<id>"]
    D -->|Docs/UI| G["plugins (không dùng 'extensions')"]
```

---

## 3. Biên Giới Import — Plugin / Extension

```mermaid
graph TD
    EXT_PKG["Code trong extensions/<id>/"]
    SDK["openclaw/plugin-sdk/*"]
    LOCAL["./api.ts hoặc ./runtime-api.ts"]
    CORE["src/** (KHÔNG được import)"]
    OTHER_EXT["extensions/<khác>/** (KHÔNG được import)"]

    EXT_PKG -->|"✅ Đúng"| SDK
    EXT_PKG -->|"✅ Đúng"| LOCAL
    EXT_PKG -->|"❌ CẤM"| CORE
    EXT_PKG -->|"❌ CẤM"| OTHER_EXT
```

---

## 4. Luồng Build & Phát Triển

```mermaid
graph LR
    A["Cài deps\npnpm install"] --> B["Chạy dev\npnpm dev"]
    A --> C["Build production\npnpm build"]
    C --> D["dist/ — Gateway chạy từ đây"]
    C --> E["pnpm ui:build — Build UI web"]
    B --> F["node dist/index.js gateway --port 18789"]
    F --> G["http://localhost:18789"]
```

### Lệnh thường dùng

| Lệnh              | Chức năng                            |
| ----------------- | ------------------------------------ |
| `pnpm install`    | Cài dependencies                     |
| `pnpm dev`        | Chạy Gateway ở chế độ dev            |
| `pnpm build`      | Build toàn bộ (Gateway + Plugin SDK) |
| `pnpm ui:build`   | Build giao diện web Dashboard        |
| `pnpm check`      | Kiểm tra lint + format + type        |
| `pnpm test`       | Chạy toàn bộ test                    |
| `pnpm format:fix` | Tự sửa format code                   |

---

## 5. Quy Tắc Coding

```mermaid
graph TD
    A["Viết Code TypeScript"] --> B["Strict typing — không dùng 'any'"]
    A --> C["Không dùng @ts-nocheck"]
    A --> D["ESM — không mix await import + static import"]
    A --> E["File < ~700 dòng — tách helper nếu dài hơn"]
    A --> F["Dùng Oxlint + Oxfmt để format"]
    A --> G["Không thay đổi prototype (no applyPrototypeMixins)"]
```

---

## 6. Quy Trình Commit & PR

```mermaid
graph LR
    A["Sửa code"] --> B["scripts/committer 'message' file..."]
    B --> C["Không dùng git add/commit tay"]
    C --> D["Kiểm tra: pnpm check && pnpm test"]
    D --> E["Push lên nhánh"]
    E --> F["Tạo PR theo template\n.github/pull_request_template.md"]
```

**Quy tắc commit quan trọng:**

- Không merge commit trên `main` — chỉ rebase
- Không switch branch khi chưa được yêu cầu
- Không chạy `git stash` tự ý

---

## 7. Luồng Channels (Kênh Giao Tiếp)

```mermaid
graph LR
    MSG["Tin nhắn đến"] --> GW["Gateway\nws://localhost:18789"]
    GW --> ROUTE["Router\nsrc/routing/"]
    ROUTE --> C1["Telegram\nextensions/telegram"]
    ROUTE --> C2["Discord\nextensions/discord"]
    ROUTE --> C3["Zalo\nextensions/zalo"]
    ROUTE --> C4["Slack / WhatsApp\n/ Signal / iMessage..."]
    ROUTE --> AI["Trợ lý AI\n(Gemini / GPT / Claude)"]
    AI --> REPLY["Trả lời về kênh"]
```

---

## 8. Quy Tắc Tài Liệu (Docs)

| Quy tắc              | Chi tiết                                                     |
| -------------------- | ------------------------------------------------------------ |
| **Link nội bộ**      | Root-relative, không có `.md` VD: `[Config](/configuration)` |
| **Thứ tự danh sách** | Sắp xếp theo alphabet (trừ khi mô tả thứ tự runtime)         |
| **Heading**          | Không dùng em dash (—) hay apostrophe trong heading          |
| **Link công khai**   | Dùng `https://docs.openclaw.ai/...` (không root-relative)    |
| **Placeholder**      | Dùng `user@gateway-host` thay vì tên máy thật                |

---

## 9. Bảo Mật

```mermaid
graph TD
    A["Thông tin bảo mật"] --> B["Credentials: ~/.openclaw/credentials/"]
    A --> C["Sessions: ~/.openclaw/sessions/"]
    A --> D["Env vars: ~/.profile"]

    E["KHÔNG commit / publish"] --> F["Số điện thoại thật"]
    E --> G["API key thật"]
    E --> H["Video / file nhạy cảm"]
    E --> I["Config thật có hostname cụ thể"]
```

---

## 10. Kiểm Tra Nhanh Trước Khi Push

```mermaid
graph LR
    A["Sắp push?"] --> B{"Có thay đổi\nlogic/data?"}
    B -->|Có| C["pnpm check ✅"]
    C --> D["pnpm test ✅"]
    D --> E{"Thay đổi ảnh\nhưởng build?"}
    E -->|Có| F["pnpm build ✅"]
    F --> G["Push 🚀"]
    E -->|Không| G
    B -->|Chỉ format| H["pnpm format:fix rồi commit luôn"]
```

---

> 📌 **Ghi nhớ:** File `AGENTS.md` gốc (tiếng Anh) được giữ nguyên để AI agent đọc đúng quy tắc.
> File này (`agents-vi.md`) chỉ dùng để tham khảo và đọc hiểu nhanh.
