const router = require('express').Router();
const ctrls = require('../controller/product');
const { verifyAccessToken } = require('../middleware/verifyToken');

verifyAccessToken;
router.post('/add', ctrls.addProduct);
router.get('/datamenu', ctrls.getAllProduct);
router.post('/update', ctrls.updateProduct);
router.post('/delete', ctrls.deleteProduct);

module.exports = router;
