const listContainer = document.querySelector('.main-list-container');
const myList = JSON.parse(localStorage.getItem('myList')) || [];

myList.forEach(anime => {
  let { title, title_english, images, mal_id } = anime;
  const smallImageUrl = images.jpg.large_image_url;

  let realTitle = title_english === null ? title : title_english;

  let smallAnimeCard = `
  <div class="anime-card" data-anime-id="${mal_id}">
   <img class="anime-image-small" src="${smallImageUrl}" alt="${title}" />
   <h3 class="anime-small-heading">${realTitle}</h3> 
   <button class="add-button">+</button>
  </div>
  `;

  mainContainer.insertAdjacentHTML('beforeend', smallAnimeCard);
});
