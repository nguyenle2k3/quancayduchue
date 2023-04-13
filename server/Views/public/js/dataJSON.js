// fetch('../models/data.json')
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data); // Dữ liệu JSON đã được đọc

//         // Lấy phần tử HTML dựa trên id
//         // const menu1 = document.getElementById('menu1');

//         // Lặp qua từng đối tượng trong dữ liệu JSON
//         data.forEach((food) => {
//             // Tạo mới các phần tử HTML
//             const tr = document.createElement('tr');

//             const td1 = document.createElement('td');
//             const td2 = document.createElement('td');
//             // const td3 = document.createElement('td');

//             const span1 = document.createElement('span');
//             const span2 = document.createElement('span');
//             // const span3 = document.createElement('span');

//             // Thiết lập nội dung của các phần tử span từ dữ liệu JSON
//             span1.textContent = food.title;
//             span2.textContent = food.price;
//             // span3.textContent = food.city;

//             // Chèn các phần tử span vào trong các phần tử td
//             td1.appendChild(span1);
//             td2.appendChild(span2);
//             // td3.appendChild(span3);

//             // Chèn các phần tử td vào trong phần tử tr
//             tr.appendChild(td1);
//             tr.appendChild(td2);
//             // tr.appendChild(td3);

//             // Lấy phần tử table từ DOM dựa trên id
//             const table = document.getElementById('menu1');

//             // Chèn phần tử tr vào trong phần tử table
//             table.appendChild(tr);
//         });
//     })
//     .catch((error) => console.error('Lỗi đọc file JSON: ', error));

document.getElementById('jajaja').innerHTML = 'husaifuiads isanfus ';
