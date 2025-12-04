// Import các thư viện cần thiết
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { create } from "express-handlebars";
import session from "express-session"; // Import session

// Khởi tạo ứng dụng Express
const app = express();
const port = 3000;

// Tạo biến __dirname (cần thiết cho module ES)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Cấu hình Handlebars ---
const hbs = create({
  extname: ".hbs",
  layoutsDir: "views/layouts/",
  defaultLayout: "main",
  helpers: {
    // Helper so sánh hai giá trị
    ifEquals: function (a, b, options) {
      return a === b ? options.fn(this) : options.inverse(this);
    },
    // Helper lặp lại khối n lần (ví dụ phân trang)
    pages: function (n, options) {
      let accum = "";
      for (let i = 1; i <= n; ++i) {
        options.data.index = i;
        options.data.first = i === 1;
        options.data.last = i === n;
        accum += options.fn(i);
      }
      return accum;
    },
    // Helper cộng hai số
    sum: (a, b) => a + b,
  },
});

// Đăng ký Handlebars làm view engine
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

// --- Cấu hình Middleware ---

// Cấu hình phục vụ file tĩnh và xử lý form
app.use("/imgs", express.static(__dirname + "/assets/imgs"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình Session Middleware
app.use(
  session({
    secret: "your_secret_key", // NÊN THAY BẰNG CHUỖI BÍ MẬT KHÁC
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Đặt là 'true' nếu chạy trên HTTPS (production)
  })
);

// --- Import và Sử dụng Router ---

// Import các router
import homeRouter from "./routers/home.r.js";
import categoryRouter from "./routers/category.r.js";
import productRouter from "./routers/product.r.js";
import authRouter from "./routers/auth.r.js"; // Import Auth Router

// Sử dụng các router
app.use("/", homeRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/auth", authRouter); // Sử dụng Auth Router

// --- Khởi động Server ---
app.listen(port, () =>
  console.log(`Example app listening on http://localhost:${port}`)
);
