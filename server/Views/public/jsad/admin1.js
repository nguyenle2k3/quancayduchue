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
// event handler
// window.addEventListener('DOMContentLoaded', function () {
const outputDiv = document.querySelector('#output');
const formADDnv = document.querySelector('#addNVform');
const formSuanv = document.querySelector('#suaNVform');
const formXoanv = document.querySelector('#xoaNVform');
const formADDma = document.querySelector('#addMonAnform');
const formSUAma = document.querySelector('#suaMonAnform');
const formXoama = document.querySelector('#xoaMonAnform');
// const formADDkm = document.querySelector('#addKhuyenMaiform');
const formADDkm = document.querySelector('#formADDkm');
const formSUAkm = document.querySelector('#suaKhuyenMaiform');
const formXoakm = document.querySelector('#xoaKhuyenMaiform');

// Them Thong tin Nha hang
formADDnv.addEventListener('submit', function (event) {
    event.preventDefault();
    // dia chi nha hang
    let name = formADDnv.querySelector('input[name="name"]').value;
    // so dien thoai
    let phoneNumber = formADDnv.querySelector('input[name="phone-number"]').value;
    // Email
    let email = formADDnv.querySelector('input[name="email"]').value;

    var xhttp = new XMLHttpRequest();

    var url = 'http://127.0.0.1:5000/api/information/add';
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    var data = JSON.stringify({ name, phoneNumber, email });
    xhttp.send(data);
});

// Sua Thong tin Nha hang
formSuanv.addEventListener('submit', function (event) {
    event.preventDefault();
    // dia chi nha hang
    let name = formSuanv.querySelector('input[name="name"]').value;
    // so dien thoai
    let phoneNumber = formSuanv.querySelector('input[name="phone-number"]').value;
    // Email
    let email = formSuanv.querySelector('input[name="email"]').value;

    var xhttp = new XMLHttpRequest();

    var url = 'http://127.0.0.1:5000/api/information/update';
    xhttp.open('PUT', url, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    var data = JSON.stringify({ name, phoneNumber, email });
    xhttp.send(data);
});

// Xoa Thong tin Nha hang
formXoanv.addEventListener('submit', function (event) {
    event.preventDefault();
    let form = document.querySelector('#xoaNVform');
    // dia chi nha hang
    let name = form.querySelector('input[name="name"]').value;
    // so dien thoai
    let phoneNumber = form.querySelector('input[name="phone-number"]').value;
    // Email
    let email = form.querySelector('input[name="email"]').value;

    var xhttp = new XMLHttpRequest();

    var url = 'http://127.0.0.1:5000/api/information/delete';
    xhttp.open('DELETE', url, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    var data = JSON.stringify({ name, phoneNumber, email });
    xhttp.send(data);
});

// Them Mon An
formADDma.addEventListener('submit', function (event) {
    event.preventDefault();
    // let form = document.querySelector('#addMonAnform');
    // Ma Mon An
    // let productid = formADDma.querySelector('#maMon').value;
    // Ten Mon An
    let title = formADDma.querySelector('input[name="title"]').value;
    // Gia Mon An
    let price = formADDma.querySelector('input[name="price"]').value;
    // The Loai Mon An (Biến là: tagged)
    let tag = formADDma.querySelectorAll('input[name="tag"]');
    let tagged;
    for (let i = 0; i < tag.length; i++) {
        if (tag[i].checked) {
            tagged = tag[i].value;
            break;
        }
    }
    // Mieu Ta Mon An
    let description = formADDma.querySelector('input[name="description"]').value;
    // Anh Mon An
    let image = formADDma.querySelector('input[name="image"]').value;
    var xhttp = new XMLHttpRequest();

    var url = 'http://127.0.0.1:5000/api/product/add';
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    var data = JSON.stringify({ title, price, tag: tagged, description });
    xhttp.send(data);
    setTimeout(function () {
        closeLogin();
    }, 1000);
    outputDiv.innerHTML = 'Đang Thêm Món Ăn ...';
    document.getElementById('output').style.display = 'block';
    setTimeout(function () {
        outputDiv.innerHTML = 'Thêm Món Ăn (' + title + ') Thành Công!';
    }, 2000);
    setTimeout(function () {
        document.getElementById('output').style.display = 'none';
    }, 4500);
});

// Sua Mon An
formSUAma.addEventListener('submit', function (event) {
    event.preventDefault();
    // Ma Mon An
    let productid = formSUAma.querySelector('input[name="id"]').value;
    // Ten Mon An
    let title = formSUAma.querySelector('input[name="name"]').value;
    // Gia Mon An
    let price = formSUAma.querySelector('input[name="price"]').value;
    // Mieu Ta Mon An
    let description = formSUAma.querySelector('input[name="description"]').value;
    // Anh Mon An
    let image = formSUAma.querySelector('input[name="image"]').value;

    var xhttp = new XMLHttpRequest();

    var url = 'http://127.0.0.1:5000/api/product/update';
    xhttp.open('PUT', url, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    var data = JSON.stringify({ productid, title, price });
    xhttp.send(data);
});

// Xoa Mon An
formXoama.addEventListener('submit', function (event) {
    event.preventDefault();
    // Ma Mon An
    let productid = formXoama.querySelector('input[name="id"]').value;

    var xhttp = new XMLHttpRequest();

    var url = 'http://127.0.0.1:5000/api/product/delete';
    xhttp.open('DELETE', url, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    var data = JSON.stringify({ productid });
    xhttp.send(data);
});
// console.log('called');
// Them Khuyen Mai
// formADDkm.addEventListener('submit', function (event) {
//     console.log('called');
//     event.preventDefault();
//     // Tên Khuyến Mãi
//     let title = formADDkm.querySelector('input[name="title"]').value;
//     // Mô Tả Khuyến Mãi
//     let description = formADDkm.querySelector('input[name="description"]').value;
//     // Thời Gian Bắt Đầu
//     let startTime = formADDkm.querySelector('input[name="startTime"]').value;
//     // Thời Gian Kết Thúc
//     let endTime = formADDkm.querySelector('input[name="endTime"]').value;

//     var xhttp = new XMLHttpRequest();
//     // console.log('called');

//     // var url = process.env.URL_ADD_PROMOTION;
//     var url = 'http://127.0.0.1:5000/api/promotion/add';
//     console.log(url);
//     xhttp.open('POST', url, true);
//     xhttp.setRequestHeader('Content-type', 'application/json');
//     var data = JSON.stringify({ title, description, startTime, endTime });
//     xhttp.send(data);
// });
// formADDkm.addEventListener('submit', function (event) {
//     event.preventDefault();
//     sendFormData();
// });
// const submitBtn = document.querySelector('#submitBtn');
// submitBtn.addEventListener('click', function () {
//     let title = formADDkm.querySelector('input[name="title"]').value;
//     let description = formADDkm.querySelector('input[name="description"]').value;
//     let startTime = formADDkm.querySelector('input[name="startTime"]').value;
//     let endTime = formADDkm.querySelector('input[name="endTime"]').value;

//     var xhttp = new XMLHttpRequest();
//     var url = 'http://127.0.0.1:5000/api/promotion/add';
//     xhttp.open('POST', url, true);
//     xhttp.setRequestHeader('Content-type', 'application/json');
//     var data = JSON.stringify({ title, description, startTime, endTime });
//     xhttp.send(data);
// });

// Sua Khuyen Mai
formSUAkm.addEventListener('submit', function (event) {
    event.preventDefault();
    // Tên Khuyến Mãi
    let title = formSUAkm.querySelector('input[name="name"]').value;
    // Mô Tả Khuyến Mãi
    let description = formSUAkm.querySelector('input[name="description"]').value;
    // Thời Gian Bắt Đầu
    let timeStart = formSUAkm.querySelector('input[name="time-start"]').value;
    // Thời Gian Kết Thúc
    let timeEnd = formSUAkm.querySelector('input[name="time-end"]').value;

    var xhttp = new XMLHttpRequest();

    var url = 'http://127.0.0.1:5000/api/sale/update';
    xhttp.open('PUT', url, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    var data = JSON.stringify({ title, description, timeStart, timeEnd });
    xhttp.send(data);
});

// Xoa Khuyen Mai
formXoakm.addEventListener('submit', function (event) {
    event.preventDefault();
    // Tên Khuyến Mãi
    let promotionid = formXoakm.querySelector('input[name="promotionid"]').value;

    var xhttp = new XMLHttpRequest();

    var url = 'http://127.0.0.1:5000/api/product/delete';
    xhttp.open('DELETE', url, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    var data = JSON.stringify({ promotionid });
    xhttp.send(data);
});
// });
