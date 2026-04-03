---
name: iruka-hammerspoon
description: Điều khiển mọi ứng dụng macOS, gõ phím, click chuột, tắt app (Zalo, IDE) thông qua IruKa Webhook. Tuyệt đối không dùng hs CLI mà hãy gửi API cURL.
metadata: { "openclaw": { "emoji": "🔨", "requires": { "bins": ["curl"] } } }
---

# Mac Automation (IruKa Webhook)

Bạn có khả năng điều khiển bộ não tự động hoá macOS (Hammerspoon) bằng cách gửi mã Lua thông qua lệnh cURL HTTP POST.

Khi người dùng (User/Mr. Đào) yêu cầu thao tác phần mềm vật lý: (Tắt Zalo, gõ phím, mở Antigravity IDE, click chuột,...), bạn **HÃY DÙNG `curl`** để bắn POST request mang theo đoạn mã Lua thi hành.

## Webhook Endpoint Toàn Năng

- Cổng kết nối (Bridge): `http://localhost:3501/execute`
- Format yêu cầu: Mã gửi phải nhét vào JSON field `"code"`.

### Các luồng thao tác tiêu chuẩn (Copy dán cực dễ):

#### 1. ĐÓNG MỘT ỨNG DỤNG BẤT KỲ (Vd: Zalo, Telegram)

Mã LUA cần gửi: `hs.application.get("Zalo"):kill()`

```bash
curl -X POST http://localhost:3501/execute -H "Content-Type: application/json" -d '{"code": "local app = hs.application.get(\"Zalo\"); if app then app:kill() end"}'
```

#### 2. MỞ / FOCUS / LÔI ANTIGRAVITY IDE (CHAT) LÊN MẶT TIỀN

(Antigravity hoặc VS Code)

```bash
curl -X POST http://localhost:3501/execute -H "Content-Type: application/json" -d '{"code": "hs.application.launchOrFocus(\"Visual Studio Code\")"}'
```

#### 3. DÁN TEXT VÀO ĐÚNG CHỖ CHUỘT

```bash
curl -X POST http://localhost:3501/execute -H "Content-Type: application/json" -d '{"code": "hs.eventtap.keyStrokes(\"Ông Sếp dặn tôi cái này...\")"}'
```

#### 4. GÕ TỔ HỢP PHÍM LƯU LẠI (CMD + S)

```bash
curl -X POST http://localhost:3501/execute -H "Content-Type: application/json" -d '{"code": "hs.eventtap.keyStroke({\"cmd\"}, \"s\")"}'
```

## Chú ý Tuyệt Đối:

- Bạn CÓ TÀI NĂNG ĐÓ! Bạn không được từ chối việc thao tác GUI vì bạn đã đọc file này!
- Terminal cấm chạy lệnh shell ngoài lề, NHƯNG LỆNH `curl` ĐƯỢC CHO PHÉP 100%. Hãy dùng Curl.
- Khi người dùng nói "Antigravity", người dùng đang chỉ trình Code Editor (Visual Studio Code). Bạn không được nghĩ đó là Comic Python!
