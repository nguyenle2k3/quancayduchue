const router = require('express').Router();
const ctrls = require('../controller/product');
const { verifyAccessToken } = require('../middleware/verifyToken');

router.post('/add', verifyAccessToken, ctrls.addProduct);
router.post('/update', verifyAccessToken, ctrls.updateProduct);
router.post('/delete', verifyAccessToken, ctrls.deleteProduct);
router.get('/datamenu', ctrls.getAllProduct);

module.exports = router;
