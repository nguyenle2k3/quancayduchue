const mongoose = require('mongoose'); // Erase if already required
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');

// Declare the Schema of the Mongo model
var contactSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        address: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
module.exports = mongoose.model('Contact', contactSchema);
