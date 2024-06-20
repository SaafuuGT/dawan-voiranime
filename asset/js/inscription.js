document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#inscription-form'); 

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Empêche l'envoi du formulaire

        // Récupérer les valeurs des champs
        const username = form.elements['username'].value;
        const email = form.elements['email'].value;
        const password = form.elements['pdw'].value;
        const img = form.elements['img'].files[0];

        // Valider les champs
        if (username && email && password && img) {
            // Convertir l'image en Base64
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgBase64 = e.target.result;

                // Stocker les données dans localStorage
                const user = {
                    username: username,
                    email: email,
                    password: password,
                    img: imgBase64
                };

                localStorage.setItem('user', JSON.stringify(user));
                console.log('Utilisateur enregistré dans localStorage'); 

                // Rediriger vers la page de connexion ou autre action
                window.location.href = './connexion.html';
            };
            reader.readAsDataURL(img);
        } else {
            alert('Tous les champs sont requis.');
        }
    });
});
