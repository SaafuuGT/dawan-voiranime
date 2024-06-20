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

document.addEventListener('DOMContentLoaded', () => {
    const allAnimeCards = document.getElementById('all-anime-cards');
  
    fetch('https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=0')
      .then(response => response.json())
      .then(data => {
          const animes = data.data;
          animes.forEach(anime => {
              const card = document.createElement('div');
              card.classList.add('card', 'm-2');
              card.style.width = '18rem';
  
              const img = anime.attributes.posterImage.small;
              const title = anime.attributes.canonicalTitle;
              const synopsis = anime.attributes.synopsis;
  
              card.innerHTML = `
                <img src="${img}" class="card-img-top" alt="${title}">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">${synopsis.substring(0, 100)}...</p>
                </div>
              `;
  
              allAnimeCards.appendChild(card);
          });
      })
      .catch(error => console.error('Error fetching animes:', error));
});


// fetch('https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=0').then((resp) => resp.json()).then((resp)=>{
// console.log(resp)
// }
// )