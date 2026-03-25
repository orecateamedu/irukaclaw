#!/bin/bash
# =============================================================
# TÊN: Auto-Retry Antigravity
# MỤC ĐÍCH: Tự động click nút "Retry" khi Antigravity bị lỗi
#            để không cần nhấn tay mỗi lần agent bị gián đoạn.
# CÁCH DÙNG: Chạy lệnh "auto-retry" trong terminal
# =============================================================

# Thông báo khi script bắt đầu chạy
echo "🤖 Auto-Retry Antigravity đang chạy... (Ctrl+C để dừng)"

# Danh sách tên process có thể có của app Antigravity
# (thử lần lượt vì tên process có thể khác nhau tùy phiên bản)
PROCESSES=("Antigravity" "antigravity" "OpenClaw" "Electron")

# Vòng lặp vô tận — kiểm tra mỗi 5 giây một lần
while true; do

  # Duyệt qua từng tên process trong danh sách
  for PROC in "${PROCESSES[@]}"; do

    # Dùng AppleScript để điều khiển giao diện app
    result=$(osascript 2>/dev/null << APPLESCRIPT
      tell application "System Events"
        -- Kiểm tra xem process có đang chạy không
        if exists process "$PROC" then
          tell process "$PROC"
            try
              -- Lấy danh sách tất cả cửa sổ đang mở
              set allWindows to every window
              repeat with w in allWindows
                try
                  -- Tìm nút có tên "Retry" trong cửa sổ đó
                  set retryBtn to button "Retry" of w
                  -- Nếu tìm thấy thì click vào
                  click retryBtn
                  return "clicked:$PROC"
                end try
              end repeat
            end try
          end tell
        end if
      end tell
      return "not_found"
APPLESCRIPT
)

    # Nếu đã click được thì in thông báo và thoát vòng lặp for
    if [[ "$result" == clicked:* ]]; then
      echo "[$(date '+%H:%M:%S')] ✅ Đã tự động click Retry (app: $PROC)"
      break
    fi
  done

  # Chờ 5 giây trước khi kiểm tra lần tiếp theo
  sleep 5
done
