const router = require('express').Router();
const ctrls = require('../controller/product');
const { verifyAccessToken } = require('../middleware/verifyToken');

verifyAccessToken;
router.post('/add', ctrls.addProduct);
router.post('/update', ctrls.updateProduct);
router.post('/delete', ctrls.deleteProduct);
router.get('/', ctrls.getAllProduct);

module.exports = router;
