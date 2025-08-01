fetch('/api/news')
    .then(res => res.json())
    .then(data => {
        if (!Array.isArray(data)) {
            console.error('Expected array but got:', data);
            return;
        }

        const container = document.getElementsByClassName('grid')[0];
        data.forEach(article => {
            const art = document.createElement('article');
            art.classList.add('grid-item');

            art.innerHTML = `
                <h2><a href="${article.url}">${article.title}</a></h2>
                <p>${article.description}</p>
            `;

            container.appendChild(art);
        });
    })
    .catch(error => console.error(error));
