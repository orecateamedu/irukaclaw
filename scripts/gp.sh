#!/usr/bin/env zsh
# gp - Git push nhanh cho dự án irukaclaw
# Cách dùng: gp "nội dung commit"
# Chạy được từ bất kỳ thư mục nào trong terminal irukaclaw

IRUKA_DIR=~/Desktop/work-space/irukaclaw

if [ -z "$1" ]; then
  echo "❌ Thiếu nội dung commit. Cách dùng: gp \"mô tả thay đổi\""
  exit 1
fi

echo "📦 Đang đẩy code lên GitHub với nội dung: \"$1\""

cd "$IRUKA_DIR" || { echo "❌ Không thể vào thư mục $IRUKA_DIR"; exit 1; }

git add -A
git commit -m "$1"
git push

if [ $? -eq 0 ]; then
  echo "✅ Push thành công! Đã đẩy lên GitHub."
else
  echo "❌ Push thất bại. Kiểm tra kết nối mạng hoặc quyền trên GitHub."
fi
