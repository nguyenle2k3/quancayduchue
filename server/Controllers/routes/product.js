const router = require('express').Router();
const ctrls = require('../controller/product');
const { verifyAccessToken } = require('../middleware/verifyToken');

verifyAccessToken;
router.post('/add', ctrls.addProduct);
router.put('/update', ctrls.updateProduct);
router.delete('/delete', ctrls.deleteProduct);

module.exports = router;
