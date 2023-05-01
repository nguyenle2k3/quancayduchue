const router = require('express').Router();
const ctrls = require('../controller/contact');
const { verifyAccessToken } = require('../middleware/verifyToken');

router.post('/add', verifyAccessToken, ctrls.addContact);
router.post('/update', verifyAccessToken, ctrls.updateContact);
router.post('/delete', verifyAccessToken, ctrls.deleteContact);
router.get('/datacontacts', ctrls.getAllContacts);

module.exports = router;
