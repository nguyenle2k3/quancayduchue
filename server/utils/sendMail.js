const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendMail = asyncHandler(async function ({ email, html }) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_NAME, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Quan Cay Duc Hue 👻" <No-Reply@duchue.com>', // sender address
        to: email, // list of receivers
        subject: 'Forgot password', // Subject line
        html: html, // html body
        envelope: {
            from: 'no-reply@example.com', // replace with your actual no-reply address
            to: email,
        },
    });

    return info;
});

module.exports = {
    sendMail,
};
