document.addEventListener('DOMContentLoaded', () => {
    const profileContainer = document.getElementById('profile-container');

    // Récupérer les données utilisateur du localStorage
    const storedUser = localStorage.getItem('user');
    const storeConnected = localStorage.getItem('connected');

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
    } else {
        profileContainer.innerHTML = '<p>Aucun utilisateur trouvé. Veuillez vous connecter ou vous inscrire.</p>';
    }
});
