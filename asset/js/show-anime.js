document.addEventListener('DOMContentLoaded', () => {
    // Récupération l'ID de l'anime depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get('id_anime');

    if (animeId) {
        // Faire une requête à l'API de Kitsu pour obtenir les détails de l'anime
        fetch(`https://kitsu.io/api/edge/anime/${animeId}`)
            .then(response => response.json())
            .then(data => {
                const anime = data.data;

                document.getElementById('anime-image').src = anime.attributes.posterImage.small;
                document.getElementById('anime-image').alt = anime.attributes.canonicalTitle;
                document.getElementById('anime-title').textContent = anime.attributes.canonicalTitle;
                document.getElementById('anime-synopsis').textContent = anime.attributes.synopsis;

                const videoLink = anime.attributes.youtubeVideoId ? `https://www.youtube.com/watch?v=${anime.attributes.youtubeVideoId}` : '#';
                document.getElementById('anime-video-link').href = videoLink;

                // Gestion des favoris
                const favoriteBtn = document.getElementById('favorite-btn');
                updateFavoriteButton(animeId, favoriteBtn);

                favoriteBtn.addEventListener('click', () => {
                    addOrRemoveFavorite(animeId);
                    updateFavoriteButton(animeId, favoriteBtn);
                });
            })
            .catch(error => console.error('Error fetching anime details:', error));
    } else {
        console.error('Anime ID not found in URL');
    }
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

function updateFavoriteButton(animeId, button) {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (storedFavorites.includes(animeId)) {
        button.classList.add('btn-danger');
        button.classList.remove('btn-outline-danger');
        button.innerHTML = '<i class="fa fa-heart"></i> Supprimer des favoris';
    } else {
        button.classList.remove('btn-danger');
        button.classList.add('btn-outline-danger');
        button.innerHTML = '<i class="fa fa-heart"></i> Ajouter aux favoris';
    }
}
