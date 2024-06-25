document.addEventListener('DOMContentLoaded', () => {
    const allAnimeCards = document.getElementById('all-anime-cards');
    const big3Cards = document.getElementById('big3-cards');

    fetch('https://kitsu.io/api/edge/anime?page[limit]=12&page[offset]=0')
        .then(response => response.json())
        .then(data => {
            const animes = data.data;
            animes.forEach(anime => {
                const card = document.createElement('div');
                card.classList.add('col-md-3', 'mb-2'); // 3 cards per row

                const img = anime.attributes.posterImage.small;
                const title = anime.attributes.canonicalTitle;
                const synopsis = anime.attributes.synopsis;
                const animeId = anime.id;

                card.innerHTML = `
                    <div class="card h-30">
                        <a href="./pages/show-anime.html?id_anime=${animeId}" class="stretched-link">
                            <img src="${img}" class="card-img-top" alt="${title}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${title}</h5>
                                <p class="card-text">${synopsis.substring(0, 100)}...</p>
                                <button class="btn btn-outline-danger mt-auto favorite-btn" data-id="${animeId}">
                                    <i class="fa fa-heart"></i>
                                </button>
                            </div>
                        </a>
                    </div>
                `;

                allAnimeCards.appendChild(card);
            });

            // Affichage du Big Three
            const bigThreeAnimes = [
                {
                    title: 'One Piece',
                    img: 'https://media.kitsu.io/anime/poster_images/12/small.jpg',
                    synopsis: 'Monkey D. Luffy et son équipage naviguent à la recherche du trésor ultime, le One Piece.',
                    id: 12 // ID fictif pour l'exemple
                },
                {
                    title: 'Naruto',
                    img: 'https://media.kitsu.io/anime/11/poster_image/small-db4debb693482e09f5d9615864b99b3d.jpeg',
                    synopsis: 'Naruto Uzumaki rêve de devenir Hokage, le ninja le plus fort de son village, Konoha.',
                    id: 11 // ID fictif pour l'exemple
                },
                {
                    title: 'Bleach',
                    img: 'https://i.ebayimg.com/images/g/hmsAAOSwPKRegM1Q/s-l1600.jpg',
                    synopsis: 'Ichigo Kurosaki devient un Shinigami pour protéger les âmes humaines des Hollows.',
                    id: 13 // ID fictif pour l'exemple
                }
            ];

            bigThreeAnimes.forEach(anime => {
                const card = document.createElement('div');
                card.classList.add('card', 'h-5');

                card.innerHTML = `
                    <a href="./pages/show-anime.html?id_anime=${anime.id}" class="stretched-link">
                        <img src="${anime.img}" class="card-img-top" alt="${anime.title}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${anime.title}</h5>
                            <p class="card-text">${anime.synopsis}</p>
                        </div>
                    </a>
                `;

                big3Cards.appendChild(card);
            });

            document.querySelectorAll('.favorite-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    event.stopPropagation(); // Prevent the card link from being triggered
                    const animeId = event.currentTarget.dataset.id;
                    addOrRemoveFavorite(animeId);
                });
            });
        })
        .catch(error => console.error('Error fetching animes:', error));
});

function addOrRemoveFavorite(animeId) {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const userConnected = JSON.parse(localStorage.getItem('connected'));

    if (userConnected) {
        if (storedFavorites.includes(animeId)) {
            // Remove favorite
            const updatedFavorites = storedFavorites.filter(id => id !== animeId);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } else {
            // Add favorite
            storedFavorites.push(animeId);
            localStorage.setItem('favorites', JSON.stringify(storedFavorites));
        }
    } else {
        alert('Veuillez vous connecter pour ajouter des favoris.');
    }
}
