const Product = require('../../Models/models/product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const addProduct = asyncHandler(async (req, res) => {
    const { title, price, tag } = req.body;
    if (!title || !price || !tag) {
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs',
        });
    }
    if (req.body && req.body.title) {
        req.body.slug = slugify(req.body.title, { replacement: '', lower: true });
        req.body.productid = req.body.slug;
    }
    // if  product existed
    const product = await Product.findOne({ productid: req.body.productid });
    if (product) {
        throw new Error('Product has existed ! ');
    } else {
        const newProduct = await Product.create(req.body);
        return res.status(200).json({
            success: newProduct ? true : false,
            mes: newProduct ? 'Creatte successfully !' : 'Somethings went wrong :(',
        });
    }
});

// const updateProduct = asyncHandler(async (req, res) => {
//     const { pid } = req.body;
//     if (Object.keys(req.body).length === 0) throw new Error('Missing inputs !');
//     const response = await Product.findByIdAndUpdate(pid, req.body, { new: true });
//     return res.status(200).json({
//         success: response ? true : false,
//         updatedProduct: response ? response : 'Somethings went wrong... ',
//     });
// });

const updateProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs !');
    const { productid } = req.body;
    const product = await Product.findOne({ productid: productid });
    if (product === null) {
        return res.status(404).json({
            success: false,
            mes: 'Product not found !',
        });
    }
    const response = await Product.findByIdAndUpdate(product._id, req.body, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        updatedProduct: response ? response : 'Somethings went wrong... ',
    });
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { productid } = req.body;
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

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
};
