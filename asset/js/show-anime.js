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
            })
            .catch(error => console.error('Error fetching anime details:', error));
    } else {
        console.error('Anime ID not found in URL');
    }
});
