const Promotion = require('../../Models/models/promotion');
const asyncHandler = require('express-async-handler');
const create_id = require('../../utils/create_id');

const createPromotion = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    var startTime = new Date(req.body.startTime);
    var endTime = new Date(req.body.endTime);
    console.log(startTime, endTime);
    if (!title || !description || !startTime || !endTime) {
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs',
        });
    }
    req.body.promotionid = create_id.string_to_slug(req.body.title);
    const newPromotion = await Promotion.create(req.body);
    return res.status(200).json({
        success: newPromotion ? true : false,
        mes: newPromotion ? 'Successsfully ! ' : 'Somethings went wrong :(',
    });
});

const updatePromotion = asyncHandler(async (req, res) => {
    const { promotionid } = req.body;
    // Check input
    const slug = create_id.string_to_slug(promotionid);
    if (slug !== promotionid) {
        return res.status(404).json({
            success: false,
            mes: 'Promotionid invalid !',
        });
    }
    // Find in database
    const promotion = await Promotion.findOne({ promotionid: promotionid });
    if (promotion === null) {
        return res.status(404).json({
            success: false,
            mes: 'Product not found !',
        });
    }
    if (req.body.title === '') req.body.title = promotion.title;
    if (req.body.description === '') req.body.description = promotion.description;
    if (req.body.startTime === '') req.body.startTime = promotion.startTime;
    if (req.body.endTime === '') req.body.endTime = promotion.endTime;
    req.body.promotionid = create_id.string_to_slug(req.body.title);
    const response = await Promotion.findByIdAndUpdate(promotion._id, req.body, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        updatedPromotion: response ? response : 'Somethings went wrong... ',
    });
});

const deletedPromotion = asyncHandler(async (req, res) => {
    const { promotionid } = req.body;
    // Check input
    const slug = create_id.string_to_slug(promotionid);
    if (slug !== promotionid) {
        return res.status(404).json({
            success: false,
            mes: 'Promotionid invalid !',
        });
    }
    const promotion = await Promotion.findOne({ promotionid: promotionid });
    if (promotion === null) {
        return res.status(404).json({
            success: false,
            mes: 'Promotion not found !',
        });
    }
    const response = await Promotion.findByIdAndDelete(promotion._id);
    return res.status(200).json({
        success: response ? true : false,
        deletedPromotion: response ? 'Deleted Promotion !' : 'Somethings went wrong... ',
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
