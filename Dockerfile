# 1. Chọn Base Image (Nền tảng): Node.js bản nhẹ (Alpine) 
FROM node:18-alpine 
# 2. Tạo thư mục làm việc trong Container 
WORKDIR /app 
# 3. Copy file định nghĩa thư viện trước (để tận dụng Cache) 
COPY package*.json ./ 
# 4. Cài đặt thư viện (Dependencies) 
RUN npm install 
# 5. Copy toàn bộ source code vào trong Container 
# (Lệnh này sẽ bỏ qua những file đã liệt kê trong .dockerignore) 
COPY . . 
# 6. Khai báo port mà ứng dụng sẽ chạy (chỉ để document, không mở port thật sự) 
EXPOSE 3000 
# 7. Lệnh mặc định để chạy ứng dụng khi container khởi động 
CMD ["npm", "start"]