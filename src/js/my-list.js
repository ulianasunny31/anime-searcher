import { localStorageKey } from './script.js';

const listContainer = document.querySelector('.main-list-container');
window.addEventListener('DOMContentLoaded', () => {
  const savedAnimeCard = localStorage.getItem(localStorageKey);

  if (savedAnimeCard) {
    listContainer.insertAdjacentHTML('beforeend', savedAnimeCard);
  }
});

const localStorageKey = 'saved-anime';
function addToList(e) {
  e.preventDefault();
  e.stopPropagation();
  const addButton = e.target.closest('.add-button');
  const animeCard = e.target.closest('.anime-card');

  //Checking if clicked on the add btn
  if (!addButton) {
    return;
  }

  //Getting id of the chosen anime
  const animeId = animeCard.dataset.animeId;

  url = `https://api.jikan.moe/v4/anime/${animeId}`;
  fetch(url)
    .then(response => response.json())
    .then(result => {
      let { title, title_english, images, mal_id } = result.data;
      const smallImageUrl = images.jpg.large_image_url;

      let realTitle = title_english === null ? title : title_english;

      let smallAnimeCard = `
  <div class="anime-card" data-anime-id="${mal_id}">
   <img class="anime-image-small" src="${smallImageUrl}" alt="${title}" />
   <h3 class="anime-small-heading">${realTitle}</h3> 
   <button class="add-button">+</button>
  </div>
  `;
      localStorage.setItem(localStorageKey, smallAnimeCard);
    });
}
