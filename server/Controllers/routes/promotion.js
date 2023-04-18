const router = require('express').Router();
const ctrls = require('../controller/promotion');
const { verifyAccessToken } = require('../middleware/verifyToken');

verifyAccessToken;

router.post('/add', ctrls.createPromotion);
router.post('/update', ctrls.updatePromotion);
router.post('/delete', ctrls.deletedPromotion);
router.get('/datapromotions', ctrls.getAllPromotions);

module.exports = router;

// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETE
// Create (Post) + Put - Gửi ở body -> data bị giấu
// Get + Delete - Gửi ở Query -> data: url:....?asadhasjdh
