# 🧠 IRUKACLAW — Bản Đồ Hệ Thần Kinh Toàn Bộ

> Tài liệu này giải thích từ A → Z cách IruKaClaw hoạt động.
> Dành cho: CEO / Founder — không cần biết code vẫn hiểu được.

---

## 1. IruKaClaw là cái gì?

**IruKaClaw** (nền tảng **OpenClaw**) là một **bộ não AI trung tâm** chạy ngầm trên máy iMac của anh.
Nó đóng vai trò như một **tổng đài AI thông minh** — nhận lệnh từ nhiều nơi (Discord, Web Chat, Terminal...), xử lý bằng AI (Gemini), rồi tự _hành động_ trên máy thật.

---

## 2. Sơ đồ tổng thể — 3 tầng hoạt động

```
┌─────────────────────────────────────────────────────────────┐
│                  TẦNG 1: ĐẦU VÀO (Input Layer)             │
│                                                             │
│  📱 Discord Bot        💻 Web Chat          ⌨️ Terminal     │
│  (Mr. Đào nhắn tin)   (127.0.0.1:18789)    (CLI openclaw)  │
└──────────────────┬──────────────────────────────────────────┘
                   │  Tất cả đều đổ vào 1 điểm
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                TẦNG 2: NÃO TRUNG TÂM (Gateway)             │
│                                                             │
│  🦞 OpenClaw Gateway (Port 18789)                           │
│  ├── Nhận tin nhắn từ mọi kênh                             │
│  ├── Quản lý phiên làm việc (Sessions)                     │
│  ├── Định tuyến đến đúng Agent (Routing)                   │
│  └── Nạp Skills (kỹ năng mở rộng từ /skills/)             │
│                                                             │
│  🤖 Pi Agent (AI Lõi — Gemini 2.5 Flash)                   │
│  ├── Đọc SOUL.md, USER.md, TOOLS.md để biết mình là ai    │
│  ├── Đọc SKILL.md các kỹ năng để biết mình làm được gì    │
│  └── Thực thi lệnh: đọc file, chạy script, gọi API...     │
└──────────────────┬──────────────────────────────────────────┘
                   │  Khi cần hành động vật lý
                   ▼
┌─────────────────────────────────────────────────────────────┐
│               TẦNG 3: TAY CHÂN VẬT LÝ (Execution)          │
│                                                             │
│  🔨 Hammerspoon (Port 3501)                                 │
│  ├── Tắt/Mở ứng dụng (Zalo, Chrome...)                     │
│  ├── Gõ phím ảo (Cmd+S, Cmd+V...)                          │
│  ├── Di chuyển chuột & click                               │
│  └── Điều khiển VS Code / Antigravity IDE                  │
│                                                             │
│  💻 macOS System                                            │
│  └── Chạy lệnh Terminal, đọc file, cài app...              │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Luồng cuộc trò chuyện — Từ Discord đến hành động thực

### Luồng 1: Ra lệnh điều khiển Mac (Nhanh — < 1 giây)

```
Anh Đào nhắn Discord: "tắt zalo đi"
        │
        ▼
IruKa Discord Bot (bot.js) nhận tin
        │
        ├─► [Bộ Phiên Dịch Mac] Phát hiện "tắt" + "zalo"
        │   hammerspoon.js → Biết đây là lệnh Mac!
        │
        ▼
Gọi thẳng Hammerspoon API (localhost:3501/execute)
        │  KHÔNG cần AI, không cần chờ
        │
        ▼
Hammerspoon nhận mã Lua → Giết tiến trình Zalo ngay lập tức
        │
        ▼
Bot Discord trả lời: "✅ Đã tắt hoàn toàn Zalo!"
```

### Luồng 2: Hỏi AI làm việc coding/phân tích (Chậm hơn — 5-30 giây)

```
Anh Đào nhắn Discord: "đọc file này và giải thích cho tôi"
        │
        ▼
IruKa Discord Bot (bot.js) nhận tin
        │
        ├─► [Bộ Phiên Dịch Mac] Không phải lệnh Mac → Bỏ qua
        │
        ▼
Gửi đến Antigravity IDE API (localhost:3500)
        │
        ▼
Antigravity (VS Code + AI) xử lý và phân tích
        │
        ▼
Trả về từng chữ qua SSE Stream → Bot Discord hiển thị dần dần
        │
        ▼
Kết quả đầy đủ hiển thị trên Discord
```

### Luồng 3: Chat trực tiếp với IruKaClaw qua Web/Discord Bot (IruKaClaw-iMac Home)

```
Anh Đào chat trong Discord: "tóm tắt file README.md"
        │                    (Bot: iruKaClaw-iMac Home)
        ▼
OpenClaw Gateway nhận tin qua kênh Discord
        │
        ▼
Pi Agent (Gemini) đọc SOUL.md → Biết mình là Irukaclaw
Pi Agent đọc TOOLS.md → Biết môi trường làm việc
Pi Agent đọc SKILL.md liên quan → Biết cách đọc file
        │
        ▼
Pi Agent chạy lệnh đọc file README.md
        │
        ▼
Trả lời ngược lại Discord
```

---

## 4. Ai làm gì? — Phân vai các nhân vật trong hệ thống

| Nhân vật                         | Là cái gì?                  | Làm gì?                                               | Chạy ở đâu?                |
| -------------------------------- | --------------------------- | ----------------------------------------------------- | -------------------------- |
| **OpenClaw Gateway**             | Bộ não trung tâm, tổng đài  | Nhận lệnh từ Discord/Web/CLI → phân luồng             | Port `18789`               |
| **Pi Agent**                     | AI "Cái não suy nghĩ"       | Đọc context, lập kế hoạch, thực thi lệnh              | Bên trong Gateway          |
| **IruKa Discord Bot** (`bot.js`) | Người gác cổng trên Discord | Bắt tin nhắn → phân loại → gọi AI hoặc Hammerspoon    | Node.js riêng              |
| **Hammerspoon**                  | "Đôi tay vật lý" macOS      | Tắt mở app, gõ phím, click chuột, điều khiển màn hình | Port `3501`                |
| **Antigravity (VS Code)**        | IDE thông minh              | Xử lý code phức tạp, viết code, đọc codebase          | Port `3500`                |
| **Skills** (`/skills/`)          | Bộ kỹ năng mở rộng          | Dạy AI biết dùng thêm công cụ gì (thời tiết, Zalo...) | File tĩnh trong `/skills/` |

---

## 5. Bộ nhớ & Nhân cách Agent — IruKaClaw nhớ gì?

Khi IruKaClaw khởi động mỗi phiên làm việc, nó tự đọc các file này để biết mình là ai:

```
~/.openclaw/workspace/
├── SOUL.md        ← "Linh hồn" — Giá trị cốt lõi, cách ứng xử, quy tắc
├── IDENTITY.md    ← Tên, nhân vật (Irukaclaw — Tổng chỉ huy AI 🤖)
├── USER.md        ← Mr. Đào là ai, thông tin về sếp
├── TOOLS.md       ← Các công cụ đặc thù của môi trường anh Đào
├── AGENTS.md      ← Hướng dẫn làm việc theo session
└── memory/
    └── YYYY-MM-DD.md  ← Nhật ký hàng ngày (ghi nhớ context)
```

> 💡 **Quan trọng:** Mỗi lần bot khởi động lại, nó quên sạch ký ức RAM nhưng ĐỌC LẠI các file này → giả lập bộ nhớ dài hạn bằng file văn bản!

---

## 6. Cơ chế Skills — Cách nạp thêm kỹ năng

**Skills** là cách anh "dạy thêm kỹ năng" cho IruKaClaw mà không cần sửa code:

```
irukaclaw/skills/
├── weather/          ← Skill xem thời tiết (dùng curl)
├── discord/          ← Skill quản lý Discord
├── github/           ← Skill làm việc với GitHub
├── mac-automation/   ← 🆕 Skill anh Đào vừa thêm: điều khiển macOS
│   └── SKILL.md      ← AI đọc file này để biết cách gọi Hammerspoon
├── gemini/           ← Skill đặc biệt từ Google AI
└── ...50+ skills khác
```

**Mỗi SKILL.md là một "Bản hướng dẫn sử dụng"** dành cho AI.
Khi anh hỏi AI điều gì, nó sẽ tự tìm đúng Skill phù hợp và làm theo.

---

## 7. 3 Bot khác nhau — Đừng nhầm!

Trong hệ thống của anh hiện có **3 bot riêng biệt**:

```
┌────────────────────────────────────────────────────────────┐
│  Bot 1: iruKaClaw-iMac Home (trên Discord)                │
│  ├── Là OpenClaw Bot chính thức                           │
│  ├── Kết nối trực tiếp vào Gateway port 18789             │
│  └── Dùng skills/ để làm mọi việc AI                     │
├────────────────────────────────────────────────────────────┤
│  Bot 2: IruKa Discord Bot (discord-bot/bot.js)            │
│  ├── Bot tự viết của anh Đào                              │
│  ├── Có "Bộ phiên dịch Mac" (hammerspoon.js)             │
│  ├── Tắt/Mở app KHÔNG cần AI → nhanh hơn                 │
│  └── Gọi Antigravity IDE cho coding tasks                 │
├────────────────────────────────────────────────────────────┤
│  Bot 3: Antigravity (Không phải Discord Bot)              │
│  ├── AI trong VS Code                                     │
│  ├── Nhận lệnh qua HTTP API (port 3500)                   │
│  └── Xử lý code, đọc file, phân tích codebase            │
└────────────────────────────────────────────────────────────┘
```

---

## 8. IruKaClaw làm được những gì?

### 🤖 Làm việc với nội dung & thông tin

- Đọc, tóm tắt file bất kỳ
- Tìm kiếm web (Brave Search, Perplexity)
- Nhớ lịch sử cuộc trò chuyện qua memory files
- Gửi tin nhắn, báo cáo theo lịch (Standup 9h sáng)

### 💻 Điều khiển máy tính Mac (qua Hammerspoon)

- Tắt/Mở ứng dụng bất kỳ (Zalo, Chrome, Telegram...)
- Gõ tổ hợp phím ảo (Cmd+S, Cmd+V, Enter...)
- Dán text vào đúng vị trí con trỏ chuột
- Bật/tắt/focus VS Code / Antigravity IDE

### 🛠️ Lập trình & Kỹ thuật (qua Antigravity IDE)

- Đọc và phân tích toàn bộ codebase
- Viết code mới theo yêu cầu
- Debug lỗi, review code
- Build, deploy ứng dụng

### 📡 Kết nối đa kênh

- Discord (nhiều server, nhận lệnh từ anh Đào)
- Web Chat (mở Dashboard tại localhost:18789)
- Terminal (CLI lệnh trực tiếp)
- Tương lai: WhatsApp, Telegram, iMessage

---

## 9. Các lệnh thường dùng để vận hành

```bash
# Khởi động IruKaClaw (xây dựng UI + chạy gateway)
start-claw

# Tắt IruKaClaw
stop-claw

# Xem log thời gian thực
tail -f /tmp/irukaclaw_dev.log

# Truy cập Dashboard
http://127.0.0.1:18789/

# Chat với AI
http://127.0.0.1:18789/chat?session=main
```

---

## 10. Điểm quan trọng cần nhớ

> [!IMPORTANT]
> **Hammerspoon PHẢI đang chạy** thì mới điều khiển Mac được.
> Nếu thấy Bot không tắt được app → Nhấn vào icon Hammerspoon trên Menu Bar → **Reload Config**

> [!NOTE]
> **Mỗi lần thay đổi code bot Discord** → phải restart lại `node bot.js`
> **Mỗi lần thay đổi file trong skills/** → IruKaClaw tự nạp lại, không cần restart gateway

> [!TIP]
> **Bàn phím tắt nhanh kiểm tra hệ thống:**
>
> - Hammerspoon hoạt động không? → Gõ `hs -c 'print("ok")'` trong Terminal
> - Gateway đang chạy không? → Mở `http://127.0.0.1:18789/`

---

_Cập nhật lần cuối: 2026-04-04 | IruKa Workspace v2.2 — Tài liệu nội bộ_
