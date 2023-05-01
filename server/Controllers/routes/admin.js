const router = require('express').Router();
const ctrls = require('../controller/admin');
const { verifyAccessToken } = require('../middleware/verifyToken');

router.post('/login', ctrls.login);
router.get('/', [verifyAccessToken], ctrls.renderAdminPage);
router.get('/logout', verifyAccessToken, ctrls.logout);
// router.post('/register', ctrls.register);
// router.post('/refreshtoken', ctrls.refreshAccessToken);
// router.get('/forgotpassword', ctrls.forgotPassword);
// router.put('/resetpassword', ctrls.resetPassword);

module.exports = router;

// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETE
// Create (Post) + Put - Gửi ở body -> data bị giấu
// Get + Delete - Gửi ở Query -> data: url:....?asadhasjdh
