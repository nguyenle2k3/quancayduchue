const logOutBtn = document.getElementById('hahahahahah');
logOutBtn.addEventListener('click', function (event) {
    event.preventDefault();

    // Create a new XHR object
    const xhttp = new XMLHttpRequest();

    // Define the URL for the GET request
    var url = 'http://127.0.0.1:5000/api/admin/logout';
    // Open a new GET request
    xhttp.open('GET', url, true);

    xhttp.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log('Logout successful!');
            window.location.href = 'http://127.0.0.1:5000/';
        } else {
            console.log('Logout failed!');
        }
    };

    xhttp.send();
});
