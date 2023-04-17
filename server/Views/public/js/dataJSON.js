fetch('/client/json')
    .then((response) => response.json())
    .then((data) => {
        const grilled1 = document.getElementById('grilled-c1'); // Menu nuong left collum
        const grilled2 = document.getElementById('grilled-c2'); // Menu nuong right collum

        const hotpot1 = document.getElementById('hotpot-c1'); // Menu lau left collum
        const hotpot2 = document.getElementById('hotpot-c2'); // Menu lau right collum

        const combo1 = document.getElementById('combo-c1'); // Menu combo left collum
        const combo2 = document.getElementById('combo-c2'); // Menu combo right collum

        const other1 = document.getElementById('other-c1'); // Menu khac left collum
        const other2 = document.getElementById('other-c2'); // Menu khac right collum

        let count1 = 0; // Nuong
        let count2 = 0; // lau
        let count3 = 0; // combo
        let count4 = 0; // khac

        data.forEach((food) => {
            const tr = document.createElement('tr');
            const trTR = document.createElement('tr'); //*

            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const tdTD = document.createElement('td'); // *

            const span1 = document.createElement('span');
            const span2 = document.createElement('span');
            // const spanTR = document.createElement('span');

            // Thiết lập nội dung của các phần tử span từ dữ liệu JSON
            span1.textContent = food.title;
            span2.textContent = food.price;
            // span3.textContent = food.city;

            // Chèn các phần tử span vào trong các phần tử td
            td1.appendChild(span1);
            td2.appendChild(span2);
            // td3.appendChild(span3);

            // Chèn các phần tử td vào trong phần tử tr
            tr.appendChild(td1);
            tr.appendChild(td2);
            // tr.appendChild(td3);
            trTR.appendChild(tdTD);

            switch (food.tag) {
                case 'Nướng':
                    if (count1 % 2 === 0) {
                        grilled1.appendChild(tr);
                    } else {
                        grilled2.appendChild(tr);
                    }
                    count1++;
                    break;

                case 'Lẩu':
                    if (count2 % 2 === 0) {
                        hotpot1.appendChild(tr);
                    } else {
                        hotpot2.appendChild(tr);
                    }
                    count2++;
                    break;

                case 'COMBO':
                    if (count3 % 2 === 0) {
                        combo1.appendChild(tr);
                    } else {
                        combo2.appendChild(tr);
                    }
                    count3++;
                    break;

                default:
                    if (count4 % 2 === 0) {
                        other1.appendChild(tr);
                    } else {
                        other2.appendChild(tr);
                    }
                    count4++;
                    break;
            }
        });
    })
    .catch((error) => console.error('Lỗi đọc file JSON: ', error));

//  mongoexport --db=quancayduchue --collection=products --out=D:\MegaSync\MegaSync\NotePad\ICTU_\BTL\CNPM\DH\duchueproject\server\Models/data.json
