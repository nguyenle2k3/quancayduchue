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
            var data = JSON.stringify({ email: email, password: password });
            xhttp.send(data);
            // window.location.href = './admin';
        });
    });
}
