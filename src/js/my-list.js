import { openBigCard } from './big-card-shower.js';
const listContainer = document.querySelector('.main-list-container');

const myList = JSON.parse(localStorage.getItem('myList'));
console.log(myList);

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
  console.log(anime);
  listContainer.insertAdjacentHTML('beforeend', smallAnimeCard);
});

listContainer.addEventListener('click', openBigCard);

function removeFromList(e) {
  e.preventDefault();
  e.stopPropagation();
  const deleteButton = e.target.closest('.card-delete-btn');
  const animeCard = e.target.closest('.anime-card');

  //Checking if clicked on the remove btn
  if (!deleteButton) {
    return;
  }
}
