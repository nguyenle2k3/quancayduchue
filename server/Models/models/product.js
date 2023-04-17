const mongoose = require('mongoose'); // Erase if already required

const fs = require('fs');
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
        // giá
        price: {
            type: String,
            required: true,
        },
        // mô tả
        description: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);
//Export the model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
