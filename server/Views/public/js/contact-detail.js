fetch('http://localhost:5000/api/contact/datacontacts')
    .then((response) => response.json())
    .then((data) => {
        const contacts = data.contacts;
        const LH = document.getElementById('contactsss');

        contacts.forEach((contact) => {
            const div = document.createElement('div');

            const h2 = document.createElement('h2'); //*
            const p = document.createElement('p');
            const ul = document.createElement('ul');
            const li1 = document.createElement('li'); // *
            const li2 = document.createElement('li'); // *

            // Thiết lập nội dung của các phần tử span từ dữ liệu
            h2.textContent = contact.title;
            p.textContent = contact.address;

            li1.textContent = 'SDT : ' + contact.phone;
            li2.textContent = 'Email : ' + contact.email;

            // Chèn các phần tử vào trong các phần tử div
            div.appendChild(h2);
            div.appendChild(p);
            div.appendChild(ul);

            // Chèn các phần tử li vào trong phần tử ul
            ul.appendChild(li1);
            ul.appendChild(li2);

            LH.appendChild(div);
        });
    })
    .catch((error) => console.error('Lỗi đọc file JSON: ', error));
