---
description: Audit toàn diện các màn hình của IrukaClaw theo 4 trụ cột: chức năng/logic, kiểm tra hoạt động, đề xuất tính năng chuyên nghiệp, và cải thiện UI/UX.
---

# /audit-screens — Workflow Rà Soát Màn Hình IrukaClaw

## Mục tiêu

Hiểu đầy đủ từng màn hình trong ứng dụng IrukaClaw, xác minh logic đang đúng hay chưa, tìm lỗ hổng tính năng theo tiêu chuẩn phần mềm chuyên nghiệp, và đề xuất cải thiện UI/UX.

---

## Bước 1 — Lập danh sách màn hình cần audit

Xác định tất cả màn hình/view hiện có trong ứng dụng:

```
# Duyệt qua các view chính
ls ui/src/ui/views/
```

Danh sách màn hình tiêu biểu cần audit:

- `login-gate.ts` — Trang đăng nhập / kết nối Gateway
- `overview.ts` — Trang tổng quan / Dashboard
- `chat.ts` — Màn hình hội thoại chính
- `agents.ts` — Quản lý Agent AI
- `channels.ts` — Quản lý kênh kết nối (Discord, Zalo, Telegram...)
- `settings.ts` — Trang cài đặt hệ thống
- Các view phụ khác (sessions, skills, logs, usage...)

Ghi nhận danh sách đầy đủ vào phần phân tích bên dưới.

---

## Bước 2 — Phân tích từng màn hình (lặp lại cho mỗi view)

Với **mỗi màn hình**, thực hiện đủ 4 trụ cột:

### 2A. Chức năng & Luồng Logic

- Đọc source code file view tương ứng trong `ui/src/ui/views/`
- Xác định:
  - Màn hình này **phục vụ mục đích gì** trong toàn bộ ứng dụng?
  - **Người dùng tương tác** với màn hình này như thế nào?
  - Dữ liệu nào được **load vào** và từ đâu (API, state, WebSocket)?
  - Dữ liệu nào được **gửi ra** khi người dùng thao tác?
  - Màn hình liên kết với các màn hình khác qua luồng nào?

```
# Đọc file view
cat ui/src/ui/views/<ten-man-hinh>.ts
# Đọc các controllers/helpers liên quan
cat ui/src/ui/controllers/<ten>.ts
```

### 2B. Kiểm Tra Logic & Hoạt Động

Kiểm tra các điểm sau:

- [ ] Có **xử lý lỗi** (error handling) đầy đủ không?
- [ ] Có **trạng thái loading** khi chờ dữ liệu không?
- [ ] Có **trạng thái rỗng** (empty state) khi không có dữ liệu không?
- [ ] Logic điều kiện hiển thị (`if/else`, `ternary`) có đúng không?
- [ ] Các sự kiện người dùng (click, input, submit) có được xử lý đúng không?
- [ ] Có bị **memory leak** hay subscription chưa cleanup không?
- [ ] Kiểu TypeScript có chặt chẽ không, tránh `any`?

```
# Chạy kiểm tra TypeScript cho file cụ thể
cd ui && pnpm exec tsc --noEmit 2>&1 | grep "<ten-file>"
```

### 2C. Đề Xuất Tính Năng Chuyên Nghiệp

So sánh với tiêu chuẩn phần mềm chat/AI chuyên nghiệp (GPT, Claude.ai, Gemini...) và xác định:

- Tính năng nào **còn thiếu** so với chuẩn ngành?
- Có tính năng nào đang **thừa/không cần** gây rối UX không?
- Tính năng nào có thể **phân nhóm, gộp hoặc tách** tốt hơn?
- Có cần thêm **phân quyền, an toàn dữ liệu** không?

Ghi rõ: `[THIẾU]`, `[CẢI THIỆN]`, `[THỪA]` cho từng đề xuất.

### 2D. Đề Xuất UI/UX

Đánh giá theo các tiêu chí:

- [ ] **Hierarchy thị giác**: Điều mắt người dùng nhìn vào đầu tiên có đúng không?
- [ ] **Nhất quán**: Font, màu, spacing có đồng bộ với design system IruKa Edu không?
- [ ] **Phản hồi tương tác**: Có hover/focus/active states đầy đủ không?
- [ ] **Responsive**: Giao diện có hoạt động tốt trên màn hình nhỏ hơn không?
- [ ] **Accessibility**: Có label, aria-label cho screen reader không?
- [ ] **Micro-interaction**: Có animation/transition phù hợp không?
- [ ] **Thông báo lỗi**: Có hiển thị lỗi rõ ràng bằng tiếng Việt không?

---

## Bước 3 — Tổng hợp kết quả audit

Sau khi xong tất cả màn hình, tạo bảng tóm tắt:

| Màn hình   | Logic OK? | Tính năng thiếu | UI/UX cần sửa | Mức ưu tiên |
| ---------- | --------- | --------------- | ------------- | ----------- |
| login-gate | ✅/❌     | ...             | ...           | 🔴/🟡/🟢    |
| overview   | ✅/❌     | ...             | ...           | ...         |
| chat       | ✅/❌     | ...             | ...           | ...         |
| ...        | ...       | ...             | ...           | ...         |

Mức ưu tiên: 🔴 Gấp | 🟡 Nên làm | 🟢 Có thể làm sau

---

## Bước 4 — Lên kế hoạch xử lý

Từ bảng tổng hợp trên:

1. Nhóm các vấn đề theo **phạm vi sửa chữa** (chỉ CSS, chỉ logic, cần backend...)
2. Ưu tiên các vấn đề có ảnh hưởng trực tiếp đến trải nghiệm người dùng cuối
3. Tạo implementation_plan.md cho từng nhóm sửa đổi lớn
4. Trình bày để người dùng duyệt trước khi triển khai

---

## Ghi chú sử dụng

- Workflow này chạy từng bước tuần tự, không nhảy sai thứ tự
- Ưu tiên audit **login-gate** và **chat** trước vì đây là 2 màn hình người dùng gặp nhiều nhất
- Không sửa code trong workflow này — chỉ phân tích và ghi nhận
- Sau khi audit xong, dùng `/plan-task` hoặc `/code-frontend` để triển khai
