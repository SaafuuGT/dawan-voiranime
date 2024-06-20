document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#connexion-form'); 

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Empêche l'envoi du formulaire
    
        // Récupérer les valeurs des champs
        const email = form.elements['email'].value;
        const password = form.elements['pdw'].value;

        // Vérifier les champs
        if (email && password) {

            // Récupérer les données utilisateur du localStorage
            const storedUser = localStorage.getItem('user');

            if (storedUser) {
                const user = JSON.parse(storedUser);

                // Vérifier les informations de connexion
                if (user.email === email && user.password === password) {
                    localStorage.setItem('connected', JSON.stringify(true))
                    // Rediriger vers la page de profil ou autre action
                    window.location.href = './mon-profil.html';
                } else {
                    alert('Email ou mot de passe incorrect.');
                }
            } else {
                alert('Aucun utilisateur enregistré. Veuillez vous inscrire d\'abord.');
            }
        } else {
            alert('Tous les champs sont requis.');
        }
    });
});
