const path = require('path');
// Module public methods.
module.exports = {
    renderHomePage,
    renderContactPage,
    renderMenuPage,
    renderHotsPage,
    renderAboutUsPage,
    renderLoginPage,
};

function renderHomePage(req, res) {
    // console.log(req);
    res.sendFile(path.join(__dirname, '../../Views/views/homepage.html'));
}
function renderContactPage(req, res) {
    // console.log(req);
    res.sendFile(path.join(__dirname, '../../Views/views/contact.html'));
}
function renderMenuPage(req, res) {
    // console.log(req);
    res.sendFile(path.join(__dirname, '../../Views/views/menu.html'));
}
function renderHotsPage(req, res) {
    // console.log(req);
    res.sendFile(path.join(__dirname, '../../Views/views/hots.html'));
}
function renderAboutUsPage(req, res) {
    // console.log(req);
    res.sendFile(path.join(__dirname, '../../Views/views/aboutus.html'));
}
function renderLoginPage(req, res) {
    // console.log(req);
    res.sendFile(path.join(__dirname, '../../Views/views/login.html'));
}
