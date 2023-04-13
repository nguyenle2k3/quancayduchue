const router = require('express').Router();
const ctrls = require('../controller/client');
const ctrlsAdmin = require('../controller/admin');
// const { verifyAccessToken, isAdmin } = require('../middleware/verifyToken');

router.get('/home', ctrls.renderHomePage);
router.get('/hots', ctrls.renderHotsPage);
router.get('/menu', ctrls.renderMenuPage);
router.get('/contact', ctrls.renderContactPage);
router.get('/aboutus', ctrls.renderAboutUsPage);
router.get('/login', ctrls.renderLoginPage);
router.post('/login', ctrlsAdmin.login);

module.exports = router;
