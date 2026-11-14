# TAMAI TATTOO — Starter

Website tiếng Việt, giao diện dark modern tím/đen, responsive cho điện thoại.

## Có trong bản Starter
- Trang giới thiệu TAMAI TATTOO.
- AI Tattoo Generator gọi OpenAI Images API qua Netlify Function.
- TAMAI AI Chat gọi OpenAI Responses API qua Netlify Function.
- Tải ảnh PNG được tạo về thiết bị.
- Thư viện phong cách mẫu (nội dung minh họa).
- Cấu trúc serverless; API key chỉ nằm ở biến môi trường máy chủ.

## Triển khai trên Netlify
1. Đưa toàn bộ nội dung thư mục này vào repo GitHub `phamvantam16-netizen/Tamaitattoo`.
2. Trong Netlify, chọn Add new site → Import an existing project → GitHub → repo Tamaitattoo.
3. Build command để trống hoặc `npm run build`; Publish directory là `.`.
4. Site configuration → Environment variables → thêm `OPENAI_API_KEY` với API key của OpenAI.
5. Deploy lại site.

## Chạy thử cục bộ
- Cài Node.js.
- `npm install`
- `npx netlify dev`
- Thêm `OPENAI_API_KEY` vào biến môi trường hoặc file `.env` (không commit file `.env`).

## Bảo mật và giới hạn Starter
- Không bao giờ đặt API key trong `index.html`, mã JavaScript phía trình duyệt, hoặc repo công khai.
- Bản Starter chưa có đăng nhập, database, lưu thiết kế trên cloud, phân quyền admin, thanh toán, credits hoặc chống lạm dụng theo tài khoản. Các cuộc chat và ảnh chưa được lưu trên máy chủ; lịch sử chat chỉ ở phiên trình duyệt hiện tại.
- Trước khi mở công khai rộng rãi, cần bổ sung xác thực, giới hạn tốc độ/chi phí, kiểm soát quota, lưu trữ ảnh riêng tư và chính sách quyền riêng tư.
- Chi phí API OpenAI tính riêng với gói ChatGPT. Quyền truy cập model và image generation tùy thuộc tài khoản/API project.

## Mô hình AI
- Chat: `gpt-6-luna` qua `/v1/responses`.
- Image: `gpt-image-2.5-flare` qua `/v1/images/generations`.
