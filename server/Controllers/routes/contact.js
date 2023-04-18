const router = require('express').Router();
const ctrls = require('../controller/contact');
const { verifyAccessToken } = require('../middleware/verifyToken');

verifyAccessToken;
router.post('/add', ctrls.addContact);
router.post('/update', ctrls.updateContact);
router.post('/delete', ctrls.deleteContact);
router.get('/datacontacts', ctrls.getAllContacts);

module.exports = router;
