fetch('http://localhost:5000/api/product/datamenu')
    .then((response) => response.json())
    .then((data) => {
        const products = data.products;
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

        products.forEach((product) => {
            const tr = document.createElement('tr');
            const trTR = document.createElement('tr'); //*

            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const tdTD = document.createElement('td'); // *

            const span1 = document.createElement('span');
            const span2 = document.createElement('span');

            // Thiết lập nội dung của các phần tử span từ dữ liệu JSON
            span1.textContent = product.title;
            span2.textContent = product.price + 'K';

            tdTD.textContent = product.description;
            // Chèn các phần tử span vào trong các phần tử td
            td1.appendChild(span1);
            td2.appendChild(span2);
            // td3.appendChild(span3);

            // Chèn các phần tử td vào trong phần tử tr
            tr.appendChild(td1);
            tr.appendChild(td2);
            trTR.appendChild(tdTD);

            switch (product.tag) {
                case 'Nướng':
                    if (count1 % 2 === 0) {
                        grilled1.appendChild(tr);
                        grilled1.appendChild(trTR);
                    } else {
                        grilled2.appendChild(tr);
                        grilled2.appendChild(trTR);
                    }
                    count1++;
                    break;

                case 'Lẩu':
                    if (count2 % 2 === 0) {
                        hotpot1.appendChild(tr);
                        hotpot1.appendChild(trTR);
                    } else {
                        hotpot2.appendChild(tr);
                        hotpot2.appendChild(trTR);
                    }
                    count2++;
                    break;

                case 'Combo':
                    if (count3 % 2 === 0) {
                        combo1.appendChild(tr);
                        combo1.appendChild(trTR);
                    } else {
                        combo2.appendChild(tr);
                        combo2.appendChild(trTR);
                    }
                    count3++;
                    break;

                default:
                    if (count4 % 2 === 0) {
                        other1.appendChild(tr);
                        other1.appendChild(trTR);
                    } else {
                        other2.appendChild(tr);
                        other2.appendChild(trTR);
                    }
                    count4++;
                    break;
            }
        });
    })
    .catch((error) => console.error('Lỗi đọc file JSON: ', error));
