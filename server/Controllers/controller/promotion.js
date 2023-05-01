const Promotion = require('../../Models/models/promotion');
const asyncHandler = require('express-async-handler');
const create_id = require('../../utils/create_id');

const createPromotion = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    var startTime = new Date(req.body.startTime);
    var endTime = new Date(req.body.endTime);
    var today = new Date();

    if (!title || !description || !startTime || !endTime) {
        return res.status(422).json({
            success: false,
            mes: 'Hãy nhập đầy đủ thông tin!',
        });
    }
    req.body.promotionid = create_id.string_to_slug(req.body.title);
    const isExisted = await Promotion.findOne({ promotionid: req.body.promotionid });
    if (isExisted) {
        return res.status(400).json({
            success: false,
            mes: 'Tên khuyến mãi bị trùng, tạo mã không thành công!',
        });
    } else if (startTime > endTime || startTime < today || endTime < today) {
        return res.status(400).json({
            success: false,
            mes: 'Thời gian không hợp lệ!',
        });
    } else {
        const newPromotion = await Promotion.create(req.body);
        return res.status(200).json({
            success: newPromotion ? true : false,
            mes: newPromotion ? 'Thêm khuyến mãi thành công! ' : 'Thêm khuyến mãi không thành công',
        });
    }
});

const updatePromotion = asyncHandler(async (req, res) => {
    const { promotionid } = req.body;
    if (promotionid === '') {
        return res.status(422).json({
            success: false,
            mes: 'Hãy nhập mã món ăn!',
        });
    }
    // Check input
    const slug = create_id.string_to_slug(promotionid);
    if (slug !== promotionid) {
        return res.status(400).json({
            success: false,
            mes: 'Mã món ăn không đúng định dạng!',
        });
    }
    // Find in database
    const promotion = await Promotion.findOne({ promotionid: promotionid });
    if (promotion === null) {
        return res.status(400).json({
            success: false,
            mes: 'Không tìm thấy khuyễn mãi!',
        });
    }
    if (title === '' && description === '' && startTime === '' && endTime === '') {
        return res.status(422).json({
            success: false,
            mes: 'Cần cập nhật ít nhất một thông tin!',
        });
    }
    var { title, description, startTime, endTime } = req.body;

    // Check date update

    if (startTime === '') {
        if (endTime === '') {
            req.body.startTime = promotion.startTime;
            req.body.endTime = promotion.endTime;
        } else {
            var req_endTime = new Date(endTime);
            if (promotion.startTime > req_endTime) {
                return res.status(400).json({
                    success: false,
                    mes: 'Thời gian kết thúc khuyến mãi không được sớm hơn thời gian bắt đầu!',
                });
            }
        }
    } else {
        if (endTime === '') {
            var req_startTime = new Date(startTime);
            if (req_startTime > promotion.endTime) {
                return res.status(400).json({
                    success: false,
                    mes: 'Thời gian bắt đầu khuyến mãi không được muộn hơn thời gian kết thúc!',
                });
            }
        } else {
            var req_startTime = new Date(startTime);
            var req_endTime = new Date(endTime);
            if (req_startTime > req_endTime) {
                return res.status(400).json({
                    success: false,
                    mes: 'Thời gian bắt đầu khuyến mãi cần sớm hơn thời gian kết thúc!',
                });
            }
        }
    }

    if (req.body.title === '') {
        req.body.title = promotion.title;
    } else {
        // tạo mới promotionid theo title
        req.body.promotionid = create_id.string_to_slug(title);
    }
    if (req.body.description === '') req.body.description = promotion.description;
    const response = await Promotion.findByIdAndUpdate(promotion._id, req.body, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        mes: 'Cập nhật thành công',
        updatedPromotion: response ? response : 'Somethings went wrong... ',
    });
});

const deletedPromotion = asyncHandler(async (req, res) => {
    const { promotionid } = req.body;
    if (promotionid === '') {
        return res.status(422).json({
            success: false,
            mes: 'Hãy nhập mã khuyến mãi!',
        });
    }
    // Check input
    const slug = create_id.string_to_slug(promotionid);
    if (slug !== promotionid) {
        return res.status(400).json({
            success: false,
            mes: 'Mã khuyến mãi không đúng định dạng!',
        });
    }
    const promotion = await Promotion.findOne({ promotionid: promotionid });
    if (promotion === null) {
        return res.status(400).json({
            success: false,
            mes: 'Không tìm thấy khuyến mãi!',
        });
    }
    const response = await Promotion.findByIdAndDelete(promotion._id);
    return res.status(200).json({
        success: response ? true : false,
        mes: 'Xoá thành công!',
    });
});
const getAllPromotions = asyncHandler(async (req, res) => {
    const promotions = await Promotion.find({}).select('-_id -createAt -updateAt');
    res.status(200).json({
        success: true,
        promotions,
    });
    return;
});
module.exports = {
    createPromotion,
    updatePromotion,
    deletedPromotion,
    getAllPromotions,
};
