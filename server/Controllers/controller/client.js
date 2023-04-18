const path = require('path');
const handlebars = require('handlebars');
const fs = require('fs');
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
    res.sendFile(path.join(__dirname, '../../Views/views/homepage.html'));
}
function renderContactPage(req, res) {
    res.sendFile(path.join(__dirname, '../../Views/views/contact.html'));
}
function renderMenuPage(req, res) {
    res.sendFile(path.join(__dirname, '../../Views/views/menu.html'));
}

function renderHotsPage(req, res) {
    res.sendFile(path.join(__dirname, '../../Views/views/hots.html'));
}
function renderAboutUsPage(req, res) {
    res.sendFile(path.join(__dirname, '../../Views/views/aboutus.html'));
}
function renderLoginPage(req, res) {
    res.sendFile(path.join(__dirname, '../../Views/views/login.html'));
}
