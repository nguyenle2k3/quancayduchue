const Promotion = require('../../Models/models/promotion');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const createPromotion = asyncHandler(async (req, res) => {
    console.log(req.body);
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
    req.body.slug = slugify(req.body.title, { replacement: '', lower: true });
    req.body.promotionid = req.body.slug;
    const newPromotion = await Promotion.create(req.body);
    return res.status(200).json({
        success: newPromotion ? true : false,
        mes: newPromotion ? 'Successsfully ! ' : 'Somethings went wrong :(',
    });
});

const updatePromotion = asyncHandler(async (req, res) => {
    const { promotionid } = req.body;
    const promotion = await Promotion.findOne({ promotionid: promotionid });
    if (promotion === null) {
        return res.status(404).json({
            success: false,
            mes: 'Product not found !',
        });
    }
    const response = await Promotion.findByIdAndUpdate(promotion._id, req.body, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        updatedPromotion: response ? response : 'Somethings went wrong... ',
    });
});

const deletedPromotion = asyncHandler(async (req, res) => {
    const { promotionid } = req.body;
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
module.exports = {
    createPromotion,
    updatePromotion,
    deletedPromotion,
};
