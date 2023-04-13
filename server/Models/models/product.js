const mongoose = require('mongoose'); // Erase if already required
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
    {
        // Mã món ăn
        productid: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        // Tên món ăn
        title: {
            type: String,
            required: true,
        },
        // Phân loại
        tag: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
        },
        // giá
        price: {
            type: Number,
            required: true,
        },
        // mô tả
        description: {
            type: String,
        },
        // hình ảnh
        image: {
            type: Buffer,
            contentType: String,
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
module.exports = mongoose.model('Product', productSchema);
