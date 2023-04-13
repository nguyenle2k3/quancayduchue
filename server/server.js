const express = require('express');
require('dotenv').config();
const dbConnect = require('./Models/config/dbconnect');
const initRoutes = require('./Controllers/routes');
const cookieParser = require('cookie-parser');
// let hbs = require('express-hbs');
const path = require('path');

const app = express();
app.use(cookieParser());
const port = process.env.PORT || 8888;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect();

// Khai báo sử dụng thư mục public để phục vụ các tài nguyên tĩnh
app.use(express.static(path.join(__dirname, '/Views/public')));
// Route trang chủ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'views', 'homepage.html'));
});
initRoutes(app);

// app.get('/hots', (req, res) => {
//     res.sendFile(path.join(__dirname, 'Views', 'views', 'hots.html'));
// });
// app.get('/menu', (req, res) => {
//     res.sendFile(path.join(__dirname, 'Views', 'views', 'menu.html'));
// });
// app.get('/contact', (req, res) => {
//     res.sendFile(path.join(__dirname, 'Views', 'views', 'contact.html'));
// });
// app.get('/aboutus', (req, res) => {
//     res.sendFile(path.join(__dirname, 'Views', 'views', 'aboutus.html'));
// });
// app.get('/admin', (req, res) => {
//     res.sendFile(path.join(__dirname, 'Views', 'views', 'admin.html'));
// });

app.listen(port, () => {
    console.log('Server running on the port ' + port);
});
