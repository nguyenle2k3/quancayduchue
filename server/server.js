const express = require('express');
require('dotenv').config();
const dbConnect = require('./Models/config/dbconnect');
const initRoutes = require('./Controllers/routes');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

// Tạo đối tượng ứng dụng Express
const app = express();
const baseurl = process.env.URL_SERVER;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', baseurl);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

initRoutes(app);

app.listen(port, () => {
    console.log('Server running on the port ' + port);
});
