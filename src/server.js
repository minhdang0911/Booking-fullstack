import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import dotenv from 'dotenv';
import connectDb from './config/connectDb';
dotenv.config();

const app = express();

// Cấu hình app để sử dụng bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);

initWebRoutes(app);
 connectDb();

// Lấy cổng từ biến môi trường hoặc mặc định là 3000
const port = process.env.PORT || 3001;

// Lắng nghe các kết nối trên cổng đã cấu hình
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
