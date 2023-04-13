const router = require('express').Router();
const ctrls = require('../controller/admin');
const { verifyAccessToken } = require('../middleware/verifyToken');

router.get('/', verifyAccessToken, ctrls.renderAdminPage);
router.post('/register', ctrls.register);
router.post('/login', ctrls.login);
// router.get('/current', verifyAccessToken, ctrls.getCurrent);
router.post('/refreshtoken', ctrls.refreshAccessToken);
router.get('/logout', ctrls.logout);
router.get('/forgotpassword', ctrls.forgotPassword);
router.put('/resetpassword', ctrls.resetPassword);

module.exports = router;

// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETE
// Create (Post) + Put - Gửi ở body -> data bị giấu
// Get + Delete - Gửi ở Query -> data: url:....?asadhasjdh
