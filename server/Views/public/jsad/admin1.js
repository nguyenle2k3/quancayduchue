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

window.addEventListener('DOMContentLoaded', function () {
    const outputDiv = document.querySelector('#output');
    const formADDnv = document.querySelector('#addNVform');
    const formSuanv = document.querySelector('#suaNVform');
    const formXoanv = document.querySelector('#xoaNVform');
    const formADDma = document.querySelector('#addMonAnform');
    const formSUAma = document.querySelector('#suaMonAnform');
    const formXoama = document.querySelector('#xoaMonAnform');
    const formADDkm = document.querySelector('#addKhuyenMaiform');
    const formSUAkm = document.querySelector('#suaKhuyenMaiform');
    const formXoakm = document.querySelector('#xoaKhuyenMaiform');

    formADDnv.addEventListener('submit', function (event) {
        event.preventDefault();
        outputDiv.innerHTML = 'Thêm Thông Tin Thành Công!';
        document.getElementById('output').style.display = 'block';
        setTimeout(function () {
            window.location.href = 'admin.html';
        }, 2000);
    });

    formSuanv.addEventListener('submit', function (event) {
        event.preventDefault();
        outputDiv.innerHTML = 'Sửa Thông Tin Thành Công!';
        document.getElementById('output').style.display = 'block';
        setTimeout(function () {
            window.location.href = 'admin.html';
        }, 2000);
    });

    formXoanv.addEventListener('submit', function (event) {
        event.preventDefault();
        outputDiv.innerHTML = 'Xóa Thông Tin Thành Công!';
        document.getElementById('output').style.display = 'block';
        setTimeout(function () {
            window.location.href = 'admin.html';
        }, 2000);
    });

    formADDma.addEventListener('submit', function (event) {
        event.preventDefault();
        let infor = document.getElementById('maMon').value;
        outputDiv.innerHTML = 'Thêm Món Ăn (' + infor + ') Thành Công!';
        document.getElementById('output').style.display = 'block';
        setTimeout(function () {
            window.location.href = 'admin.html';
        }, 2000);
    });

    formSUAma.addEventListener('submit', function (event) {
        event.preventDefault();
        outputDiv.innerHTML = 'Sửa Món Ăn Thành Công!';
        document.getElementById('output').style.display = 'block';
        setTimeout(function () {
            window.location.href = 'admin.html';
        }, 2000);
    });

    formXoama.addEventListener('submit', function (event) {
        event.preventDefault();
        outputDiv.innerHTML = 'Xóa Món Ăn Thành Công!';
        document.getElementById('output').style.display = 'block';
        setTimeout(function () {
            window.location.href = 'admin.html';
        }, 2000);
    });

    formADDkm.addEventListener('submit', function (event) {
        event.preventDefault();
        outputDiv.innerHTML = 'Thêm Khuyến Mãi Thành Công!';
        document.getElementById('output').style.display = 'block';
        setTimeout(function () {
            window.location.href = 'admin.html';
        }, 2000);
    });

    formSUAkm.addEventListener('submit', function (event) {
        event.preventDefault();
        outputDiv.innerHTML = 'Sửa Khuyến Mãi Thành Công!';
        document.getElementById('output').style.display = 'block';
        setTimeout(function () {
            window.location.href = 'admin.html';
        }, 2000);
    });

    formXoakm.addEventListener('submit', function (event) {
        event.preventDefault();
        outputDiv.innerHTML = 'Xóa Khuyến Mãi Thành Công!';
        document.getElementById('output').style.display = 'block';
        setTimeout(function () {
            window.location.href = 'admin.html';
        }, 2000);
    });
});
