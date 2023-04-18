const Product = require('../../Models/models/product');
const asyncHandler = require('express-async-handler');
const create_id = require('../../utils/create_id');

const addProduct = asyncHandler(async (req, res) => {
    const { title, price, tag } = req.body;
    if (!title || !price || !tag) {
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs',
        });
    }
    if (req.body && req.body.title) {
        req.body.productid = create_id.string_to_slug(req.body.title);
    }
    // if  product existed
    const product = await Product.findOne({ productid: req.body.productid });
    if (product) {
        return res.status(200).json({
            success: false,
            mes: 'Product existed!',
        });
    } else {
        const newProduct = await Product.create(req.body);
        return res.status(200).json({
            success: newProduct ? true : false,
            mes: newProduct ? 'Creatte successfully !' : 'Somethings went wrong :(',
        });
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs !');
    const { productid } = req.body;
    // Check input
    const slug = create_id.string_to_slug(productid);
    if (slug !== productid) {
        return res.status(404).json({
            success: false,
            mes: 'Productid invalid !',
        });
    }
    // Find in database
    const product = await Product.findOne({ productid: productid });
    if (product === null) {
        return res.status(404).json({
            success: false,
            mes: 'Product not found !',
        });
    }
    if (req.body.title === '') req.body.title = product.title;
    if (req.body.tag === '') req.body.tag = product.tag;
    if (req.body.price === '') req.body.price = product.title;
    if (req.body.description === '') req.body.description = product.description;
    if (req.body.image === '') req.body.image = product.image;
    const response = await Product.findByIdAndUpdate(product._id, req.body, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        updatedProduct: response ? response : 'Somethings went wrong... ',
    });
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { productid } = req.body;
    // Check input
    const slug = create_id.string_to_slug(productid);
    if (slug !== productid) {
        return res.status(404).json({
            success: false,
            mes: 'Productid invalid !',
        });
    }
    const product = await Product.findOne({ productid: productid });
    if (product === null) {
        return res.status(404).json({
            success: false,
            mes: 'Product not found !',
        });
    }
    const response = await Product.findByIdAndDelete(product._id);
    return res.status(200).json({
        success: response ? true : false,
        deletedProduct: response ? 'Deleted Product !' : 'Somethings went wrong... ',
    });
});

const getAllProduct = asyncHandler(async (req, res) => {
    const products = await Product.find({}).select('-_id -createAt -updateAt');
    return res.status(200).json({
        success: true,
        products,
    });
});

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
};
