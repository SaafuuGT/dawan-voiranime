document.addEventListener('DOMContentLoaded', () => {
    const allAnimeCards = document.getElementById('all-anime-cards');
    const favoriteAnimeCards = document.getElementById('favorite-anime-cards');

    // Afficher les 12 animes de l'API
    fetch('https://kitsu.io/api/edge/anime?page[limit]=12&page[offset]=0')
        .then(response => response.json())
        .then(data => {
            const animes = data.data;
            animes.forEach(anime => {
                const card = document.createElement('div');
                card.classList.add('col-md-3', 'mb-2'); // Utilisation des classes de grille Bootstrap pour 3 cartes par ligne

                const img = anime.attributes.posterImage.small;
                const title = anime.attributes.canonicalTitle;
                const synopsis = anime.attributes.synopsis;
                const id = anime.id;

                card.innerHTML = `
                    <div class="card">
                        <img src="${img}" class="card-img-top" alt="${title}" data-id="${id}">
                    </div>
                `;

                allAnimeCards.appendChild(card);
            });

            // Ajouter l'événement de clic aux images
            const images = allAnimeCards.querySelectorAll('img');
            images.forEach(img => {
                img.addEventListener('click', (event) => {
                    const animeId = event.target.getAttribute('data-id');
                    window.location.href = `./Pages/show-anime.html?id_anime=${animeId}`;
                });
            });
        })
        .catch(error => console.error('Error fetching animes:', error));

    // Afficher les animes favoris
    const favoriteAnimeIDs = [11, 12, 13]; 
    const fetchAnimeById = (id) => fetch(`https://kitsu.io/api/edge/anime/${id}`).then(response => response.json());

    Promise.all(favoriteAnimeIDs.map(fetchAnimeById))
        .then(results => {
            results.forEach(result => {
                const anime = result.data;
                const card = document.createElement('div');
                card.classList.add('col-md-4', 'mb-2'); 

                const img = anime.attributes.posterImage.small;
                const title = anime.attributes.canonicalTitle;
                const synopsis = anime.attributes.synopsis;
                const id = anime.id;

                card.innerHTML = `
                    <div class="card">
                        <img src="${img}" class="card-img-top" alt="${title}" data-id="${id}">
                    </div>
                `;

                favoriteAnimeCards.appendChild(card);
            });

            // Ajouter l'événement de clic aux images
            const favoriteImages = favoriteAnimeCards.querySelectorAll('img');
            favoriteImages.forEach(img => {
                img.addEventListener('click', (event) => {
                    const animeId = event.target.getAttribute('data-id');
                    window.location.href = `./Pages/show-anime.html?id_anime=${animeId}`;
                });
            });
        })
        .catch(error => console.error('Error fetching favorite animes:', error));
});
