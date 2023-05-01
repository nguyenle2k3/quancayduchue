const router = require('express').Router();
const ctrls = require('../controller/promotion');
const { verifyAccessToken } = require('../middleware/verifyToken');

router.post('/add', verifyAccessToken, ctrls.createPromotion);
router.post('/update', verifyAccessToken, ctrls.updatePromotion);
router.post('/delete', verifyAccessToken, ctrls.deletedPromotion);
router.get('/datapromotions', ctrls.getAllPromotions);

module.exports = router;

// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETE
// Create (Post) + Put - Gửi ở body -> data bị giấu
// Get + Delete - Gửi ở Query -> data: url:....?asadhasjdh
