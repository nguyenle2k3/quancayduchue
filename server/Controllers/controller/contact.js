const Contact = require('../../Models/models/contact');
const asyncHandler = require('express-async-handler');
const { isPhoneNumber } = require('../../utils/isPhoneNumber');

const addContact = asyncHandler(async (req, res) => {
    const { title, address, phone, email } = req.body;
    if (!title) {
        return res.status(400).json({
            success: false,
            mes: 'Hãy nhập tên cơ sở!',
        });
    }
    if (!address) {
        return res.status(400).json({
            success: false,
            mes: 'Hãy nhập địa chỉ',
        });
    }
    if (!phone) {
        return res.status(400).json({
            success: false,
            mes: 'Hãy nhập số điện thoại!',
        });
    } else {
        if (!isPhoneNumber(phone)) {
            return res.status(400).json({
                success: false,
                mes: 'Số điện thoại không hợp lệ!',
            });
        }
    }
    if (!email) {
        return res.status(400).json({
            success: false,
            mes: 'Hãy nhập email!',
        });
    }
    // if contact existed
    const contact = await Contact.findOne({ title });
    if (contact) {
        return res.status(401).json({
            success: false,
            mes: 'Cơ sở đã tồn tại!',
        });
    } else {
        const newContact = await Contact.create(req.body);
        return res.status(200).json({
            success: newContact ? true : false,
            mes: newContact ? 'Thêm mới thành công!' : 'Somethings went wrong :(',
        });
    }
});

const updateContact = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs !');
    const { title } = req.body;
    if (title === '') {
        return res.status(400).json({
            success: false,
            mes: 'Hãy nhập tên cơ sở!',
        });
    }
    const contact = await Contact.findOne({ title });
    if (contact === null) {
        return res.status(404).json({
            success: false,
            mes: 'Không tìm thấy tên cơ sở!',
        });
    }
    const { address, phone, email } = req.body;
    if (address === '' && phone === '' && email === '') {
        return res.status(422).json({
            success: false,
            mes: 'Nhập ít nhất một thông tin cần thay đổi!',
        });
    }
    if (req.body.address === '') req.body.address = contact.address;
    if (req.body.phone === '') {
        req.body.phone = contact.phone;
    } else {
        if (!isPhoneNumber(phone)) {
            return res.status(400).json({
                success: false,
                mes: 'Số điện thoại không hợp lệ!',
            });
        }
    }
    if (req.body.email === '') req.body.email = contact.email;
    const response = await Contact.findByIdAndUpdate(contact._id, req.body, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Cập nhật thành công!' : 'Somethings went wrong... ',
    });
});

const deleteContact = asyncHandler(async (req, res) => {
    const { title } = req.body;
    if (title === '') {
        return res.status(400).json({
            success: false,
            mes: 'Hãy nhập tên cơ sở!',
        });
    }
    const contact = await Contact.findOne({ title });
    if (contact === null) {
        return res.status(404).json({
            success: false,
            mes: 'Không tìm thấy tên cơ sở!',
        });
    }
    const response = await Contact.findByIdAndDelete(contact._id);
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Đã xoá thành công!' : 'Somethings went wrong... ',
    });
});

const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({}).select('-_id -createAt -updateAt');
    return res.status(200).json({
        success: true,
        contacts,
    });
});

module.exports = {
    addContact,
    updateContact,
    deleteContact,
    getAllContacts,
};
