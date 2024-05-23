import { openBigCard } from './big-card-shower.js';
const listContainer = document.querySelector('.main-list-container');

const myList = JSON.parse(localStorage.getItem('myList'));

if (myList.length === 0) {
  listContainer.innerHTML = `
    <h1 class="empty-heading">Your anime list is empty</h1>
    `;
}

myList.forEach(anime => {
  let { title, title_english, images, mal_id } = anime;
  const smallImageUrl = images.jpg.large_image_url;
  let realTitle = title_english === null ? title : title_english;
  let smallAnimeCard = `
    <div class="anime-card" data-anime-id="${mal_id}">
     <img class="anime-image-small" src="${smallImageUrl}" alt="${title}" />
     <h3 class="anime-small-heading">${realTitle}</h3>
     <button class="card-delete-btn">X</button>
    </div>
    `;

  listContainer.insertAdjacentHTML('beforeend', smallAnimeCard);
});

listContainer.addEventListener('click', openBigCard);

function removeFromList(e) {
  e.preventDefault();
  e.stopPropagation();
  const deleteButton = e.target.closest('.card-delete-btn');
  const animeCard = e.target.closest('.anime-card');

  if (!animeCard) {
    console.error('Anime card not found');
    return;
  }
  const animeID = +animeCard.dataset.animeId;
  console.log(animeID);

  if (isNaN(animeID)) {
    console.error('Invalid anime ID');
    return;
  }

  //Checking if clicked on the remove btn
  if (!deleteButton) {
    return;
  }

  //Getting index of exact anime
  const index = myList.findIndex(anime => anime.mal_id === animeID);

  if (index !== -1) {
    myList.splice(index, 1);
    localStorage.setItem('myList', JSON.stringify(myList));
    animeCard.remove();
  }
}

listContainer.addEventListener('click', removeFromList);
