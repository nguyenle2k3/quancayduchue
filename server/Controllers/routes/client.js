const router = require('express').Router();
const ctrls = require('../controller/client');
const ctrlsAdmin = require('../controller/admin');
const ctrlsProduct = require('../controller/product');
// const { verifyAccessToken, isAdmin } = require('../middleware/verifyToken');

router.get('/home', ctrls.renderHomePage);
router.get('/hots', ctrls.renderHotsPage);
router.get('/datamenu', ctrlsProduct.getAllProduct);
router.get('/testmenu', ctrls.renderTest);
router.get('/menu', ctrls.renderMenuPage);
router.get('/contact', ctrls.renderContactPage);
router.get('/aboutus', ctrls.renderAboutUsPage);
router.get('/login', ctrls.renderLoginPage);
router.post('/login', ctrlsAdmin.login);

module.exports = router;
