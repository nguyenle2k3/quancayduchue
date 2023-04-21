function login() {
    window.addEventListener('DOMContentLoaded', function () {
        const outputDiv = document.querySelector('#output');
        const form = document.querySelector('#login-form');
        const emailInput = form.querySelector('input[name="email"]');
        const passwordInput = form.querySelector('input[name="password"]');

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            let email = emailInput.value;
            let password = passwordInput.value;
            var xhttp = new XMLHttpRequest();

            var url = 'http://127.0.0.1:5000/api/admin/login';
            xhttp.open('POST', url, true);
            xhttp.setRequestHeader('Content-type', 'application/json');
            // xhttp.onreadystatechange = function () {

            //     if (this.status === 200) {
            //         setTimeout(function () {
            //             closeLogin();
            //         }, 1000);

            //         setTimeout(function () {
            //             outputDiv.innerHTML = 'Đăng nhập Thành Công!';
            //             outputDiv.style.background = 'green';
            //             outputDiv.style.color = 'white';
            //             outputDiv.style.display = 'block';
            //         }, 1000);
            //         setTimeout(function () {
            //             document.getElementById('output').style.display = 'none';
            //         }, 4500);
            //     } else {
            //         setTimeout(function () {
            //             closeLogin();
            //         }, 1000);

            //         setTimeout(function () {
            //             outputDiv.innerHTML = 'Thông Tin Không Hợp Lệ!';
            //             outputDiv.style.background = '#de1f18';
            //             outputDiv.style.color = 'white';
            //             outputDiv.style.display = 'block';
            //         }, 1000);
            //         setTimeout(function () {
            //             document.getElementById('output').style.display = 'none';
            //         }, 4500);
            //     }
            // };
            xhttp.onreadystatechange = function () {
                if (this.status === 200) {
                    alert('Đăng nhập thành công !');
                    window.location.href = 'http://127.0.0.1:5000/api/admin/';
                } else {
                    alert('Sai thông tin đăng nhập !');
                }
            };
            var data = JSON.stringify({ email: email, password: password });
            xhttp.send(data);
        });
    });
}
