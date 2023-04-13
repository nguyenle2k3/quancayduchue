const { default: mongoose } = require('mongoose');

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        if (conn.connection.readyState === 1) {
            console.log('Database connected!');
        } else {
            console.log('Database connecting ...');
        }
    } catch (error) {
        console.log('Database connection is failed!');
        throw new Error(error);
    }
};

module.exports = dbConnect;
