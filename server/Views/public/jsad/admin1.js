const { response } = require('express');

require('dotenv').config();
function openADDnv() {
    closeLogin();
    document.querySelector('.AddNhanVien').classList.add('show');
}

function openSUAnv() {
    closeLogin();
    document.querySelector('.SuaNhanVien').classList.add('show');
}

function openDELnv() {
    closeLogin();
    document.querySelector('.XoaNhanVien').classList.add('show');
}

function openADDma() {
    closeLogin();
    document.querySelector('.AddMonAn').classList.add('show');
}

function openSUAma() {
    closeLogin();
    document.querySelector('.SuaMonAn').classList.add('show');
}

function openDELma() {
    closeLogin();
    document.querySelector('.XoaMonAn').classList.add('show');
}

function openADDkm() {
    closeLogin();
    document.querySelector('.AddKhuyenMai').classList.add('show');
}

function openSUAkm() {
    closeLogin();
    document.querySelector('.SuaKhuyenMai').classList.add('show');
}

function openDELkm() {
    closeLogin();
    document.querySelector('.XoaKhuyenMai').classList.add('show');
}

function closeLogin() {
    const elements = document.querySelectorAll('[class*="NhanVien"].show');
    const elementss = document.querySelectorAll('[class*="MonAn"].show');
    const elementsss = document.querySelectorAll('[class*="KhuyenMai"].show');
    elements.forEach(function (element) {
        element.classList.remove('show');
    });
    elementss.forEach(function (element) {
        element.classList.remove('show');
    });
    elementsss.forEach(function (element) {
        element.classList.remove('show');
    });
}
