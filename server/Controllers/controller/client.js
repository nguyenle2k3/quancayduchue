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
    renderTest,
};

async function renderTest(req, res) {
    // console.log(req);
    res.sendFile(path.join(__dirname, '../../Views/views/testmenu.html'));
    const { getAllProduct } = require('./product');

    try {
        const response = await getAllProduct(req, res);
        const { data } = response;
        res.render(path.join(__dirname, '../../Views/views/menu.html'), { data });
    } catch (error) {
        console.log(error);
    }
}
function renderHomePage(req, res) {
    // console.log(req);
    res.sendFile(path.join(__dirname, '../../Views/views/homepage.html'));
}
function renderContactPage(req, res) {
    // console.log(req);
    res.sendFile(path.join(__dirname, '../../Views/views/contact.html'));
}
function renderMenuPage(req, res) {
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
