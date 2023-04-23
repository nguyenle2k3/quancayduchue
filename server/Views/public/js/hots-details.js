fetch('http://localhost:5000/api/promotion/datapromotions')
    .then((response) => response.json())
    .then((data) => {
        const promotions = data.promotions;
        const CT = document.getElementById('hotDetails');

        promotions.forEach((promotion, index) => {
            // tach ngay thang
            const timeStart = promotion.startTime;
            const Start = timeStart.slice(0, 10).replace('T', '-');
            const timeEnd = promotion.endTime;
            const End = timeEnd.slice(0, 10).replace('T', '-');

            const div = document.createElement('div');
            div.classList.add('carousel-item', 'text-center');

            const h5 = document.createElement('h5');
            h5.classList.add('mt-4', 'mb-0');
            const strong = document.createElement('strong');
            strong.classList.add('text-warning', 'text-uppercase');
            strong.textContent = promotion.title;
            h5.appendChild(strong);

            const h6 = document.createElement('h6');
            h6.classList.add('text-dark', 'm-0');
            h6.textContent = Start + ' - ' + End;

            const p = document.createElement('p');
            p.classList.add('pt-3', 'm-0');
            p.textContent = promotion.description;

            div.appendChild(h5);
            div.appendChild(h6);
            div.appendChild(p);

            if (index === 0) {
                div.classList.add('active');
            }

            CT.appendChild(div);
        });
    })
    .catch((error) => console.error('Lỗi đọc file JSON: ', error));
