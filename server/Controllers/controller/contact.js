const Contact = require('../../Models/models/contact');
const asyncHandler = require('express-async-handler');

const addContact = asyncHandler(async (req, res) => {
    const { title, address, phone, email } = req.body;
    if (!title || !address || !phone || !email) {
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs',
        });
    }
    // if  information existed
    const contact = await Contact.findOne({ title });
    if (contact) {
        throw new Error('Information has existed ! ');
    } else {
        const newContact = await Contact.create(req.body);
        return res.status(200).json({
            success: newContact ? true : false,
            mes: newContact ? 'Creatte successfully !' : 'Somethings went wrong :(',
        });
    }
});

const updateContact = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs !');
    const { title } = req.body;
    const contact = await Contact.findOne({ title });
    if (contact === null) {
        return res.status(404).json({
            success: false,
            mes: 'Product not found !',
        });
    }
    if (req.body.address === '') req.body.address = contact.address;
    if (req.body.phone === '') req.body.phone = contact.phone;
    if (req.body.email === '') req.body.email = contact.email;
    const response = await Contact.findByIdAndUpdate(contact._id, req.body, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        updatedContact: response ? response : 'Somethings went wrong... ',
    });
});

const deleteContact = asyncHandler(async (req, res) => {
    const { title } = req.body;
    const contact = await Contact.findOne({ title });
    if (contact === null) {
        return res.status(404).json({
            success: false,
            mes: 'Contact not found !',
        });
    }
    const response = await Contact.findByIdAndDelete(contact._id);
    return res.status(200).json({
        success: response ? true : false,
        deletedContact: response ? 'Deleted Contact !' : 'Somethings went wrong... ',
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
