//imports
import {
  input,
  searchBtn,
  mainContainer,
  loadMoreBtn,
  select,
  goBackBtn,
  options,
} from './refs.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { openBigCard } from './big-card-shower';
import { fetchGenres } from './fetch.js';

//DECLARATIONS
let genreValue, inputValue, timerID;
let page = 1;
let PER_PAGE = 24;
const BASE_URL = 'https://api.jikan.moe/v4';
const GENRE_URL = 'https://api.jikan.moe/v4/genres/anime';
let searchType = 'anime';
const params = new URLSearchParams({
  limit: PER_PAGE,
  page: page,
});

let url = `${BASE_URL}/anime?${params}`;

//Shows all the cards on the page as default view
animeFetcher(drawSmallCard, url);

//Fetching anime data and then creating cards(link to api, func to create cards)
function animeFetcher(func, link) {
  fetch(link)
    .then(response => response.json())
    .then(result => {
      createCards(result.data, func);
    })
    .catch(error => Notify.info('Error:', error));
}

//Getting info (animeData) and iterating it to create cards(foo)
function createCards(animeData, foo) {
  if (animeData.length === 0) {
    mainContainer.innerHTML = `<h2 class="nothing-heading">Nothing was found</h2>`;
    loadMoreBtn.classList.replace('load-more-btn', 'not-visible');
    Notify.failure('Try better loser', options);
  } else {
    animeData.forEach(anime => {
      foo(anime);
    });
    if (animeData.length >= PER_PAGE) {
      loadMoreBtn.classList.replace('not-visible', 'load-more-btn');
    } else {
      loadMoreBtn.classList.replace('load-more-btn', 'not-visible');
    }
  }
}

//Creating small cards
function drawSmallCard(anime) {
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
}

//Loading more cards button listener
loadMoreBtn.addEventListener('click', e => {
  e.preventDefault();
  page += 1;
  params.set('page', page);
  let currentUrl;
  if (searchType === 'anime') {
    currentUrl = `${BASE_URL}/anime?${params}`;
  } else if (searchType === 'genre') {
    currentUrl = `${BASE_URL}/anime?genres=${genreValue}&${params}`;
  } else if (searchType === 'name') {
    currentUrl = `https://api.jikan.moe/v4/anime?${params}&q=${inputValue}`;
  }
  console.log(currentUrl);
  animeFetcher(drawSmallCard, currentUrl);
});

// Fetching genres into select options
fetchGenres(GENRE_URL);

//Searching by chosen genre
select.addEventListener('change', async e => {
  genreValue = +e.currentTarget.value;
  url = `${BASE_URL}/anime?genres=${genreValue}&${params}`;
  searchType = 'genre';
  mainContainer.innerHTML = '';
  animeFetcher(drawSmallCard, url);
  goBackBtn.classList.replace('not-visible', 'go-back-btn');
});

//
//Search by name
searchBtn.addEventListener('click', e => {
  e.preventDefault();
  searchType = 'name';
  clearTimeout(timerID);
  timerID = setTimeout(function () {
    inputValue = input.value.trim();
    url = `https://api.jikan.moe/v4/anime?${params}&q=${inputValue}`;
    if (inputValue !== '') {
      page = 1;
      mainContainer.innerHTML = '';
      animeFetcher(drawSmallCard, url);
      goBackBtn.classList.replace('not-visible', 'go-back-btn');
    }
  }, 1000);
});
//
//

goBackBtn.addEventListener('click', e => {
  e.preventDefault();
  url = `${BASE_URL}/anime?${params}`;

  select.value = document.querySelector('.anime-select-option').value;
  input.value = '';

  mainContainer.innerHTML = '';
  animeFetcher(drawSmallCard, url);
  goBackBtn.classList.replace('go-back-btn', 'not-visible');
});

mainContainer.addEventListener('click', openBigCard);
