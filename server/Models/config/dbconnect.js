// const { default: mongoose } = require('mongoose');

// const dbConnect = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGODB_URI);
//         if (conn.connection.readyState === 1) {
//             console.log('Database connected!');
//         } else {
//             console.log('Database connecting ...');
//         }
//     } catch (error) {
//         console.log('Database connection is failed!');
//         throw new Error(error);
//     }
// };

// module.exports = dbConnect;
const { default: mongoose } = require('mongoose');

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        if (conn.connection.readyState === 1) {
            console.log('Database connected!');

            // Thêm một bản ghi vào cơ sở dữ liệu (nếu bản ghi chưa tồn tại)
            const adminAccount = {
                firstname: 'Huệ',
                lastname: 'Đức',
                email: 'duchue@gmail.com',
                mobile: '0123456789',
                password: 'duchue9999',
            };
            const Admin = require('../models/admin');
            const existingAccount = await Admin.findOne({ email: adminAccount.email });
            if (!existingAccount) {
                // Admin.insertMany(adminAccount);
                Admin.create(adminAccount);
                console.log('1 document inserted');
            } else {
                console.log('Document already exists');
            }
        } else {
            console.log('Database connecting ...');
        }
    } catch (error) {
        console.log('Database connection is failed!');
        throw new Error(error);
    }
};

module.exports = dbConnect;
