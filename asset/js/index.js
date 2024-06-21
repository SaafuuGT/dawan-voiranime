// // Simulation des données de la base de données
// const animes = [
//     // Ajoutez ici vos données d'anime
//     { id: 1, img: 'anime1.jpg', titre: 'Anime 1', description: 'Description de l\'anime 1' },
//     { id: 2, img: 'anime2.jpg', titre: 'Anime 2', description: 'Description de l\'anime 2' },
//     // Ajoutez d'autres animes ici
//   ];

//   const bigs3 = [
//     { id: 1, img: 'anime1.jpg', titre: 'Anime 1' },
//     { id: 48, img: 'anime48.jpg', titre: 'Anime 48' },
//     { id: 49, img: 'anime49.jpg', titre: 'Anime 49' },
//   ];

//   // Stocker les données dans localStorage
//   localStorage.setItem('animes', JSON.stringify(animes));
//   localStorage.setItem('bigs3', JSON.stringify(bigs3));

//   document.addEventListener('DOMContentLoaded', () => {
//     const big3Cards = document.getElementById('big3-cards');
//     const allAnimeCards = document.getElementById('all-anime-cards');

//     // Afficher les big 3 animes
//     bigs3.forEach(anime => {
//       const card = document.createElement('a');
//       card.href = `showAnime.html?id_anime=${anime.id}`;
//       card.innerHTML = `
//         <figure class="card">
//           <img src="./asset/img/${anime.img}" alt="${anime.titre}" />
//         </figure>
//       `;
//       big3Cards.appendChild(card);
//     });

//     // Afficher tous les animes
//     animes.forEach(anime => {
//       const card = document.createElement('a');
//       card.href = `showAnime.html?id_anime=${anime.id}`;
//       card.innerHTML = `
//         <figure class="card">
//           <img src="./asset/img/${anime.img}" alt="${anime.titre}" />
//         </figure>
//       `;
//       allAnimeCards.appendChild(card);
//     });
//   });

//   function searchAnime(event) {
//     event.preventDefault();
//     const searchText = document.getElementById('search-text').value.toLowerCase();
//     const filteredAnimes = animes.filter(anime => anime.titre.toLowerCase().includes(searchText));
//     const allAnimeCards = document.getElementById('all-anime-cards');

//     // Vider les cartes existantes
//     allAnimeCards.innerHTML = '';

//     // Afficher les animes filtrés
//     filteredAnimes.forEach(anime => {
//       const card = document.createElement('a');
//       card.href = `showAnime.html?id_anime=${anime.id}`;
//       card.innerHTML = `
//         <figure class="card">
//           <img src="./asset/img/${anime.img}" alt="${anime.titre}" />
//         </figure>
//       `;
//       allAnimeCards.appendChild(card);
//     });
//   }



// document.addEventListener('DOMContentLoaded', () => {
//     const allAnimeCards = document.getElementById('all-anime-cards');
  
//     fetch('https://kitsu.io/api/edge/anime?page[limit]=12&page[offset]=0')
//       .then(response => response.json())
//       .then(data => {
//           const animes = data.data;
//           animes.forEach(anime => {
//               const card = document.createElement('div');
//               card.classList.add('col-md-3'); // Utilisation des classes de grille Bootstrap pour 3 cartes par ligne
  
//               const img = anime.attributes.posterImage.small;
//               const title = anime.attributes.canonicalTitle;
//               const synopsis = anime.attributes.synopsis;
  
//               card.innerHTML = `
//                 <div class="card ">
//                   <img src="${img}" class="card-img-top" alt="${title}">
//                 </div>
//               `;
  
//               allAnimeCards.appendChild(card);
//           });
//       })
//       .catch(error => console.error('Error fetching animes:', error));
// });


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

                card.innerHTML = `
                    <div class="card">
                        <img src="${img}" class="card-img-top" alt="${title}">
                    </div>
                `;

                allAnimeCards.appendChild(card);
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

                card.innerHTML = `
                    <div class="card">
                        <img src="${img}" class="card-img-top" alt="${title}">
                    </div>
                `;

                favoriteAnimeCards.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching favorite animes:', error));
});



// fetch('https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=0').then((resp) => resp.json()).then((resp)=>{
// console.log(resp)
// }
// )