const Product = require('../../Models/models/product');
const asyncHandler = require('express-async-handler');
const create_id = require('../../utils/create_id');
const { checkPrice, delZeroInFirst } = require('../../utils/checkPrice');

const addProduct = asyncHandler(async (req, res) => {
    const { title, price, tag } = req.body;
    if (!title) {
        return res.status(400).json({
            success: false,
            mes: 'Hãy nhập tên món ăn!',
        });
    } else {
        req.body.productid = create_id.string_to_slug(req.body.title);
    }
    if (!price) {
        return res.status(400).json({
            success: false,
            mes: 'Hãy nhập giá món ăn!',
        });
    } else if (!checkPrice) {
        return res.status(413).json({
            success: false,
            mes: 'Giá tiền không hợp lệ! (1 -> 9999)',
        });
    } else {
        req.body.price = delZeroInFirst(price);
    }
    if (tag === null) {
        return res.status(400).json({
            success: false,
            mes: 'Hãy chọn phân loại món ăn!',
        });
    }
    // if  product existed
    const product = await Product.findOne({ productid: req.body.productid });
    if (product) {
        return res.status(200).json({
            success: false,
            mes: 'Món ăn đã tồn tại, hãy chọn tên món ăn khác!',
        });
    } else {
        const newProduct = await Product.create(req.body);
        return res.status(200).json({
            success: newProduct ? true : false,
            mes: newProduct ? 'Thêm món ăn thành công !' : 'Thêm món ăn không thành công!',
        });
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    // if (Object.keys(req.body).length === 0) throw new Error('Missing inputs !');
    const { productid } = req.body;
    if (productid === '') {
        return res.status(400).json({
            success: false,
            mes: 'Hãy nhập mã món ăn!',
        });
    } else {
        // Check input
        const slug = create_id.string_to_slug(productid);
        if (slug !== productid) {
            return res.status(400).json({
                success: false,
                mes: 'Mã sản phẩm không đúng đinh dạng!',
            });
        }
    }
    // Find in database
    const product = await Product.findOne({ productid: productid });
    if (!product) {
        return res.status(404).json({
            success: false,
            mes: 'Không tìm thấy món ăn!',
        });
    }

    var { title, tag, price, description } = req.body;
    if (title === '' && tag === null && price === '' && description === '') {
        return res.status(422).json({
            success: false,
            mes: 'Cần nhập ít nhất một thông tin để cập nhật!',
        });
    }
    // if (tag === '') tag = product.tag;
    if (req.body.title === '') {
        req.body.title = product.title;
    } else {
        // tạo productid mới
        req.body.productid = create_id.string_to_slug(title);
    }
    if (tag === null) req.body.tag = product.tag;
    if (req.body.price === '') {
        req.body.price = product.title;
    } else if (price > 99999 || price < 0 || price === 0) {
        return res.status(413).json({
            success: false,
            mes: 'Mức giá không hợp lệ!',
        });
    }
    if (req.body.description === '') req.body.description = product.description;
    const updatedProduct = await Product.findByIdAndUpdate(product._id, req.body, { new: true });
    return res.status(200).json({
        success: updatedProduct ? true : false,
        mes: updatedProduct ? 'Cập nhật thành công!' : 'Somethings went wrong... ',
    });
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { productid } = req.body;
    // productid bỏ trống
    if (productid === '') {
        return res.status(422).json({
            success: false,
            mes: 'Hãy điền mã món ăn!',
        });
    } else {
        // Check input
        const slug = create_id.string_to_slug(productid);
        // productid Nhập không đúng định dạng
        if (slug !== productid) {
            return res.status(400).json({
                success: false,
                mes: 'Mã món ăn không đúng định dạng!',
            });
        }
    }
    const product = await Product.findOne({ productid: productid });
    if (product === null) {
        return res.status(404).json({
            success: false,
            mes: 'Không tìm thấy món ăn!',
        });
    }
    const response = await Product.findByIdAndDelete(product._id);
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Đã xoá món ăn!' : 'Somethings went wrong... ',
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
