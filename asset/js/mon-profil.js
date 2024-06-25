document.addEventListener('DOMContentLoaded', () => {
    const profileContainer = document.getElementById('profile-container');
    const profileCard = document.getElementById('profile-card');
    const favoriteCardsContainer = document.getElementById('favorite-cards');

    // Récupérer les données utilisateur du localStorage
    const storedUser = localStorage.getItem('user');
    const storeConnected = localStorage.getItem('connected');
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const connected = JSON.parse(storeConnected);

    if (storedUser && connected) {
        const user = JSON.parse(storedUser);
    
        // Afficher les données utilisateur
        const profilePicture = document.getElementById('profile-picture');
        const profileUsername = document.getElementById('profile-username');
        const profileEmail = document.getElementById('profile-email');

        profilePicture.innerHTML = `<img src="${user.img}" alt="Profile Picture" style="width: 150px; height: 150px; border-radius: 50%;">`;
        profileUsername.innerHTML = `<p><strong>Username:</strong> ${user.username}</p>`;
        profileEmail.innerHTML = `<p><strong>Email:</strong> ${user.email}</p>`;

        profileCard.style.display = 'block';

        // Afficher les favoris
        fetchFavorites(storedFavorites, favoriteCardsContainer);
    } else {
        profileCard.style.display = 'none';
        
        // Créer dynamiquement le message "Aucun utilisateur trouvé"
        const noUserMessage = document.createElement('div');
        noUserMessage.classList.add('container', 'mt-5', 'd-flex', 'justify-content-center');
        noUserMessage.innerHTML = '<p>Aucun utilisateur trouvé. Veuillez vous connecter ou vous inscrire.</p>';

        // Ajouter le message au profil container
        profileContainer.appendChild(noUserMessage);
    }
});

function fetchFavorites(favorites, container) {
    favorites.forEach(animeId => {
        fetch(`https://kitsu.io/api/edge/anime/${animeId}`)
            .then(response => response.json())
            .then(data => {
                const anime = data.data;
                const card = createFavoriteCard(anime);
                container.appendChild(card);
            })
            .catch(error => console.error('Error fetching favorite anime:', error));
    });
}

function createFavoriteCard(anime) {
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-2'); // 4 cards per row

    card.innerHTML = `
        <div class="card h-100">
            <a href="../Pages/show-anime.html?id_anime=${anime.id}" class="stretched-link">
                <img src="${anime.attributes.posterImage.small}" class="card-img-top" alt="${anime.attributes.canonicalTitle}">
            </a>
        </div>
    `;

    return card;
}
